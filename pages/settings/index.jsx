import toast from "../../components/Toast";
import ChannelFileUpload from "../../components/uploads/channel_File_Upload";
import ChannelImageUpload from "../../components/uploads/channel_Image_Upload";
import { http_get_request, http_put_request } from "../../helpers/http_requests";
import Axios from "../../utils/axios";
import React, { useEffect, useState } from 'react';

const Channel_details = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { http, saveToken, token, user } = Axios();

  const [loading, setLoading] = useState(true);
  const [channelId, setChannelId] = useState(null);
  const [channel, setChannel] = useState({});
  const [countrylist, setCountryList] = useState([]);
  const [country_id, setCountryId] = useState(null);
  const [newAccessKey, setNewAccessKey] = useState();



  /**Channel Info start */
  useEffect(() => {
    const controller = new AbortController();
    const channelId = localStorage.getItem('channel_id');
    setChannelId(channelId);


    const getChannelDetails = async () => {
      try {
        setLoading(true);

        const res = await http_get_request({
          endpoint: `/channel/v1/getChannelDetails/${channelId}`,
        });
        console.log(res?.results)
        setChannel((prev) => ({
          channel_name: res?.results?.channel_name,
          contact_number: res?.results?.contact_number,
          email: res?.results?.email,
          service_address: res?.results?.service_address,
          service_type: res?.results?.service_type,
          secret_key: res?.results?.secret_key,
          access_key: res?.results?.access_key,
          logo_source: res?.results?.logo_source,
          country: res?.results?.country?.id,
          documents: res?.results?.documents,
          status: res?.results?.status

        }))
        setCountryId(res?.results?.country?.id || null);
      } catch (error) {
        console.error("Error fetching channel details:", error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    if (channelId) {
      getChannelDetails();
    }

    return () => controller.abort();
  }, [newAccessKey]);


  /**Channel Info end */

  const getAllCountries = async () => {
    try {
      setLoading(true);

      const authRes = await http_get_request({
        endpoint: "/geo/v1/getCountryList",
      });
      setCountryList(authRes?.results || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === 'country') {
      const selectedCountry = countrylist.find((country) => country.id === parseInt(value, 10));


      setCountryId(selectedCountry ? selectedCountry.id : null);
    }

    setChannel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };







  /*** Submit Update Data Start  */
  let data = {};

  const handleSubmit = async (e) => {

    e.preventDefault();

    data = {
      // ...channel,
      channel_name: channel?.channel_name,
      contact_number: channel?.contact_number,
      email: channel?.email,
      service_address: channel?.service_address,
      service_type: channel?.service_type,
      secret_key: channel?.secret_key,
      access_key: channel?.access_key,
      logo_source: channel?.logo_source,
      country: country_id,


    }


    await http_put_request({ endpoint: `/channel/v1/putChannel/${channelId}`, data: data }).then(function (res) {
      if (res.status === 'success') {
        notify("success", `Update Successfully`);
      } else {
        notify("error", `Something went wrong`);
      }
    });


  };

  /*** Submit Update Data end  */



  const generateAccesskey = async () => {

    await http_put_request({ endpoint: `/channel/v1/generateAccessKey/${channelId}` }).then(function (res) {
      if (res.status === 'success') {
        setNewAccessKey(res?.results)
        notify("success", `Generate Successfully`);
      } else {
        notify("error", `Something went wrong`);
      }
    });
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">

          <div className="col-span-5 xl:col-span-3">

          <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white uppercase">
                  Company Logo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">

                    <ChannelImageUpload channel_logo={channel?.logo_source} channel_id={channelId} channel={channel} />

                  </div>
                </form>
              </div>
            </div>

            <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white uppercase">
                  Channel Info
                </h3>
              </div>
              <div className="p-7">
                <form  >


                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-2/3">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="channel_name"
                    >
                      Channel Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="channel_name"
                        id="channel_name"
                        placeholder="Devid Jhon"
                        defaultValue={channel?.channel_name}
                        readOnly

                      />
                    </div>
                    </div>



                  <div className="w-full sm:w-1/3">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="country_code"
                      >
                        Country
                      </label>
                      <div className="relative">

                        <select
                          name="country_code"
                          id="country_code"
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={country_id}
                          disabled  
                        >
                          <option value="" disabled>
                            Choose a country
                          </option>
                          {countrylist.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>



                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="email"
                          name="email"
                          id="emailAddress"
                          placeholder="devidjond45@gmail.com"
                          defaultValue={channel?.email}
                          readOnly

                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="mobile_number"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        defaultValue={channel?.contact_number}
                        readOnly
                      />
                    </div>
                  </div>


                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="nationality"
                      >
                        Service Type

                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="service_type"
                        id="service_type"
                        placeholder="App/Web"
                        defaultValue={channel?.service_type}
                        readOnly

                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="nationality"
                      >
                        Service Address
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="service_address"
                        id="service_address"
                        placeholder="http://******"
                        defaultValue={channel?.service_address}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                 





                  </div>






                  <div className="flex justify-end gap-4.5">

                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                      type="submit"
                    // onClick={() => { handleSubmit() }}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
           
          </div>

          <div className="col-span-5 xl:col-span-2">

            <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white uppercase">Secret & Access Keys</h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5">

                  <div className="w-full">
                    <h3 className="font-bold text-black dark:text-white ">
                      Secret Key
                    </h3>
                    <div className="flex gap-2.5 h-8 border border-gray text-left px-2.5 items-center uppercase text-black dark:text-white ">{channel?.secret_key}</div>
                  </div>

                  <div className="w-full">
                    <h3 className="font-bold text-black dark:text-white ">
                      Access Key
                    </h3>
                    <div className="flex flex-col justify-between gap-2.5 text-center py-1 uppercase">
                      <div className="border-gray border h-8 items-center flex w-full  px-2.5 text-left text-black dark:text-white">{channel?.access_key}</div>
                      <button
                        className="flex h-10 w-4/12 justify-center rounded bg-primary py-2 px-4 mt-2 font-medium text-gray hover:bg-opacity-95 ml-auto"
                        onClick={generateAccesskey}
                      >
                        Generate
                      </button>
                    </div>
                  </div>


                </div>
              </div>
            </div>


            <div
              className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white uppercase">
                  Company Documentation
                </h3>
              </div>
              <div className="p-7">

                <form action="#">
                  <ChannelFileUpload channel_logo={channel?.logo_source} channel_id={channelId} channel={channel} />
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Channel_details;
