import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { showInfoMessage } from "../../utils/NotifyToast";

const Footer = () => {
    const handleSubscribe = (e: any) => {
        e.preventDefault();
        showInfoMessage("Thank you for subscribing");
        e.target.reset();
    };
    return (
        <div id="about-us" className="dark:bg-slate-800 border-t-2">
            <footer className="text-gray-600 dark:text-white body-font">
                <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="">
                                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-white dark:hover:text-gray-300">
                                    <img
                                        className="h-12 w- 12 rounded-md"
                                        src={logo}
                                        alt="Logo"
                                    />
                                    <span className="ml-3 text-xl">
                                        Book Finder
                                    </span>
                                </a>
                                <p className="mt-2 w-full text-sm text-gray-500 dark:text-white dark:hover:text-gray-300">
                                    A place where you can find all of your
                                    favorite books.
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4 pt-8 md:pt-0">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 dark:text-white dark:hover:text-gray-300">
                                USEFULL LINKS
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/all-books"
                                        className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300"
                                    >
                                        All Books
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </nav>
                        </div>

                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 dark:text-white dark:hover:text-gray-300">
                                SUBSCRIBE
                            </h2>
                            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                                <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                                    <label
                                        htmlFor="footer-field"
                                        className="leading-7 text-sm text-gray-600 dark:text-white dark:hover:text-gray-300"
                                    >
                                        Subscribe to our Newsletter
                                    </label>
                                    <form
                                        onSubmit={handleSubscribe}
                                        className="block md:flex"
                                    >
                                        <input
                                            type="email"
                                            id="email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                            placeholder="name@flowbite.com"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            SUBSCRIBE
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-2 md:text-left text-center dark:text-white dark:hover:text-gray-300">
                                You will get latest updates from us about your
                                favourite type of new book added.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-slate-800 dark:text-white border-t-2">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left dark:text-white dark:hover:text-gray-300">
                            © 2023 Book Finder —
                            <a
                                href="https://razikul-joni69.netlify.app/"
                                rel="noopener noreferrer"
                                className="text-gray-600 ml-1 dark:text-white dark:hover:text-gray-300"
                                target="_blank"
                            >
                                @razikul.joni69
                            </a>
                        </p>
                        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                            <a className="text-gray-500 dark:text-white dark:hover:text-gray-300">
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
                            <a className="ml-3 text-gray-500 dark:text-white dark:hover:text-gray-300">
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
                            <a className="ml-3 text-gray-500 dark:text-white dark:hover:text-gray-300">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <rect
                                        width="20"
                                        height="20"
                                        x="2"
                                        y="2"
                                        rx="5"
                                        ry="5"
                                    ></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                            <a className="ml-3 text-gray-500 dark:text-white dark:hover:text-gray-300">
                                <svg
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="0"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="none"
                                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                    ></path>
                                    <circle
                                        cx="4"
                                        cy="4"
                                        r="2"
                                        stroke="none"
                                    ></circle>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
