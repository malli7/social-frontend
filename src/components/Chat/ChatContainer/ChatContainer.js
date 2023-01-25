import React, { useEffect, useRef, useState } from "react";
import './ChatContainer.css';
import { MdSend } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from "../../../Actions/Posts";
import io from "socket.io-client";

const ChatContainer = ({ currentChatUser }) => {
    const id = JSON.parse(localStorage.getItem('profile'))?.result?._id;
    let chat = useSelector((state) => state?.Posts?.mychat);
    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const dispatch = useDispatch();
    const ref = useRef();
    const socket = useRef();

    useEffect(() => {
        setChats(chat)
    }, [chat]);

    useEffect(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" })
    }, [chats]);

    useEffect(() => {
        if (currentChatUser) {
            socket.current = io("https://social-backend-qox9.onrender.com");
            socket.current.emit("addUser", id);

        }
    }, [currentChatUser, id]);


    const handleSendMessage = () => {
        const data = {
            from: id,
            to: currentChatUser._id,
            message: newMessage
        }
        socket.current.emit("send-msg", data);
        dispatch(sendMessage(data))
        setChats([...chats, { myself: true, message: newMessage }])
        setNewMessage("")
    }

    useEffect(() => {
        if (socket?.current) {
            socket.current.on("msg-recieve", (msg) => {
                setChats([...chats, { myself: false, message: msg }])
            })
        }
    }, [chats]);


    return (
        <div className="mainChatContainer">
            <div className="chatDetailBar">
                <img src={currentChatUser.profile ? currentChatUser.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="contact" className="contactImageChat" />
                <h4>{currentChatUser.username}</h4>
            </div>
            <div className="chatDisplayContainer">
                {chats?.map((chatItem) => (
                    <div key={Math.random()} ref={ref}>
                        {chatItem.myself ?
                            <p className="messageMe">{chatItem.message}</p> :
                            <p className="messageOther">{chatItem.message}</p>
                        }
                    </div>
                ))}

            </div>
            <div className="chatMessageContainer">
                <input type="text" placeholder="enter your message" className="messageInputField" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
                {newMessage.length > 0 && currentChatUser.username && <button type="button" className="messageSendButton" onClick={handleSendMessage}><MdSend size={20} color="white" /></button>}
            </div>
        </div>);
};

export default ChatContainer;
