import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatbox } from "../slices/chatBoxsSlice";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  console.log(chats)
  const [messages, setMessages] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [isFirstLoad ,setIsFirstLoad] = useState(true);

//   useEffect(() => {
//     dispatch(fetchChatbox());
//   }, [dispatch]);

  useEffect(() => {
    if (chats && !isFirstLoad ) {
        console.log(chats)
      setMessages(prevMessages => [...prevMessages, { text: chats, sender: "bot" }]);
    }
  }, [chats,isFirstLoad]);

  const handleSendMessage = async () => {
    if (userQuery.trim() !== "") {
      setMessages(prevMessages => [...prevMessages, { text: userQuery, sender: "user" }]);
      
      await dispatch(fetchChatbox(userQuery));
      setIsFirstLoad(false);
      setUserQuery("");
    }
  };
console.log(messages)
  return (
    <div>
      <div className={`z-50 bg-black text-white fixed bottom-6 right-24 p-4 shadow-lg rounded-lg w-[300px] h-[400px] flex flex-col border border-gray-300`}>
        <div className="flex border-b pb-2 mb-2 gap-2 items-center">
          <p className="font-semibold text-lg">Deelly</p>
        </div>

        <div 
          className="flex-1 overflow-y-auto mb-2 px-2 space-y-2" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex justify-center  ">
            {messages.length === 0 && <p>What can I help you with?</p> }
          </div>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`p-3 rounded-lg max-w-[80%] break-words shadow-md text-sm ${
                  message.sender === "user" 
                    ? "bg-gradient-to-r from-[#DB4444] to-[red] text-white rounded-bl-none" 
                    : `bg-gray-500 text-white rounded-br-none` 
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-auto border-t pt-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-2 text-gray-500 rounded-md text-sm focus:outline-none shadow-inner`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button 
            className="bg-[#DB4444]  px-4 py-2 rounded-md shadow-md  transition"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;