import moment from 'moment';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { http_get_request } from "../../helpers/http_requests";


const ManageReport = () => {

    // next router
    const router = useRouter();
    const { url_month_year } = router.query;

    // state
    const [loading, setLoading] = useState(false);
    // const [month_year, setMonth_year] = useState("2023-12");
    const [paymentList, setpaymentList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [rentAmount, setRentAmount] = useState(0);
    const [commiAmount, setCommiAmount] = useState(0);

    const initialMonthYear = url_month_year || selectedDate;
    const [month_year, setMonth_year] = useState(initialMonthYear);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await http_get_request({
                    endpoint: `/booking/v1/getBookingPaymentList?month_year=${month_year}`,
                });
                setpaymentList(response?.results)
                // calculate amount
                setCommiAmount(0);
                setRentAmount(0);
                if (response?.results?.length > 0) {
                    response?.results?.map((data) => {
                        totalCommissionAmount(data?.commission_amount);
                        totalRentAmount(data?.rent_amount);
                    });
                }
            } catch (error) {
                console.error('Error fetching booking list:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [month_year]);

    // useEffect
    useEffect(() => {
        const currentDate = new Date();
        const selectedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const selectedYear = currentDate.getFullYear();
        const formattedDate = `${selectedYear}-${selectedMonth}`;
        setSelectedDate(currentDate);
        setMonth_year(formattedDate);
    }, []);

    useEffect(() => {
        setMonth_year(url_month_year);
    }, [router.query]);

    // handler
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
        const selectedYear = date.getFullYear();
        const formattedDate = `${selectedYear}-${selectedMonth}`;
        router.push(`/report?url_month_year=${formattedDate}`);
        setMonth_year(formattedDate);
    };
    const totalRentAmount = amount => {
        setRentAmount(prev => prev + amount);
    }

    const totalCommissionAmount = amount => {
        setCommiAmount(prev => prev + amount);
    }
    return (
        <div className="p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between">

                <div>

                    <h4 className="text-2xl mt-2 font-semibold text-black dark:text-white mb-0 uppercase text-opacity-75">
                        Reports
                    </h4>
                    <p className="font-semibold text-black dark:text-white mb-0 uppercase text-opacity-50">All of your Reports</p>
                </div>


                <div className=" items-center">
                    <label className="mb-3 block text-black dark:text-white">
                        Filter By Date
                    </label>
                    <div className="relative">
                        <svg class="hidden fill-current sm:block absolute z-1 top-[46%] right-2" width="9" height="7" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill=""></path></svg>
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
            <div className="max-w-full overflow-x-auto mb-5  mt-5">
                <div style={{ borderTop: '1px solid rgba(189, 189, 189, 0.5)' }}>
                </div>
                {
                    paymentList?.length === 0 ?
                        <>
                            <div className="flex items-center justify-center h-full mt-3">
                                <h3 className="text-2xl mt-2 font-semibold text-black dark:text-white mb-0 capitalize text-opacity-50">No reports available this month!</h3>
                            </div>
                        </>
                        :
                        <table className="w-full table-auto mt-5">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[100px] py-4 px-3 font-medium text-black dark:text-white xl:pl-11">
                                        Sl
                                    </th>
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Booking Id
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Date
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Room Type
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Rent Amount
                                    </th>

                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Commission Rent & type
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Commission Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList?.map((product, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-3  dark:border-strokedark xl:pl-11">
                                            <p className="text-black dark:text-white capitalize">{key + 1}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {product.booking_id}
                                            </h5>

                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {moment(product?.created_at).format("DD MMM YYYY")}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {product?.room_type_name}
                                            </h5>
                                        </td>
                                       
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white capitalize">
                                                {` ${product?.currency_code} ${product?.commission_rate}`} - {product.commission_type}

                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white text-center">
                                                {product.rent_amount}
                                            </h5>

                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-7 dark:border-strokedark">
                                            <h5 className="font-medium text-black px-7 dark:text-white text-right ">
                                                {product.commission_amount}
                                            </h5>

                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                            <tfoot className='dark:bg-meta-4 bg-gray-2 '>
                                <tr className='border-b border-[#eee] '>
                                    <th colSpan={5} className='text-right py-2'></th>
                                    <td className='text-center  py-2'><span className='me-2 font-medium text-black dark:text-white'>TOTAL: </span><span className='me-[3.3rem]'>{rentAmount}</span></td>
                                    <td className='text-right py-2'><span className='me-2 font-medium text-black dark:text-white'>TOTAL: </span><span className='me-[3.3rem]'>{commiAmount}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                }
            </div>
        </div>
    )
}

export default ManageReport
