import React from 'react';

const ViewBooking = ({ onClose, isOpen, bookingDetails }) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-25"></div>
                        <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full">
                            {/* Modal content */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            {/* Your modal content goes here */}
                            <div>
                                <h1 className="text-2xl font-semibold mb-4">Modal Title</h1>
                                <p className="text-gray-700">Modal content goes here.</p>
                                {/* Add your form or other content here */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewBooking;
