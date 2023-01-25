import React, { useState } from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import './Contact.css';
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from "../../../Actions/Posts";

const Contact = () => {
    let followingdetails = useSelector((state) => state?.Auth?.followingdetails);
    const myid = JSON.parse(localStorage.getItem('profile'))?.result?._id;

    const [currentChatUser, setCurrentChatUser] = useState('');
    const dispatch = useDispatch();


    const handleClick = (item) => {
        setCurrentChatUser(item);
        dispatch(getChat(myid, item._id));
    }

    return (
        <div className="mainContactContainer">
            <div className="subContactContainer">
                <h3 className="contactInputField">Your Friends</h3>
                {followingdetails?.map((item) => (
                    <div className="contactViewContainer" key={Math.random()} onClick={() => handleClick(item)}>
                        <img src={item.profile ? item.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="contact" className="contactImage" />
                        <p><b>{item.username}</b><br />view chat</p>
                    </div>
                ))}

            </div>
            <div className="viewChatContainer">
                <ChatContainer currentChatUser={currentChatUser} />
            </div>
        </div>);
};

export default Contact;
