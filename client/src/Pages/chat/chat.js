import React, { useEffect, useState, useRef } from "react";
import socket from "../../socket";
import "./Chat.css";
import Message from "../../components/Message/Message";
import { getUserChats } from "../../api/ChatRequest";
import { getMessages, addMessage } from "../../api/MessageRequest";
import { useSelector } from "react-redux";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();

  // 🔥 Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getUserChats(user._id);
      setChats(data);
    };

    fetchChats();
  }, [user]);

  // 🔥 Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        const { data } = await getMessages(currentChat._id);
        setMessages(data);
      }
    };

    fetchMessages();
  }, [currentChat]);

  // 🔥 Socket receive
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  // 🔥 Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message = {
      chatId: currentChat._id,
      senderId: user._id,
      text: newMessage,
    };

    // save in DB
    const { data } = await addMessage(message);

    // send via socket
    socket.emit("sendMessage", {
      ...message,
      receiverId: currentChat.members.find((id) => id !== user._id),
    });

    setMessages((prev) => [...prev, data]);
    setNewMessage("");
  };

  // 🔽 Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
  if (user?._id) {
    socket.emit("addUser", user._id);
  }
}, [user]);

  return (
    <div className="Chat">

      {/* LEFT: CHAT LIST */}
      <div className="chatMenu">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setCurrentChat(chat)}
            className="chatItem"
          >
            Chat with {chat.members.find((id) => id !== user._id)}
          </div>
        ))}
      </div>

      {/* RIGHT: CHAT BOX */}
      <div className="chatBox">
        {currentChat ? (
          <>
            <div className="chatMessages">
              {messages.map((msg) => (
                <div ref={scrollRef} key={msg._id}>
                  <Message
                    message={msg}
                    own={msg.senderId === user._id}
                  />
                </div>
              ))}
            </div>

            <div className="chatInput">
              <input
                type="text"
                placeholder="Write message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <span>Select a chat to start messaging</span>
        )}
      </div>
    </div>
  );
};

export default Chat;