import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAddBook } from "../../globalTypes/globalTypes.js";
import { usePostBookMutation } from "../../redux/api/apiSlice.js";
import { useAppSelector } from "../../redux/hooks.js";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../utils/NotifyToast.js";
import Loading from "../Loading/Loading.js";

const AddBooks = () => {
    const navigate = useNavigate();

    const { user, isLoading } = useAppSelector((state) => state.user);
    const [postBook, { data }] = usePostBookMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAddBook>();

    if (data?.insertedId) {
        showSuccessMessage("📖 Book Added Successfully!");
        navigate("/all-books");
    }
    // if (error) {
    //     showErrorMessage(error);
    // }
    const onSubmit: SubmitHandler<IAddBook> = async (data: IAddBook) => {
        const imageUploadToken = import.meta.env.VITE_Image_Upload_Token;
        const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

        data.author_name = user?.name;
        data.author_email = user?.email;
        data.author_img = user?.img;
        data.reviews = [];

        const formData = new FormData();
        formData.append("image", data.img[0]);

        try {
            await axios
                .post(imageHostingUrl, formData)
                .then((img) => {
                    if (img.status === 200) {
                        data.img = img?.data?.data?.display_url;
                        postBook(data);
                    }
                })
                .catch((err) => {
                    showErrorMessage(err?.message);
                });
        } catch (err) {
            if (err instanceof Error) {
                showErrorMessage(err?.message);
            } else {
                showErrorMessage("An error occurred.");
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-3xl text-center font-bold text-gray-900 dark:text-white">
                        Add a new Book
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label
                                    htmlFor="instructor_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Author Name
                                </label>
                                <input
                                    defaultValue={user?.name as string}
                                    disabled
                                    type="text"
                                    id="instructor_name"
                                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="instructor_email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Author Email
                                </label>
                                <input
                                    value={user?.email as string}
                                    disabled
                                    type="email"
                                    id="instructor_email"
                                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Book Name
                                </label>
                                <input
                                    {...register("book_name")}
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Your Book Name."
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="genre"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Genre
                                </label>
                                <input
                                    {...register("genre")}
                                    type="text"
                                    id="genre"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter your book genre."
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="multiple_files"
                                >
                                    Upload relevant class image
                                </label>
                                <input
                                    {...register("img", {
                                        required: true,
                                    })}
                                    type="file"
                                    className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                                />
                                {errors.img && (
                                    <span className="text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    defaultValue="This is is good book you can read."
                                    id="description"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                ></textarea>
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="mt-4 text-white bg-blue-600 p-3 rounded-lg cursor-pointer"
                            value="Add Book"
                        />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddBooks;
