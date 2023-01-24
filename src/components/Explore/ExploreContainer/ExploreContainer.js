import React from "react";
import './ExploreContainer.css';
import { useSelector } from "react-redux";
import ExplorePost from "../ExplorePostContainer/ExplorePost";

const ExploreContainer = () => {
    let exploreposts = useSelector((state) => state.Auth.exploreposts);

    return (
        <div className="exploreBar">
            {exploreposts?.length > 0 &&
                exploreposts?.map((post) => (
                    <ExplorePost key={Math.random()} post={post} />
                ))
            }
        </div>);
};

export default ExploreContainer;
