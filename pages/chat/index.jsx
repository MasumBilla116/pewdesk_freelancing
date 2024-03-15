import MessageInput from "../../components/chat/MessageInput";
import ReceiverText from "../../components/chat/ReceiverText";
import SenderText from "../../components/chat/SenderText";
import { useEffect, useRef } from "react";

const Chat = () => {
  const scrollableContainerRef = useRef(null);
  const scrollTopToBottom = () => {
    if (scrollableContainerRef.current) {
      const { current: scrollableContainer } = scrollableContainerRef;
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollTopToBottom();
  }, []);

  return (
    <div className="flex  flex-col bg-gray-100">
      <div
        ref={scrollableContainerRef}
        className="flex-grow h-[400px] overflow-y-auto bg-gray dark:bg-white/20 px-4"
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
  );
};

export default Chat;
