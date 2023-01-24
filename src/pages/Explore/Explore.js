import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import './Explore.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { explorePosts } from "../../Actions/Auth";
import ExploreContainer from "../../components/Explore/ExploreContainer/ExploreContainer";

const Explore = () => {
    const profile = localStorage.getItem('profile');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!profile) {
            navigate('/login');
        }
        else {
            dispatch(explorePosts());
        }
    }, [profile, navigate, dispatch]);

    return (
        <div className="explore">
            {profile &&
                <>
                    <NavBar />
                <div className="subExplore">
                    <ExploreContainer />
                    </div>
                </>
            }
        </div>);
};

export default Explore;
