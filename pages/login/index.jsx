"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignInComponent from "../../components/Login";
import PostVerifyOtpCompo from "../../components/Register/PostVerifyOtpCompo";
import RegWithPersonalInfo from "../../components/Register/RegWithPersonalInfo";
import SignUpFirstComponent from "../../components/Register/SignUpFirstComponent";
import toast from "../../components/Toast";
import { http_post_request } from "../../helpers/http_requests";
import Axios from "../../utils/axios";
// const { notify } = MyToast();

const LogIn = () => {
  const [signup, setSignup] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { http, saveToken, token, logout } = Axios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reference, setReference] = useState("");

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const [postEmailOtp, setPostEmailOtp] = useState({
    email: "",
    name: "",
  });

  const [postVerifyOtp, setPostVerifyOtp] = useState({
    otp: "",
  });

  const [profile, setProfile] = useState({
    mobile_number: "",
    password: "",
    id_type: "",
    nid: "",
    gender: "",
    nationality: "",
    country_code: "",
    state: null,
    city: null,
    zip_code: "",
    address: "",
  });

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token]);

  /**------------------------OTP sent related start --------------------------- */

  const [isOtpSent, setIsOtpSent] = useState(false);

  const otpSent = async (event) => {
    event.preventDefault();

    await http_post_request({
      endpoint: "/otp/v1/postEmailOtp",
      data: { ...postEmailOtp },
    }).then(function (authRes) {
      if (authRes.status === "success") {
        console.log("calling", authRes);
        notify("success", `Check your mail`);
        setIsOtpSent(true);
      } else {
        notify("error", `Something went wrong`);
      }
    });
  };

  /**------------------------OTP sent related end --------------------------- */

  /**------------------------OTP verify related start --------------------------- */

  const [isVerify, setIsVerify] = useState(false);

  const otpVerify = async (event) => {
    event.preventDefault();
    await http_post_request({
      endpoint: "/otp/v1/postVerifyOtp",
      data: { reference: postEmailOtp?.email, otp: postVerifyOtp?.otp },
    }).then(function (authRes) {
      if (authRes.status === "success") {
        // const result = authRes?.results;
        notify("success", `Verify Successfully`);
        setIsVerify(true);
      } else {
        // toast.error(authRes.message)
        notify("error", `Something went wrong`);
      }
    });
  };

  /**------------------------OTP verify related end --------------------------- */

  /**------------------------Profile start --------------------------- */

  const submitProfile = async (event) => {
    event.preventDefault();
    // console.log("profile", profile);

    await http_post_request({
      endpoint: "/auth/v1/postRegister",
      data: {
        ...profile,
        email: postEmailOtp?.email,
        full_name: postEmailOtp?.name,
      },
    });
    // .then(function (authRes) {
    //   if (authRes.status === "success") {
    //     const result = authRes?.results;
    //     notify("success", `Successfully register`);
    //     saveToken(result?.user, result?.access_token);
    //   } else {
    //     notify("error", `Something went wrong`);
    //   }
    // });
  };

  /**------------------------Profile End --------------------------- */

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    const authRes = await http_post_request({
      endpoint: "/auth/v1/postLogin",
      data: { email: email, password: password },
    });
  };

  const handleSignupClick = () => {
    setSignup(!signup);
  };

  return (
    <>
      <div className="flex rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  items-center justify-center h-screen w-full  ">
        <div className="flex w-full md:w-10/12 flex-wrap justify-center items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-2.5 inline-block" href="/">
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo.png"}
                  alt="Logo"
                  width={200}
                  height={112}
                />
              </Link>

              <p className="2xl:px-00">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              {signup === false ? (
                <>
                  <SignInComponent
                    submitForm={submitForm}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setLoading={setLoading}
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  {isOtpSent === false ? (
                    <SignUpFirstComponent
                      otpSent={otpSent}
                      setPostEmailOtp={setPostEmailOtp}
                      postEmailOtp={postEmailOtp}
                    />
                  ) : (
                    <>
                      {isVerify === false ? (
                        <PostVerifyOtpCompo
                          otpVerify={otpVerify}
                          setPostVerifyOtp={setPostVerifyOtp}
                          postVerifyOtp={postVerifyOtp}
                          reference={postEmailOtp?.email}
                        />
                      ) : (
                        <RegWithPersonalInfo
                          profile={profile}
                          setProfile={setProfile}
                          submitProfile={submitProfile}
                        />
                      )}
                    </>
                  )}
                </>
              )}

              <div className="mt-6 text-left">
                <p>
                  {signup === false
                    ? "Don’t have any account?"
                    : "Already have an account"}

                  <dev
                    className=" ml-4 text-primary hover:underline cursor-pointer"
                    onClick={handleSignupClick}
                  >
                    {signup === false ? "Sign Up" : "Sign In"}
                  </dev>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
