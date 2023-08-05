import Swal from "sweetalert2";

const Contact = () => {
    return (
        <section className="relative text-gray-600 body-font">
            <div className="container flex flex-wrap px-5 pb-10 mx-auto sm:flex-nowrap">
                <div className="relative flex items-end justify-start p-10 overflow-hidden bg-gray-300 rounded-lg lg:w-2/3 md:w-1/2 sm:mr-10">
                    <iframe
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.163090484393!2d90.39248143765673!3d23.799362028266078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73b2dde7ef3%3A0xbd1698d8a61085d9!2sMirpur%2014!5e0!3m2!1sen!2sbd!4v1690953922325!5m2!1sen!2sbd"
                        style={{
                            filter: "grayscale(1) contrast(1.2) opacity(0.4)",
                        }}
                    ></iframe>
                    <div className="relative flex flex-wrap py-6 bg-white rounded shadow-md">
                        <div className="px-6 lg:w-1/2">
                            <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                                ADDRESS
                            </h2>
                            <p className="mt-1">
                                Addis Ababa, Ethiopia
                            </p>
                        </div>
                        <div className="px-6 mt-4 lg:w-1/2 lg:mt-0">
                            <h2 className="text-xs font-semibold tracking-widest text-gray-900 title-font">
                                EMAIL
                            </h2>
                            <a className="leading-relaxed text-indigo-500">
                                se.biruk.ayalew@gmail.com
                            </a>
                            <h2 className="mt-4 text-xs font-semibold tracking-widest text-gray-900 title-font">
                                PHONE
                            </h2>
                            <p className="leading-relaxed">+251953266119</p>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        Swal.fire({
                            icon: "success",
                            title: "Thank You!",
                            text: "Your Email has been sent!",
                        });
                        (e.target as HTMLFormElement).reset();
                    }}
                    className="text-white mt-8 w--full fdlex-col bflex lg:w-1/3 md:w-1/2 md:ml-auto md:py-8 md:mt-0"
                >
                    <h2 className="mb-1 text-lg font-medium  title-font">
                        Contact Us
                    </h2>
                    <p className="mb-5 leading-relaxed ">
                        You have any querys or anything to know, just let us
                        know and sent an email.
                    </p>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="text-sm leading-7 ">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="text-sm leading-7 ">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="message" className="text-sm leading-7 ">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
