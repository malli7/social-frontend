import React, { useEffect } from "react";
import MainContainer from "../../components/Main/MainContainer/MainContainer";
import NavBar from "../../components/NavBar/NavBar";
import './Home.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { followingPosts } from "../../Actions/Auth";

const Home = () => {
  const profile = localStorage.getItem('profile');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
    else {
      dispatch(followingPosts());
    }
  }, [profile, navigate, dispatch]);

  return (
    <div className="home">
      {profile &&
        <>
          <NavBar />
          <div className="subHome">
            <MainContainer />
          </div>
        </>
      }
    </div>);
};

export default Home;
