import React, { useEffect } from "react";
import { userProfile, userProfileByUserName } from "../../Actions/Auth";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './UserProfile.css';
import UserProfileContainer from "../../components/UserProfileContainer/UserProfileMainContainer/UserProfileContainer";

const UserProfile = () => {
    const a = window.location.pathname.split("/")[2];
    const b = window.location.pathname.split("/")[1];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = localStorage.getItem('profile');

    useEffect(() => {
        if (!profile) {
            navigate('/login');
        } else {
            if (b === "profile") {
                dispatch(userProfile(a));
            } else {
                dispatch(userProfileByUserName(a))
            }
        }
    }, [profile, navigate, dispatch]);
    return (
        <div className="profileHome">
            {profile &&
                <>
                    <NavBar />
                    <div className="profileSubHome">

                        <div className="profileComponentContainer">
                            <UserProfileContainer />
                        </div>
                    </div>
                </>
            }
        </div>);
};

export default UserProfile;
