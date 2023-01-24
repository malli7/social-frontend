import React, { useState } from "react";
import './NavBar.css';
import { MdOutlineSearch, MdLogout, MdExplore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const profile = JSON.parse(localStorage.getItem("profile"))?.result;
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");


  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const handleExplore = () => {
    navigate('/explore')
  }

  const handleSearch = () => {
    navigate(`/profilebyusername/${searchItem}`)
    setSearchItem("")
  }

  return (
    <div className="navContainer">

      <div className="titleContainer">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}><h2> Social </h2></Link>
      </div>

      <div>

        <div className="searchInputContainer">

          <input placeholder="search here" className="searchInput" type="text" onChange={(e) => setSearchItem(e.target.value)} />
          <div onClick={handleSearch}>
            <MdOutlineSearch size={30} />
          </div>

        </div>

      </div>

      <div className="profileContainer">
        <MdExplore style={{ marginLeft: "20px", cursor: "pointer" }} size={20} onClick={handleExplore} />

        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>

          <div className="profileContainer2">
            <img style={{ marginLeft: "20px" }} className="profilePic" src={profile.profile ? profile.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
            <h4 style={{ marginLeft: "20px", marginRight: "20px", cursor: "pointer" }}>{profile.username}</h4>
          </div>
        </Link>
        <MdLogout style={{ marginLeft: "10px", cursor: "pointer" }} size={20} onClick={logout} />
      </div>

    </div>);
};

export default NavBar;
