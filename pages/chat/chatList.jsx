import { useEffect, useRef } from "react";
import Client from "../../components/chat/Client";
import MessageInput from "../../components/chat/MessageInput";
import ReceiverText from "../../components/chat/ReceiverText";
import SenderText from "../../components/chat/SenderText";

const ChatList = () => {
  const scrollableContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      const { current: scrollableContainer } = scrollableContainerRef;
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <div className="flex">
      <div className="w-[35%] dark:bg-[#0000006e] bg-[#f4c4044a] border-r border-[#00b6fd70] ">
        <form className="flex items-center max-w-lg mx-auto px-4 pt-4">
          <label for="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-[#80808040] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-meta-4 dark:border-[#80808040]   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ...."
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                />
              </svg>
            </button>
          </div>
        </form>
        <hr className="mt-4 mb-4 border-[#80808040] border-2" />
        <div className="grid-col-1 h-[394px] overflow-y-auto ">
          <Client
            name="Masum Billa"
            company={"IT Company Of USA"}
            imgSrc={"https://avatar.iran.liara.run/public"}
            active={false}
            activeIn={"5m ago"}
          />
          <Client
            name="Masum Billa"
            company={"IT Company Of USA"}
            imgSrc={"https://avatar.iran.liara.run/public"}
            active={true}
            activeIn={""}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex  flex-col ">
          <div
            ref={scrollableContainerRef}
            className="flex-grow h-[400px] overflow-y-auto bg-gray dark:bg-white/20 px-8"
          >
            <SenderText />
            <ReceiverText />
            <SenderText />
            <ReceiverText />
            <SenderText />
            <ReceiverText />
            <SenderText />
            <ReceiverText />
            <SenderText />
            <ReceiverText />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
