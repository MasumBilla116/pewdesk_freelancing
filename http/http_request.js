import { toast } from "react-toastify";

var toaster_message = "Something is worng 🤞 ❌";
export const http_post_request = async (params) => {
  var toast_type = 0;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api_post_request`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-type": "application/json" },
      }
    );

    const responseData = await res.json();
    console.warn("http data: ", responseData);
    if (responseData.success === true) {
      switch (params.action) {
        case "mail":
          toaster_message = `${responseData.message} 👋`;
          toast_type = 1;
          break;
        case "sendotp":
          toaster_message = `${responseData.message} 👋`;
          toast_type = 1;
          break;
        case "register":
          toaster_message = `${responseData.message} 👋`;
          toast_type = 1;
          break;
        case "login":
          toaster_message = `${responseData.message} ✌️`;
          toast_type = 1;
          break;
        case "insert":
          toaster_message = `${responseData.message} 👍`;
          toast_type = 1;
          break;
        case "delete":
          toaster_message = `${responseData.message}🤞 ❌`;
          toast_type = 1;
          break;
        case "update":
          toaster_message = `${responseData.message} 👍 ✅`;
          toast_type = 1;
          break;
        case "active":
          toaster_message = `${responseData.message} 🍀👋`;
          toast_type = 1;
          break;
        case "deactive":
          toaster_message = `${responseData.message} 🤞 ❌`;
          toast_type = 1;
          break;
        default:
          toaster_message = `${responseData.message} 🤞 ❌`;
          break;
      }
      if (toast_type === 1) toast.success(toaster_message);
      else toast.warning(`${responseData.message} 🤞 ❌`);
      return responseData;
    }
    toast.warning(`${responseData.message} 🤞 ❌`);
    return responseData;
  } catch (error) {
    toast.warning(toaster_message);
    return {
      error: true,
      message: "Something went wrong",
      success: false,
      data: [],
    };
  }
};

export const HttpGetRequest = async (params) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api_get_request`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    toast.warning(toaster_message);
    return {
      error: true,
      message: error,
      success: false,
      data: [],
    };
  }
};
