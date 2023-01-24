import React from "react";
import ContentPost from "../../ContentPostContainer/ContentPost";
import Post from "../PostContainer/Post";
import './MainContainer.css';
import { useSelector } from "react-redux";

const MainContainer = () => {
  let followingposts = useSelector((state) => state.Auth.followingposts);

  return (
    <div className="mainBar">
      <ContentPost />
      {followingposts?.length > 0 ?
        followingposts?.map((post) => (
          <Post key={Math.random()} post={post} />
        ))

        : <h2 style={{ marginTop: "40px", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          Follow someone to view their posts
        </h2>
      }

    </div>);
};

export default MainContainer;
