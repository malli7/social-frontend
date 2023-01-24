import React from "react";
import ContentPost from "../../ContentPostContainer/ContentPost";
import './ProfileMain.css';
import { useSelector } from "react-redux";
import Post from "../ProfilePostContainer/Post";

const ProfileMain = () => {
    const posts = useSelector((state) => state.Posts.posts);

    return (
        <div className="mainProfileBar">
            <ContentPost />
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>);
};

export default ProfileMain;
