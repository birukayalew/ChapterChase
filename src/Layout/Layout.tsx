import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";
import Navbar from "../components/Navbar/Navbar";
import auth from "../configs/firebase.config";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoading, setUser } from "../redux/user/userSlice";
import { showErrorMessage } from "../utils/NotifyToast";

const Layout = () => {
    const dispatch = useAppDispatch();
    const { user: loggedInUser, isLoading } = useAppSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(setLoading(true));
        onAuthStateChanged(auth, (user) => {
            if (user) {
                axios
                    .get(
                        `https://book-finder-server-alpha.vercel.app/api/v1/users/${user?.email}`
                    )
                    .then((res) => {
                        dispatch(setUser(res?.data));
                        dispatch(setLoading(false));
                    })
                    .catch((err) => {
                        showErrorMessage(err.message);
                    })
                    .finally(() => {
                        dispatch(setLoading(false));
                    });
            } else {
                dispatch(setUser(null));
                dispatch(setLoading(false));
            }
        });
    }, [dispatch, loggedInUser?.email]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-[1920px] mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer />
        </div>
    );
};
export default Layout;
