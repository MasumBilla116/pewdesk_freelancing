import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Axios from "../../utils/axios";
import { http_get_request } from "../../helpers/http_requests";
import { NavigationList } from "../utils/NavigationList";
import { BrandLogo } from "../utils/Brand";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { http, saveToken, token, user } = Axios();
  const uid = user?.id;

  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState();
  const [docsDomainName, setDocsDomainName] = useState("");

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const hostName = window.location.host.replace(/^[^.]+\./g, "");
    console.log("hostname", hostName);
    setDocsDomainName(`https://api.${hostName}`);

    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const getChannelDetails = async () => {
      try {
        setLoading(true);
        const res = await http_get_request({
          endpoint: `/channel/v1/getActiveChannel/${uid}`,
        });
        setChannel(res?.results);
      } catch (error) {
        console.error("Error fetching channel details:", error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };
    getChannelDetails();
  }, [uid]);

  return (
    <div
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-50 flex-col overflow-y-hidden bg-success duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2">
        <Link href="/dashboard" legacyBehavior>
          <a
            className={`flex justify-center items-center w-full border-b border-dashed border-[#eee]`}
            style={{ height: "80px" }}
          >
            <img
              style={{ height: "60px", margin: "0 auto" }}
              src={`${BrandLogo?.navbar}`}
            />
          </a>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="my-2.5 px-4 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {NavigationList?.map((list, index) => (
                <li key={index}>
                  <Link
                    href={`${list.link}`}
                    className={`group relative capitalize flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white dark:text-white duration-300 ease-in-out hover:bg-white/20 dark:hover:bg-meta-4 ${
                      pathname.includes(`${list.link}`) &&
                      "bg-white/20 dark:bg-meta-4"
                    }`}
                  >
                    {list.icon}
                    {list.title}
                  </Link>
                </li>
              ))}
              {/* <!-- Menu Item Dashboard --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </div>
  );
};

export default Sidebar;
