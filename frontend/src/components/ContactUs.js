import React from 'react';

const ContactUsPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-3 py-10">
            <div className="container mx-auto py-10">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                Thank you for your interest in My Career Bridge Connect. We are here to help you bridge the gap
                                between education and Career. Please feel free to reach out to us for any inquiries, feedback, or assistance.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Address</h2>
                            <p className="text-gray-700 leading-relaxed">
                                SSCET, Salem, Tamil Nadu, India
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Details</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Phone: +91 63040 22592<br />
                                Email: cbcofficial007@gmail.com<br />
                                Website: www.myCareerbridgeconnect.com
                            </p>
                        </div>
                        <form>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                                    id="message"
                                    rows="4"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
