import { http_put_request } from "../../helpers/http_requests";
import Axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "../Toast/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faImage } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";




const ChannelImageUpload = ({ channel_id, channel }) => {
    const { http, saveToken, token } = Axios();
    const router = useRouter();
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);



    // images use-state
    const [profileImgDelete, setProfileImgDelete] = useState(false);
    const [loader, setLoader] = useState(false);
    const [pdfPreviews, setPdfPreviews] = useState([channel.documents]);
    const [originalImage, setOriginalImage] = useState();

    useEffect(() => {
        if (Array.isArray(pdfPreviews) && pdfPreviews.length === 0) {
            setPdfPreviews([]);
            setProfileImgDelete(false);
        } else if (channel.documents && Array.isArray(channel.documents)) {
            setOriginalImage(channel.documents);
            setPdfPreviews(channel.documents.map(doc => `${doc}`));
            setProfileImgDelete(true);
        }
    }, [channel.documents]);




    // upload new profile photos
    const uploadToServer = (event) => {
        setLoader(true);
        setTimeout(async () => {
            handleImageChange(event);
            const body = new FormData();
            const image = event.target.files[0];
            if (
                image &&
                !["image/jpg", "image/jpeg", "image/png", "application/pdf", "application/zip"].includes(image.type)
            ) {
                notify("warning", "Allowed formats: JPG, JPEG, PNG, PDF, ZIP");
                setLoader(false);
                return false;
            }

            body.append("file", image);
            const fname = image.name;
            body.append("filename", fname);

            // update profile in api
            const api_res = await updateProfilInApi(fname);

            if (api_res === "success") {
                setOriginalImage(fname);
                const response = await fetch(`/api/upload`, { method: "POST", body });
                console.warn("respone: ", response);
                if (response.ok) {
                    setLoader(false);
                    setProfileImgDelete(true);
                    notify("success", "Files uploaded successfully");
                    router.reload();
                } else {
                    setLoader(false);
                    notify("warning", "Error uploading files");
                }
            } else {
                setLoader(false);
                notify("warning", "Something is worng");
            }
        }, 800);
    };




    // update profile in api
    const updateProfilInApi = async (file = null) => {

        const data = [...pdfPreviews, file];

        const res = await http_put_request({
            endpoint: `/channel/v1/putDocuments/${channel_id}`,
            data: { documents: data },
        });
        console.warn("update res: ", res);
        return res?.status;
    };





    // image previewer handler
    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const newPreviews = [];

            for (let i = 0; i < e.target.files.length; i++) {
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    newPreviews.push(reader.result);
                    setPdfPreviews([...pdfPreviews, ...newPreviews]);
                });

                reader.readAsDataURL(e.target.files[i]);
            }
        }
    };



    const handleDeleteProfile = async (pdfPreview, index) => {
        console.log(pdfPreview, index);
        setLoader(true);

        const newPdfPreviews = [...pdfPreviews];
        await updateProfilInApi();
        newPdfPreviews.splice(index, 1);
        setPdfPreviews(newPdfPreviews);
        notify("success", "PDF deleted successfully");

        const data = {
            documents: newPdfPreviews
        };

        try {
            // Send the updated data to the server
            const res = await http_put_request({
                endpoint: `/channel/v1/putDocuments/${channel_id}`,
                data,
            });

            const response = await fetch("/api/deleteImage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageName: pdfPreview }),
            });

        } catch (error) {
            console.error("Error updating documents on the server:", error);
        }

        // Set loader and profile state accordingly
        setLoader(false);
        setProfileImgDelete(false);
    };


    const handleDownloadFile = (pdfPreview) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `/upload/${pdfPreview}`;
        downloadLink.download = pdfPreview;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    


    const getFileNameFromUrl = (url) => {
        if (url) {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }
        return ''; // Return an empty string or handle it as appropriate for your use case
    };




/** custome style start */
    const icon_btn_style = {
        position: "absolute",
        bottom: " 1px",
        right: "0px",
        borderRadius: "50%",
        border: "none",
        background: "#6060fb",
        width: "100%",
        height: "100%",
        color: "aliceblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    const pdfContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const pdfIconStyle = {
        width: '24px', // Set the desired width for your PDF icon
        height: '24px', // Set the desired height for your PDF icon
        marginRight: '8px', // Adjust the margin as needed
    };

    const pdfNameStyle = {
        margin: '0',
    };

    /** custome style end */






    return (

        <>
            <div className="rounded-full">
                {pdfPreviews.length === 0 ? (
                    <>
                        <p>Please upload your necessary file</p>
                        <div
                            // id="FileUpload"
                            className="relative mb-5.5 block mt-10 w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                        >
                            <input
                                onChange={uploadToServer}
                                type="file"
                                style={{ ...icon_btn_style, opacity: "0", cursor: "pointer" }}
                            />
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                            fill="#3C50E0"
                                        />
                                    </svg>
                                </span>
                                <p>
                                    <span className="text-primary">Click to upload</span> 
                                </p>
                                <p className="mt-1.5">PNG, JPG, JPEG, PNG or GIF</p> <p>(max, 800 X 800px)</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-5">
                            {pdfPreviews.map((pdfPreview, index) => {
                                if (typeof pdfPreview !== 'string' || pdfPreview.trim() === '') {
                                    return null;
                                }

                                const fileExt = pdfPreview.split('.').pop().toLowerCase();

                                return (
                                    <div key={index} className="flex items-center mb-2" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '5px', ...pdfContainerStyle }}>
                                    <div className="mr-2">
                                        {fileExt === 'pdf' ? (
                                            <FontAwesomeIcon icon={faFilePdf} />
                                        ) : (fileExt === 'jpg' || fileExt === 'png' || fileExt === 'jpeg') ? (
                                            <FontAwesomeIcon icon={faImage} />
                                        ) : null}
                                    </div>
                                    <p className="mr-2 flex-grow capitalize" style={pdfNameStyle}>{getFileNameFromUrl(pdfPreview)}</p>
                                    <button
                                        onClick={() => handleDeleteProfile(pdfPreview, index)}
                                        className="text-sm text-danger relative ml-5"
                                        disabled={channel?.status !== "pending"}
                                    >
                                        Delete
                                    </button>
                                    <FontAwesomeIcon onClick={() => handleDownloadFile(pdfPreview, index)} icon={faDownload} className="ml-2" />
                                    
                                </div>
                                

                                );
                            })}
                        </div>


                        <div
                            // id="FileUpload"
                            className="relative mb-5.5 block mt-5 w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                        >
                            <input
                                onChange={uploadToServer}
                                type="file"
                                style={{ ...icon_btn_style, opacity: "0", cursor: "pointer" }}
                                disabled={channel?.status !== "pending"}
                            />
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                            fill="#3C50E0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                            fill="#3C50E0"
                                        />
                                    </svg>
                                </span>
                                <p>
                                    <span className="text-primary">Click to upload</span> 
                                </p>
                                <p className="mt-1.5"> PNG, JPG, JPEG or GIF</p>
                                <p>(max, 800 X 800px)</p>
                            </div>
                        </div>
                    </>
                )}
            </div>


        </>
    );
};

export default ChannelImageUpload;
