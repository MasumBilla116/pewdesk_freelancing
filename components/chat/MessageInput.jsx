import React from "react";
import { CiImageOn } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
const MessageInput = () => {
  return (
    <div className="flex items-center p-4 bg-success dark:bg-[#0000006e]">
      <form className="w-full">
        <label for="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <button
            type="button"
            className="inline-flex justify-center bg-warning dark:bg-success me-4  text-white text-2xl p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <CiImageOn />
            <span className="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 text-2xl text-white bg-warning dark:bg-success  rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <CiFaceSmile />
            <span className="sr-only">Add emoji</span>
          </button>
          <textarea
            id="chat"
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            className="inline-flex bg-warning dark:bg-success justify-center text-2xl text-white p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <LuSend />
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
