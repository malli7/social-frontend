import React, { useEffect } from "react";
import './Profile.css'
import NavBar from '../../components/NavBar/NavBar';
import { useDispatch } from "react-redux";
import { getMyPosts } from "../../Actions/Posts";
import { followersDetails, followingDetails } from "../../Actions/Auth";
import ProfileLeft from "../../components/Profile/ProfileLeft/ProfileLeft";
import ProfileMain from "../../components/Profile/ProfileMain/ProfileMain";
import ProfileRight from "../../components/Profile/ProfileRight/ProfileRight";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = localStorage.getItem('profile');

    useEffect(() => {
        if (!profile) {
            navigate('/login');
        } else {
            dispatch(getMyPosts());
            dispatch(followingDetails());
            dispatch(followersDetails());
        }
    }, [profile, navigate, dispatch]);

    return (
        <div className="home">
            {profile &&
                <>
                    <NavBar />
                    <div className="subHome">

                        <div className="componentContainer">
                            <ProfileLeft />
                            <ProfileMain />
                            <ProfileRight />
                        </div>

                        <div className="componentContainer2">
                            <ProfileLeft />
                            <ProfileRight />
                            <ProfileMain />
                        </div>

                    </div>
                </>
            }
        </div>);
};

export default Profile;
