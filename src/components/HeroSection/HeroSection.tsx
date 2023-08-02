import { NavLink } from "react-router-dom";
import book from "../../assets/images/hero-book.jpg";

const HeroSection = () => {
    return (
        <div>
            <section className="text-gray-600 dark:text-white body-font">
                <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
                            Get Your Favourite Book
                            <br className="hidden lg:inline-block" />
                            From Us
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Welcome to Book Finder, the ultimate destination for
                            every book lover and bibliophile. Step into a
                            boundless universe of literature, where the pages of
                            countless stories come to life, and the magic of
                            reading knows no bounds. Book Finder is not just a
                            website; it's a gateway to explore, discover, and
                            cherish the world of books.
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                <a href="#popular-books">See Popular Books</a>
                            </button>
                            <NavLink to="/all-books">
                                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                    See All Books
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src={book}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
export default HeroSection;
