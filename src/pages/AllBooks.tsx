import { useEffect, useState } from "react";
import BooksCard from "../components/BooksCard/BooksCard";
import Titles from "../components/Titles/Titles";
import { IAddBook } from "../globalTypes/globalTypes";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import Loading from "../components/Loading/Loading";

const AllBooks = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState<IAddBook[]>([]);
    useEffect(() => {
        setBooks(data);
    }, [data]);

    const handleFiltering = (e: any) => {
        if (e?.target?.value === "genre") {
            const sortedByGenre = [...books].sort((a, b) =>
                a?.genre?.localeCompare(b?.genre)
            );
            setBooks(sortedByGenre);
        } else if (e?.target?.value === "year") {
            const sortedByGenre = [...books].sort((a, b) =>
                a?.publish_date?.localeCompare(b?.publish_date)
            );
            setBooks(sortedByGenre);
        }
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        setSearchTerm(e.target?.value);

        const filteredBooks = data.filter((book: any) => {
            const lowerCaseTerm = searchTerm.toLowerCase();
            return (
                book.book_name.toLowerCase().includes(lowerCaseTerm) ||
                book.author_name.toLowerCase().includes(lowerCaseTerm) ||
                book.genre.toLowerCase().includes(lowerCaseTerm)
            );
        });
        if (filteredBooks.length >= 0) {
            setBooks(filteredBooks);
        }
    };

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className="py-10 dark:bg-slate-800">
            <Titles
                title="All Books"
                subTitle="Find all of your favorite books here"
            />
            <div className="">
                <div className="block md:flex justify-around w-full mb-6 px-10 space-y-4 md:space-y-0">
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Search Field
                        </label>
                        <input
                            onChange={handleSearch}
                            type="text"
                            name="search"
                            id="password"
                            placeholder="Enter what you want to search"
                            className=" lg:min-w-[400px] md:min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Filter Data
                        </label>
                        <select
                            onChange={handleFiltering}
                            id="countries"
                            className=" lg:min-w-[400px] md:min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option disabled selected>
                                Select Filtering Option
                            </option>
                            <option value="genre">By Genre</option>
                            <option value="year">By Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <BooksCard books={books} />
        </div>
    );
};
export default AllBooks;
