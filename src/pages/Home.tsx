import { NavLink } from "react-router-dom";
import BooksCard from "../components/BooksCard/BooksCard";
import HeroSection from "../components/HeroSection/HeroSection";
import Loading from "../components/Loading/Loading";
import Titles from "../components/Titles/Titles";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import Contact from "../components/Contact/Contact.jsx";

const Home = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="dark:bg-slate-800">
            <HeroSection />
            <div id="popular-books">
                <Titles
                    title="Popular Books"
                    subTitle="Find all of your favorite books here"
                />
                <BooksCard books={data?.slice(0, 6)} />
            </div>
            <NavLink className="flex justify-center mb-10" to="/all-books">
                <button
                    className="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                >
                    See All Books
                </button>
            </NavLink>
            <Contact/>
        </div>
    );
};
export default Home;
