import loading from "../../assets/images/loading.gif";
const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <img src={loading} alt="loading..." />
        </div>
    );
};

export default Loading;
