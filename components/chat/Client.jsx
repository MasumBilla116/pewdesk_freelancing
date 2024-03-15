import React from "react";
import Image from "next/image";

const Client = ({ name, company, imgSrc, active, activeIn }) => {
  return (
    <button
      type="button"
      className="w-full p-2 hover:bg-[beige] dark:hover:bg-[#013e40] border-b border-[#80808040]"
    >
      <div className="flex">
        <div className="h-12 w-12 flex-none rounded-full relative">
          <div
            className={`absolute bottom-1 right-0 w-3 h-3 border-2 border-[#f4c4044a] dark:border-black rounded-full ${
              active ? "bg-success" : "bg-gray "
            } `}
          ></div>
          <img
            className="h-12 w-12 rounded-full"
            src={imgSrc}
            alt="Jese image"
          />
        </div>
        <div className="grow">
          <div className="text-bold dark:text-white text-start ps-4 capitalize">
            {name}
            {active === false && (
              <span className="text-[11px]  text-bodydark2 ms-2">
                {activeIn}{" "}
              </span>
            )}
          </div>
          <div className="text-[12px] dark:text-strock text-start ps-4 capitalize">
            {company}
          </div>
        </div>
        <div className="flex-none h-12 w-12">
          <div className="flex justify-center items-center h-12 w-12">
            <div
              className={`${
                active
                  ? "bg-danger dark:bg-danger"
                  : "bg-warning dark:bg-white/20"
              }  text-white  w-6 h-6 rounded-full`}
            >
              2
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Client;
