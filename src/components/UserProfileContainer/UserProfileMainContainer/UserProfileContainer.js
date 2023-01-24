import React, { useState, useEffect } from "react";
import './UserProfileContainer.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { follow, unfollow } from "../../../Actions/Auth";
import UserProfilePostContainer from '../UserProfilePostContainer/UserProfilePostContainer';
import { useNavigate } from 'react-router-dom';

const UserProfileContainer = () => {
    const userprofile = useSelector((state) => state?.Auth?.userprofile);
    const profile = JSON.parse(localStorage.getItem("profile")).result._id;
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsFollow(userprofile?.user?.followers.includes(profile));
    }, [userprofile]);

    const handleFollow = async () => {
        if (isFollow) {
            dispatch(unfollow(userprofile?.user?._id));
        } else {
            dispatch(follow(userprofile?.user?._id));
        }
    }

    const handleProfile = () => {
        navigate('/profile')
    }

    return (
        <div className="userProfileMainBar">
            {!userprofile ? <h2 style={{ textAlign: "center" }}>no user found</h2> :
                <>
                    <div className="userProfileContainer-profile">

                        <img className="profileContainerProfilePic-profile" src={userprofile?.user?.profile ? userprofile.user.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
                        <h2 style={{ height: "20px", margin: "1px" }}>{userprofile?.user?.username}</h2>
                        <div className="userProfileStats">
                            <h4>Followers</h4>
                            <p>{userprofile?.user?.followers.length}</p>
                        </div>

                        <div className="userProfileStats">
                            <h4>Following</h4>
                            <p>{userprofile?.user?.following.length}</p>
                        </div>

                        <div className="userProfileStats">
                            <h4>Email</h4>
                            <p>{userprofile?.user?.email}</p>
                        </div>

                        <div className="userProfileStats">
                            <h4>number</h4>
                            <p>{userprofile?.user?.phonenumber}</p>
                        </div>

                        <div style={{ display: userprofile?.user?._id === profile && "none" }}>
                            <button className="userProfileFollowToggleBtn" onClick={handleFollow}>{isFollow ? "unfollow" : "follow"}</button>
                        </div>

                        <div style={{ display: userprofile?.user?._id !== profile && "none" }}>
                            <h5>this is your account</h5>
                            <button className="userProfileFollowToggleBtn" onClick={handleProfile}> Go to your profile</button>
                        </div>

                    </div>
                    <div>
                        {userprofile?.userPosts.length === 0 ?
                            <h2 style={{ textAlign: "center" }}>No posts available</h2> :
                            userprofile?.userPosts.map((post) => (
                                <UserProfilePostContainer key={Math.random()} post={post} />
                            ))
                        }
                    </div>
                </>}
        </div>);
};

export default UserProfileContainer;
