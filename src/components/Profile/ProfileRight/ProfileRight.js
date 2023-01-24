import React from "react";
import './ProfileRight.css';
import ProfileSuggestions from "./ProfileSuggestions";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { suggestions } from "../../../Actions/Auth";
import { useSelector } from "react-redux";
import FollowingUser from "./FollowingUser";

const ProfileRight = () => {
    const dispatch = useDispatch();
    let suggestion = useSelector((state) => state.Auth.suggestions);
    let followingdetails = useSelector((state) => state.Auth.followingdetails);

    useEffect(() => {
        dispatch(suggestions())
    }, [dispatch]);



    return (
        <div className="profileRightBar">

            <div className="friendRequestsContainer">

                <div className="suggestionTitle">
                    <p style={{ color: "#aaa" }}><b>Following</b></p>
                </div>

                {followingdetails?.length === 0 ? "You are not following anyone" :
                    followingdetails?.map((item) => (
                        <FollowingUser key={Math.random()} item={item} />))
                }

            </div>

            <div className="profileRightContainer">

                <div className="suggestionTitle">
                    <p style={{ color: "#aaa" }}><b>Suggestions for you</b></p>
                </div>

                <div>
                    {suggestion?.length === 0 && "No Suggestions for you"}
                    {suggestion &&
                        suggestion.map((suggest) => (
                            <ProfileSuggestions key={suggest._id} suggest={suggest} />
                        ))}
                </div>

            </div>

        </div>);
};

export default ProfileRight;
