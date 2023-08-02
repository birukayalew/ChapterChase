/* eslint-disable react/prop-types */
import { Button } from "antd";
import { AiFillStar } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import Swal from "sweetalert2";
import { useAddToWishlistMutation } from "../../redux/api/apiSlice";
import { useAppSelector } from "../../redux/hooks";
import { showSuccessMessage, showWarning } from "../../utils/NotifyToast";

const BooksCard = (data: any) => {
    const { user } = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    const [addToWishlist, { data: response }] = useAddToWishlistMutation();

    if (response?.statusCode === 200) {
        showSuccessMessage(response?.message);
    } else if (response?.statusCode === 409) {
        showWarning(response?.message);
    }

    const handleCart = (book: object, cart: string) => {
        if (!user?.email) {
            Swal.fire({
                title: "Are you sure to Login?",
                text: "You have to register or login to add to wishlist or readinglist.",
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
            const options = {
                email: user?.email,
                book: { book },
                cart,
            };
            addToWishlist(options);
        }
    };

    return (
        <div className="my-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
                {data?.books?.map((book: any) => (
                    <div
                        key={book._id}
                        className={`w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="rounded-full w-14 h-14"
                                    src={book?.author_img}
                                    alt="Bonnie image"
                                />
                            </div>
                            <div className={`flex-1 min-w-0`}>
                                <p
                                    className={`text-md font-bold  truncate dark:text-white`}
                                >
                                    {book.author_name}{" "}
                                    <span className="py-3 px-5 rounded-3xl bg-white dark:bg-black  text-black dark:text-white ">
                                        Author
                                    </span>
                                </p>
                                <p
                                    className={`text-sm truncate dark:text-gray-400`}
                                >
                                    {book?.author_email}
                                </p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="relative">
                            <Link to={`/book/${book._id}`} className="relative">
                                <img
                                    className="w-full rounded-t-lg h-60"
                                    src={book?.img}
                                    alt="product image"
                                />
                            </Link>
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-2">
                            <div
                                className={` text-xl font-semibold tracking-tight dark:text-white`}
                            >
                                <h4>Book Name: {book?.book_name}</h4>
                                <h4>Book Genre: {book?.genre}</h4>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300">
                                {book?.description?.slice(0, 100)}...{" "}
                                <NavLink
                                    className="text-green-600"
                                    to={`/book/${book._id}`}
                                >
                                    Read More
                                </NavLink>
                            </div>
                            <div className="flex justify-between ">
                                <div className="flex space-x-2">
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
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                        {book?.reviews.length}
                                    </span>
                                </div>
                                <span className="text-gray-600 dark:text-white">
                                    {book?.publish_date}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={() =>
                                        handleCart(book, "readinglist")
                                    }
                                    type="primary"
                                    className="bg-blue-500"
                                >
                                    Add To Reading List
                                </Button>
                                <Button
                                    onClick={() => handleCart(book, "wishlist")}
                                    type="primary"
                                    className="bg-blue-500"
                                >
                                    Add To WishList
                                </Button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksCard;
