import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../../components/Chat/Contact/Contact";
import NavBar from "../../components/NavBar/NavBar";
import './Chat.css';
import { useDispatch } from "react-redux";
import { followingDetails } from "../../Actions/Auth";

const Chat = () => {
    const profile = localStorage.getItem('profile');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!profile) {
            navigate('/login');
        } else {
            dispatch(followingDetails());
        }
    }, [profile, navigate, dispatch]);
    return (
        <div className="chat">
            {profile &&
                <>
                    <NavBar />
                    <Contact />
                </>
            }
        </div>);
};

export default Chat;
