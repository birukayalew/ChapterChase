/* eslint-disable react/prop-types */
const Titles = ({ title, subTitle }: { title: string; subTitle: string }) => {
    return (
        <div className="mb-6 text-center">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold md:text-5xl dark:text-white">
                    {title}
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-300">
                    {subTitle}
                </p>
            </div>
        </div>
    );
};

export default Titles;
