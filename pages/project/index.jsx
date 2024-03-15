"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustDataTable from "../../components/Tables/CustDataTable";
import { http_get_request } from "../../helpers/http_requests";
import { CiMenuKebab } from "react-icons/ci";
import { BsCashStack } from "react-icons/bs";
import { MdOutlinePaid } from "react-icons/md";
import { MdAddTask } from "react-icons/md";
import { MdTaskAlt } from "react-icons/md";
import { PiBugBeetleDuotone } from "react-icons/pi";
import { MdChecklist } from "react-icons/md";
import { SlDislike } from "react-icons/sl";
import { SlLike } from "react-icons/sl";
import { BiMessageRoundedDots } from "react-icons/bi";
import Link from "next/link";
import { GrEdit } from "react-icons/gr";

/** Cancel Bookign Modal Start */

const CancelBkingModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-25"></div>
            <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative p-4 text-center bg-white ">
                <button
                  onClick={onClose}
                  type="button"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to cancel this booking?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-danger rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Yes, Im sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/** Cancel Bookign Modal end */

const Booking = () => {
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleItems, setVisibleItems] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [offset, setOffset] = useState(0);

  const router = useRouter();
  const { url_status, url_month_year } = router.query;
  const initialBookingStatus = url_status || "pending";
  const initialMonthYear = url_month_year || selectedDate;

  const [bookingStatus, setBookingStatus] = useState(initialBookingStatus);
  const [month_year, setMonth_year] = useState(initialMonthYear);

  // bookingStatus,month_year

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewOpen = (data) => {
    setIsViewModalOpen(true);
    setBookingDetails(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await http_get_request({
          endpoint: `/booking/v1/getBookingList?status=${bookingStatus}&month_year=${month_year}`,
        });
        setBookingList(response?.results || []);
        setTotalItems(response?.total || 0);
      } catch (error) {
        console.error("Error fetching booking list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingStatus, month_year]);

  const handleInfiniteScroll = async () => {
    try {
      if (isFetching) {
        return; // Avoid making multiple simultaneous requests
      }

      const mainContainer = document.getElementById("mainContainer");
      const { clientHeight, scrollTop, scrollHeight } = mainContainer;

      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        setIsFetching(true);

        const response = await http_get_request({
          endpoint: `/booking/v1/getBookingList?offset=${bookingList.length}&status=${bookingStatus}&month_year=${month_year}`,
        });

        setBookingList((prevList) => [...prevList, ...response.results]);
        setOffset((prevOffset) => prevOffset + response.results.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const mainContainer = document.getElementById("mainContainer");
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleInfiniteScroll);
    } else {
      console.error("Element with ID 'mainContainer' not found.");
    }
    return () => {
      mainContainer.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [offset, isFetching, bookingList]);

  useEffect(() => {
    const { status } = router.query;
    setBookingStatus(status);
  }, [router.query]);

  const changeStatus = (e) => {
    const newStatus = e.target.value;
    router.push(
      `/booking?url_status=${newStatus}&url_month_year=${month_year}`
    );
    setBookingStatus(newStatus);
  };

  useEffect(() => {
    const currentDate = new Date();

    // Extract and format month and year
    const selectedMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0"); // Months are zero-based, so add 1
    const selectedYear = currentDate.getFullYear();
    const formattedDate = `${selectedYear}-${selectedMonth}`;

    setSelectedDate(currentDate);
    setMonth_year(formattedDate);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Extract and format month and year
    const selectedMonth = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
    const selectedYear = date.getFullYear();
    const formattedDate = `${selectedYear}-${selectedMonth}`;
    router.push(
      `/booking?url_status=${bookingStatus}&url_month_year=${formattedDate}`
    );
    setMonth_year(formattedDate);
  };

  useEffect(() => {
    setBookingStatus(url_status);
    setMonth_year(url_month_year);
  }, [router.query]);

  return (
    <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl mt-2 font-semibold text-black dark:text-white mb-0 uppercase text-opacity-75">
            Project
          </h4>
          <p className="font-semibold text-black dark:text-white mb-0 uppercase text-opacity-50">
            All of your running project
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto mb-2 mt-2">
        <div style={{ borderTop: "1px solid rgba(189, 189, 189, 0.5)" }}></div>
        {/* start card */}

        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-4">
          <div className="w-full   relative mt-4 p-4 border  dark:border-4 border-[#eee] hover:border-success rounded-lg shadow sm:p-6 bg-white  dark:bg-boxdark dark:border-strokedark">
            <div className="absolute top-2.5 right-2.5 flex items-center">
              <span className="rounded bg-[#f4c4044a] text-black text-opacity-75 dark:text-white dark:bg-warning dark:bg-opacity-50 text-sm bg-stroke px-2 font-semibold me-2">
                Processing
              </span>
              <span className="rounded text-black text-opacity-75 dark:text-white dark:bg-warning dark:bg-opacity-50 text-sm bg-stroke px-2 font-semibold me-2 ">
                Live
              </span>
              {/* dropdown menu */}
              <div class="relative inline-block">
                <span
                  class="text-black text-opacity-75 dark:text-white text-sm font-semibold"
                  id="menu-button"
                >
                  <CiMenuKebab />
                </span>
                <div
                  class="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-2"
                    >
                      Item 3
                    </a>
                  </div>
                </div>
              </div>

              {/* end dropdown menu */}
            </div>
            <div className="flex justify-start items-center">
              <img
                className="rounded-circle w-12 h-12 me-4"
                src="https://avatar.iran.liara.run/public"
                alt=""
              />
              <div>
                <h5 className="text-md font-semibold text-black dark:text-white mb-0 uppercase text-opacity-75">
                  Connect wallet
                  <br />
                </h5>
                <span className="text-black text-opacity-75 text-sm bg-stroke dark:text-stroke dark:text-opacity-50 dark:bg-black px-2 font-semibold">
                  1 day ago
                </span>
              </div>
            </div>

            <div className="grid  grid-cols-2 gap-4 mt-4">
              {/* start budget */}
              <div className="w-full bg-stroke dark:bg-black rounded px-4 ">
                <div className="flex items-center">
                  <BsCashStack className="me-2" /> Budget $5000
                </div>
              </div>
              <div className="w-full bg-stroke dark:bg-black rounded   px-4 ">
                <div className="flex items-center">
                  <MdOutlinePaid className="me-2" /> Paid $5000
                </div>
              </div>
              {/* task */}
              <div className="w-full bg-stroke dark:bg-black rounded   px-4 ">
                <div className="flex items-center">
                  <MdAddTask className="me-2" /> Task 15
                </div>
              </div>

              <div className="w-full bg-stroke dark:bg-black rounded   px-4 ">
                <div className="flex items-center">
                  <MdTaskAlt className="me-2" /> Complete 5
                </div>
              </div>

              {/* start bug */}
              <div className="w-full bg-stroke dark:bg-black rounded   px-4 ">
                <div className="flex items-center">
                  <PiBugBeetleDuotone className="me-2" /> Bug 0
                </div>
              </div>
              <div className="w-full bg-stroke dark:bg-black rounded   px-4 ">
                <div className="flex items-center">
                  <MdChecklist className="me-2" /> Fix 0
                </div>
              </div>
            </div>

            <div className="w-full bg-[#f4c4044a] rounded-full dark:bg-[#f4c4044a] mt-4">
              <div
                className="bg-success text-white text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: "85%" }}
              >
                85% complete
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex justify-evenly items-center">
                <Link
                  href={"/project/create"}
                  className="text-center px-2 py-2  rounded"
                >
                  <GrEdit />
                </Link>
                <Link href={"/chat"} className="text-center px-2 py-2  rounded">
                  <BiMessageRoundedDots />
                </Link>
                <button
                  type="button"
                  className="text-center px-2 py-2  rounded"
                >
                  <div className="flex justify-center items-center">
                    <SlDislike />
                    <div className="  ms-2">12</div>
                  </div>
                </button>
                <button
                  type="button"
                  className="text-center px-2 py-2   rounded"
                >
                  <div className="flex justify-center items-center">
                    <SlLike />
                    <div className="  ms-2">12</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* end card */}
      </div>
    </div>
  );
};

export default Booking;
