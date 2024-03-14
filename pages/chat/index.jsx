import MessageInput from "../../components/chat/MessageInput";
import ReceiverText from "../../components/chat/ReceiverText";
import SenderText from "../../components/chat/SenderText";

const Chat = () => {
  return (
    <div className="flex  flex-col bg-gray-100">
      <div className="flex-grow h-[400px] overflow-y-auto bg-gray dark:bg-white/20 px-4">
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
