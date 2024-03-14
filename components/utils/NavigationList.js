import { BsChatText } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
export const NavigationList = [
  {
    title: "dashboard",
    icon: <LuLayoutDashboard />,
    link: "/dashboard",
  },
  {
    title: "Chat",
    icon: <BsChatText />,
    link: "/chat",
  },
  {
    title: "project",
    icon: <FaLaptopCode />,
    link: "/project",
  },
  {
    title: "New Project",
    icon: <FaCode />,
    link: "/project/create",
  },
  {
    title: "project reports",
    icon: <FaRegFileCode />,
    link: "/project/reports",
  },
  {
    title: "settings",
    icon: <IoSettingsOutline />,
    link: "/settings",
  },
];
