import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { http_get_request } from '../../helpers/http_requests';

const ViewBooking = () => {
    // router
    const router = useRouter();
    const { id } = router.query;

    // state
    const [booking_id, setBooking_id] = useState(id);
    const [newBookingId, setNewBookingId] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({});
    const [guestDetails, setGuestDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // fetch data
    const getBookingDetails = async () => {
        try {
            setLoading(true);

            const response = await http_get_request({ endpoint: `/booking/v1/getBookingDetails/${booking_id}` });
            setNewBookingId(response?.results?.booking_id)
            setBookingDetails(response?.results)
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGuestDetails = async () => {
        try {
            setLoading(true);
            const response = await http_get_request({ endpoint: `/booking/v1/getBookingGuestDetails/${booking_id}` });
            setGuestDetails(response?.results)
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect
    useEffect(() => {
        const controller = new AbortController();
        getBookingDetails();
        getGuestDetails();
        return () => controller.abort();
    }, [id])


    // handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails({ ...bookingDetails, [name]: value });
        if (value === 'cancelled') {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return ( 
        <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full">
                <div className="border-r w-8/12 border-black border-opacity-20">{/* Booking Details start */}
                    <div className="mt-10 w-10/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <h3 className="text-2xl px-4 font-semibold text-graydark dark:text-white dark:bg-black bg-meta-2 dark:border-white border-opacity-20 pb-1">
                            Booking Details
                        </h3>
                    </div> 
                    <div className="w-10/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10"> 
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> 
                            <div className="" >
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Booking Id</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.booking_id ? bookingDetails?.booking_id : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Room Type : </div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.room_type_name ? bookingDetails?.room_type_name : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Arrival Time</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.arrival_time ? bookingDetails?.arrival_time : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Rent Amount</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.rent_amount ? bookingDetails?.rent_amount : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Adults</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.adults ? bookingDetails?.adults : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Children</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.children ? bookingDetails?.children : "---"}</div>

                                    {/* <div className="flex-grow py-4 text-left">{moment(bookingDetails?.created_at).format('DD MMMM YYYY')}</div> */}
                                </div>
                            </div>

                            <div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Currency</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.currency_code ? bookingDetails?.currency_code : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Commission Type</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.commission_type !== null ? bookingDetails?.commission_type : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Commission Amount</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.commission_amount ? bookingDetails?.commission_amount : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Commission Rate</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.commission_rate ? bookingDetails?.commission_rate : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Check In</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.check_in ? bookingDetails?.check_in : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Check Out</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left">{bookingDetails?.check_out ? bookingDetails?.check_out : "-"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Booking Details end */}

                    {/* User Details start */}
                    <div className="mt-4 w-10/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <h3 className="text-2xl px-4 font-semibold text-graydark dark:text-white dark:bg-black bg-meta-2 dark:border-white border-opacity-20 pb-1">
                            Guest Details
                        </h3>
                    </div>
                    <div className="w-10/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="" >
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Name</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.first_name + " " + guestDetails?.last_name}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Gender : </div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.gender ? guestDetails?.gender : "-"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Country Name</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.country_name ? guestDetails?.country_name : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">City Name</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.city_name ? guestDetails?.city_name : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Zip Code</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.zip_code ? guestDetails?.zip_code : "---"}</div>
                                </div>
                                <div className="w-full px-4 justify-start items-center flex  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800 border-b border-b-gray border-b-1">
                                    <div className="capitalize py-2 w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">Address</div>
                                    <div className="flex justify-center items-center w-[30px]">:</div>
                                    <div className="flex-grow py-4 text-left capitalize">{guestDetails?.address ? guestDetails?.address : "---"}</div> 
                                </div>
                            </div> 
                        </div>
                    </div> 
                </div>
                <div className=" mt-10 mb-4 w-3/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <h3 className="text-2xl px-4 font-semibold text-graydark dark:text-white dark:bg-black bg-meta-2 dark:border-white border-opacity-20 pb-1">
                        Change Status
                    </h3> 
                    <div className="w-full sm:w-1/2 p-5 mr-2 "> 
                        <div className="flex space-x-4">
                            {
                                bookingDetails?.status === 'accepted' &&
                                <label className="inline-flex items-center  bg-success px-2 py-2 rounded-md">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="accepted"
                                        checked={bookingDetails?.status === 'accepted'}
                                        onChange={handleChange}
                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none  absolute opacity-0"
                                    />
                                    <span className="  text-black dark:text-white">Accepted</span>
                                </label>
                            }
                            {bookingDetails?.status === 'pending' && (
                                <>
                                    <label className="inline-flex items-center bg-warning px-2 py-2 rounded-md">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="pending"
                                            onChange={handleChange}
                                            checked={bookingDetails?.status === 'pending'}
                                            className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none  absolute opacity-0"
                                        />
                                        <span className=" text-black dark:text-white">Pending</span>
                                    </label>
                                    <label className="inline-flex items-center bg-danger px-2 py-2 rounded-md">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="cancelled"
                                            onChange={handleChange}
                                            checked={bookingDetails?.status === 'cancelled'}
                                            className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none  absolute opacity-0"
                                        />
                                        <span className=" text-black dark:text-white">Cancelled</span>
                                    </label>
                                </>
                            )}

                            {showModal && (
                                <div id="popup-modal" tabIndex="-1" className="modal-overlay">
                                    {/* ... your existing modal code ... */}
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="popup-modal"
                                    >
                                        {/* ... your existing close button code ... */}
                                    </button>
                                    <div
                                        id="popup-modal"
                                        tabIndex={-1}
                                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                    >
                                        <div className="relative p-4 w-full max-w-md max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button
                                                    type="button"
                                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-hide="popup-modal"
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                                <div className="p-4 md:p-5 text-center">
                                                    <svg
                                                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                        Are you sure you want to delete this product?
                                                    </h3>
                                                    <button
                                                        data-modal-hide="popup-modal"
                                                        type="button"
                                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                                    >
                                                        Yes, Im sure
                                                    </button>
                                                    <button
                                                        data-modal-hide="popup-modal"
                                                        type="button"
                                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                    >
                                                        No, cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {
                                bookingDetails?.status === 'cancelled' &&
                                <label className="inline-flex items-center bg-danger px-2 py-2 rounded-md">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="cancelled"
                                        onChange={handleChange}
                                        checked={bookingDetails?.status === 'cancelled'}
                                        className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none absolute opacity-0"
                                    />
                                    <span className="text-black dark:text-white">Cancelled</span>
                                </label>
                            }

                        </div>



                    </div>
                </div>
            </div>
        </div>














    )
}

export default ViewBooking