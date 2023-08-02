import { Avatar } from "antd";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillSendCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Swal from "sweetalert2";
import { IBOok } from "../../globalTypes/globalTypes";
import {
    useAddToWishlistMutation,
    useDeleteBookMutation,
    useGetBookByIdQuery,
    useGetReviewsQuery,
    usePostReviewMutation,
} from "../../redux/api/apiSlice";
import { useAppSelector } from "../../redux/hooks";
import {
    showErrorMessage,
    showInfoMessage,
    showSuccessMessage,
    showWarning,
} from "../../utils/NotifyToast";
import Loading from "../Loading/Loading";
import Titles from "../Titles/Titles";
const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useGetBookByIdQuery(id);
    const { user } = useAppSelector((state) => state.user);
    const [postReview, { isError, error, data: commentResponse }] =
        usePostReviewMutation();
    const [addToWishlist, { data: response }] = useAddToWishlistMutation();
    const { data: reviews } = useGetReviewsQuery(id);
    const [deleteBook] = useDeleteBookMutation();

    let book: IBOok = {};
    if (data) {
        book = data[0];
    }

    if (isError && error != null) {
        if ("error" in error) {
            showErrorMessage(error?.status);
        }
    }

    if (commentResponse?.statusCode === 200) {
        showSuccessMessage(commentResponse?.message);
    }
    const handleCommentSubmit = (e: any) => {
        e.preventDefault();
        if (!user?.email) {
            Swal.fire({
                title: "Are you sure you want to login?",
                text: "You have to login or register to leave a comment.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            const comment = e.target.comment.value;
            const options = {
                id,
                review: { comment },
            };
            postReview(options);
            e.target.reset();
        }
    };
    const handleBookDelete = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string | null | undefined
    ) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure you want to Delete?",
            text: "Are you sure? You are going to delete your book.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBook(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your book has been deleted.",
                    icon: "success",
                    timer: 1500,
                });
                navigate("/");
            }
        });
    };

    const handleBookEdit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string | null | undefined
    ) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure you want to Edit?",
            text: "You are going to edit your book.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Edit!",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/book/edit/${id}`);
            }
        });
    };

    if (response?.statusCode === 200) {
        showSuccessMessage(response?.message);
    } else if (response?.statusCode === 409) {
        showWarning(response?.message);
    }

    const handleCart = (book: object, cart: string) => {
        const options = {
            email: user?.email,
            book: { book },
            cart,
        };
        addToWishlist(options);
    };

    const handleMarkAsRead = () => {
        // const options = {
        //     email: user?.email,
        //     id,
        // };
        showInfoMessage("Not implimented yet. I will do it soon");
        // markAsRead(options);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div key={book?._id} className="dark:bg-slate-800 py-10">
            <Titles
                title={`${book?.book_name} Book Details`}
                subTitle="All About your chossen book."
            />
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto max-h-[500px] h-64 object-cover object-center rounded"
                            src={book?.img || ""}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <div className="flex">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="rounded-full w-14 h-14"
                                            src={book?.author_img || ""}
                                            alt="Bonnie image"
                                        />
                                    </div>
                                    <div className={`flex-1 min-w-0`}>
                                        <p
                                            className={`text-md font-bold  truncate dark:text-white`}
                                        >
                                            {book?.author_name}{" "}
                                            <span className="p-3 bg-white dark:bg-black rounded-full text-black dark:text-white ">
                                                Author
                                            </span>
                                        </p>
                                        <p
                                            className={`text-sm truncate dark:text-gray-400`}
                                        >
                                            {book?.author_email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleMarkAsRead()}
                                        className="flex  text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-orange-800 rounded"
                                    >
                                        Mark As Read
                                    </button>
                                </div>
                            </div>

                            <hr className="my-4" />
                            <h2 className="text-sm title-font text-gray-500 dark:text-white tracking-widest">
                                BOOK NAME
                            </h2>
                            <h1 className="text-gray-900 dark:text-white text-3xl title-font font-medium mb-1">
                                {book?.book_name}
                            </h1>
                            <div className="dark:text-white">
                                Genre: {book?.genre}
                            </div>
                            <div className="dark:text-white">
                                Published At: {book?.publish_date}
                            </div>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <StarRatingComponent
                                        editing={false}
                                        renderStarIcon={() => (
                                            <span>
                                                <AiFillStar className="w-8 h-8" />
                                            </span>
                                        )}
                                        name="rate1"
                                        starCount={5}
                                        value={Math.random() * 3 + 3}
                                    />
                                    <span className="text-gray-600 dark:text-white ml-3">
                                        {book?.reviews?.length} Reviews
                                    </span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500 dark:text-white">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500 dark:text-white">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500 dark:text-white">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed dark:text-white">
                                {book?.description}
                            </p>
                            <div className=" pb-5 border-b-2 border-gray-100 mb-5"></div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() =>
                                        handleCart(book, "readinglist")
                                    }
                                    className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                >
                                    Added To Reading List
                                </button>
                                <button
                                    onClick={() => handleCart(book, "wishlist")}
                                    className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                >
                                    Added To Wishlist
                                </button>
                            </div>
                            {user.email === book.author_email && (
                                <div className="flex justify-between my-3 pt-2">
                                    <button
                                        onClick={(e) =>
                                            handleBookEdit(e, book?._id)
                                        }
                                        className="flex  bg-yellow-300 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-400 rounded"
                                    >
                                        Edit Book
                                    </button>
                                    <button
                                        onClick={(e) =>
                                            handleBookDelete(e, book?._id)
                                        }
                                        className="flex  text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-orange-800 rounded"
                                    >
                                        Delete Book
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className="py-10">
                <Titles title="Reviews" subTitle="Users Reviews" />
                <form
                    onSubmit={handleCommentSubmit}
                    className="flex gap-5 items-center justify-center"
                    action=""
                >
                    <textarea
                        name="comment"
                        id=""
                        className="w-3/4 md:w-1/2 rounded-full p-1 px-3 border-2"
                        placeholder="Share your experience"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-[#4f46e5] h-16 w-16 rounded-full text-[35px] text-white flex items-center justify-center"
                    >
                        <BsFillSendCheckFill />
                    </button>
                </form>
            </div>
            <div className="w-full md:w-1/2 dark:text-white flex justify-center">
                <ul className=" space-y-5">
                    {reviews?.reviews?.map((review: string, index: number) => (
                        <li key={index} className="space-x-3">
                            <Avatar
                                size={40}
                                src={
                                    "https://source.unsplash.com/100x100/?portrait"
                                }
                            >
                                USER
                            </Avatar>
                            <span>{review}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default BookDetails;
