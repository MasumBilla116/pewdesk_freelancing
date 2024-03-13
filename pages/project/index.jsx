"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustDataTable from "../../components/Tables/CustDataTable";
import { http_get_request } from "../../helpers/http_requests";

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
              <div class="relative p-4 text-center bg-white ">
                <button
                  onClick={onClose}
                  type="button"
                  class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
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
                  <span class="sr-only">Close modal</span>
                </button>
                <svg
                  class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
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
                <p class="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to cancel this booking?
                </p>
                <div class="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    type="button"
                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-danger rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
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

  const columns = [ 
    {
      name: "S.I",
      selector: 1,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.title,
      sortable: true,
    },
    
    {
      name: "Cost",
      selector: (row) => row.title,
      sortable: true,
    }
  ];

  

  return (
    <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl mt-2 font-semibold text-black dark:text-white mb-0 uppercase text-opacity-75">
            Booking
          </h4>
          <p className="font-semibold text-black dark:text-white mb-0 uppercase text-opacity-50">
            All of your project
          </p>
        </div>

        <div className="flex items-center">
          <div className="mr-3">
            <label className="mb-2 block text-black dark:text-white">
              Filter By Status
            </label>
            <div className="relative">
              <select
                name="status"
                id="status"
                onChange={changeStatus}
                value={bookingStatus}
                className="w-full h-12 rounded border border-stroke bg-gray py-3 px-7 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="cancelled">Canceled</option>
              </select>
            </div>
          </div>
          <div className="ml-2">
            <label className="mb-2 block text-black dark:text-white">
              Filter By Date
            </label>
            <div className="relative">
              <svg
                class="hidden fill-current sm:block absolute z-1 top-[46%] right-2"
                width="9"
                height="7"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                  fill=""
                ></path>
              </svg>

              <DatePicker
                // showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="h-12 filter-calender custom-input-date custom-input-date-1 rounded border border-stroke bg-gray py-3 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                calendarClassName="absolute top-full mt-2 left-0 z-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto mb-2 mt-2">
        <div style={{ borderTop: "1px solid rgba(189, 189, 189, 0.5)" }}></div>
        <CustDataTable columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default Booking;
