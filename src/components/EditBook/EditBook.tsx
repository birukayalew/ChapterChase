import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IBOok } from "../../globalTypes/globalTypes.js";
import {
    useGetBookByIdQuery,
    useUpdateBookMutation,
} from "../../redux/api/apiSlice.js";
import { useAppSelector } from "../../redux/hooks.js";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../utils/NotifyToast.js";
import Loading from "../Loading/Loading.js";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading: isBookLoading } = useGetBookByIdQuery(id);

    const { user, isLoading } = useAppSelector((state) => state.user);
    const [updateBook, { data: updatedBookData, status }] =
        useUpdateBookMutation();

    const { register, handleSubmit } = useForm();

    let book: IBOok = {};
    if (data) {
        book = data[0];
    }

    if (status === "fulfilled") {
        showSuccessMessage(updatedBookData?.message);
        navigate(`/book/${id}`);
    }

    const onSubmit = async (data: Partial<IBOok>) => {
        try {
            const updatedData = {
                id,
                book: { data },
            };
            updateBook(updatedData);
        } catch (err) {
            if (err instanceof Error) {
                showErrorMessage(err?.message);
            } else {
                showErrorMessage("An error occurred.");
            }
        }
    };

    if (isLoading || isBookLoading) {
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
                                    defaultValue={book?.book_name as string}
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
                                    defaultValue={book?.genre as string}
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
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    defaultValue={book?.description}
                                    id="description"
                                    // rows="5"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                ></textarea>
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="mt-4 text-white bg-blue-600 p-3 rounded-lg cursor-pointer"
                            value="Update Book"
                        />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditBook;
