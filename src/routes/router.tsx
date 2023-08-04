import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddBooks from "../components/AddBooks/AddBooks";
import BookDetails from "../components/BookDetails/BookDetails";
import EditBook from "../components/EditBook/EditBook";
import AllBooks from "../pages/AllBooks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/all-books",
                element: <AllBooks />,
            },
            {
                path: "/book/:id",
                element: <BookDetails />,
            },
            {
                path: "/book/edit/:id",
                element: <EditBook />,
            },
            {
                path: "/add-books",
                element: <AddBooks />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
