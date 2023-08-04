import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading/Loading";
import auth from "../configs/firebase.config";
import { IRegisterUser } from "../globalTypes/globalTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    continueWithGithub,
    continueWithGoogle,
    emailPasswordUserCreate,
    loginUser,
} from "../redux/user/userSlice";
import { showErrorMessage, showSuccessMessage } from "../utils/NotifyToast";
import saveUserToDb from "../utils/saveUsertoDb";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formError },
    } = useForm();

    document.title = "Book Finder | Register";

    const from = location.state?.from?.pathname || "/";

    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.user);

    if (isLoading) {
        return <Loading />;
    }

    const onSubmit = async (data: any) => {
        const imageUploadToken = import.meta.env.VITE_Image_Upload_Token;
        const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;

        const formData = new FormData();
        if (data.photoURL) {
            formData.append("image", data.photoURL?.[0]);
        }

        const userData: IRegisterUser = {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            address: data?.address,
            gender: data?.gender,
            password: data?.password,
            phone: data?.phone,
        };

        const setNewUserLogin = async () => {
            dispatch(
                loginUser({ email: data?.email, password: data?.password })
            )
                .then((res) => {
                    if (res?.type === "user/login/fulfilled") {
                        showSuccessMessage("👍 Email SignIn Successful!");
                        navigate(from, {
                            replace: true,
                        });
                    } else if ("error" in res) {
                        showErrorMessage(res?.error?.message as string);
                    }
                })
                .catch((err: any) => {
                    showErrorMessage(err.message);
                });
        };

        if (data.password !== data.confirm) {
            showErrorMessage("Password doesn't match confirm password!");
        } else if (data.password.length < 6) {
            showErrorMessage("Password must be at least 6 characters");
        } else if (regex.test(data.password) === false) {
            showErrorMessage(
                "Password doesn't meet requirements. Password must have 6 or more character at least one Uppercase Letter and one Special character."
            );
        } else {
            try {
                await fetch(imageHostingUrl, {
                    method: "POST",
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((img) => {
                        if (img.status === 200) {
                            userData.img = img?.data?.display_url;
                            const email = userData?.email;
                            const password = userData?.password;
                            dispatch(
                                emailPasswordUserCreate({ email, password })
                            )
                                .then((res: any) => {
                                    if (
                                        res?.type ===
                                            "user/emailPasswordUserCreate/rejected" &&
                                        "error" in res
                                    ) {
                                        showErrorMessage(
                                            res?.error?.message as string
                                        );
                                    }
                                    if (
                                        res?.type ===
                                        "user/emailPasswordUserCreate/fulfilled"
                                    ) {
                                        updateProfile(auth.currentUser!, {
                                            displayName: userData?.name,
                                            photoURL: userData.img,
                                        })
                                            .then(() => {
                                                saveUserToDb(
                                                    res?.payload?.displayName,
                                                    res?.payload?.email,
                                                    res?.payload?.photoURL
                                                );
                                            })
                                            .catch(() => {
                                                showErrorMessage(
                                                    "🚫 User Profile not updated!"
                                                );
                                            });

                                        showSuccessMessage(
                                            "👍 User Registered Successfully!"
                                        );
                                        reset();
                                        navigate(from);
                                        setNewUserLogin();
                                    }
                                })
                                .catch((err) => {
                                    showErrorMessage(err.message);
                                });
                        }
                    });
            } catch (err: any) {
                showErrorMessage(err?.message);
            }
        }
    };

    const handleGoogleLogin = () => {
        dispatch(continueWithGoogle())
            .then((res: any) => {
                if (
                    res?.type === "user/continueWithGoogle/rejected" &&
                    "error" in res
                ) {
                    showErrorMessage(res?.error?.message as string);
                } else if (res?.type === "user/continueWithGoogle/fulfilled") {
                    saveUserToDb(
                        res?.payload?.displayName,
                        res?.payload?.email,
                        res?.payload?.photoURL
                    );
                    showSuccessMessage("👍 Google SignIn Successful!");
                    navigate(from, { replace: true });
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };

    const handleGithubLogin = () => {
        dispatch(continueWithGithub())
            .then((res: any) => {
                if (
                    res?.type === "user/continueWithGithub/rejected" &&
                    "error" in res
                ) {
                    showErrorMessage(res?.error?.message as string);
                } else if (res?.type === "user/continueWithGithub/fullfilled") {
                    saveUserToDb(
                        res?.payload?.displayName,
                        res?.payload?.email,
                        res?.payload?.photoURL
                    );
                    showSuccessMessage("👍 Github SignIn Successfully!");
                    navigate(from, { replace: true });
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };

    // const handleFacebookLogin = () => {
    //     dispatch(continueWithFacebook())
    //         .then((res: any) => {
    //             if (res?.type === "user/continueWithFacebook/rejected") {
    //                 showErrorMessage(res?.error?.message);
    //             } else if (
    //                 res?.type === "user/continueWithFacebook/fulfilled"
    //             ) {
    //                 saveUserToDb(
    //                     res?.payload?.displayName,
    //                     res?.payload?.email,
    //                     res?.payload?.photoURL
    //                 );
    //                 showSuccessMessage("👍 Facebook SignIn Successfully!");
    //                 navigate(from, { replace: true });
    //             }
    //         })
    //         .catch((err: any) => {
    //             showErrorMessage(err.message);
    //         });
    // };

    // if (loading) {
    //     return <Loading />;
    // }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#1d232a] flex flex-col justify-center sm:py-12">
            <div className="p-10 mx-auto md:pt-0 xs:p-0 md:w-full md:max-w-md">
                <h1 className="mb-5 text-3xl font-bold text-center dark:text-white">
                    Please Register
                </h1>
                <div className="bg-white dark:bg-[#2b3a55] shadow w-full rounded-lg divide-gray-200">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="px-5 pt-7"
                    >
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Name
                        </label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Please Enter Your Full-Name"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                            required
                        />
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            E-mail
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Please Enter Your Email"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                            required
                        />
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Please Enter Your Password"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                            required
                        />

                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirm")}
                            type="password"
                            placeholder="Please Re-Enter Your Password"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                            required
                        />
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Phone Number
                        </label>
                        <input
                            {...register("phone")}
                            type="number"
                            placeholder="Please Enter Your Phone Number"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                        />
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Address
                        </label>
                        <input
                            {...register("address")}
                            type="text"
                            placeholder="Please Enter Your Address"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                        />
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Select Gender
                        </label>
                        <select
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                            {...register("gender")}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label className="block pb-1 text-sm font-semibold text-gray-600 dark:text-white">
                            Photo URL
                        </label>
                        <input
                            {...register("photoURL", { required: true })}
                            type="file"
                            className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                        />
                        {formError.photoURL && (
                            <span className="block mb-2 text-error">
                                This field is required. Please Upload your photo
                            </span>
                        )}
                        <button
                            type="submit"
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            <span className="inline-block mr-2">Register</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="inline-block w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </form>
                    <div className="p-0 m-0 ">
                        <p className="mt-6 text-sm text-center text-gray-400 dark:text-white">
                            Already have an account yet?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 focus:outline-none focus:underline hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                    <div className="mt-2 text-center">
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-full h-px bg-gray-200 border-1 dark:bg-gray-700" />
                            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white dark:text-white left-1/2 dark:bg-gray-900">
                                OR Continue With
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-3 gap-1">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        icon: "info",
                                        title: "Facebook Login Not Implemented Yet!",
                                        text: "I am working on it. Facebook Login will be available soon!",
                                        showConfirmButton: true,
                                        timer: 5000,
                                    });
                                }}
                                type="button"
                                className="transition duration-200 border dark:text-white border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Facebook
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="transition duration-200 border dark:text-white border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Google
                            </button>
                            <button
                                onClick={handleGithubLogin}
                                type="button"
                                className="transition duration-200 border dark:text-white border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                            >
                                Github
                            </button>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="inline-block w-4 h-4 align-text-top"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Forgot Password
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <button className="px-5 py-4 mx-5 text-sm font-normal text-gray-500 transition duration-200 rounded-lg cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="inline-block w-4 h-4 align-text-top"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                <Link to="/" className="inline-block ml-1">
                                    Back To Home
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
