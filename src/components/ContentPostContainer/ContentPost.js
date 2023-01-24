import React, { useState } from "react";
import './ContentPost.css'
import { MdOutlineImage, MdMovieCreation, MdClear } from 'react-icons/md';
import { BallTriangle } from 'react-loading-icons';
import { useDispatch } from "react-redux";
import { createPost } from "../../Actions/Posts";

const ContentPost = () => {
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile"))?.result;


  const handleChange = async (e) => {
    setLoading(true);
    let a = e.target.files[0];
    if (a) {
      const data = new FormData()
      data.append("file", a)
      data.append("upload_preset", "social")
      data.append("cloud_name", "naasocialcloud")
      data.append("file", a)
      const response = await fetch('https://api.cloudinary.com/v1_1/naasocialcloud/image/upload', {
        method: 'POST',
        body: data
      });
      setLoading(false);
      const json = await response.json();
      await setPhoto(json.url)
    }
  }

  const handleChange2 = async (e) => {
    setLoading(true);
    let a = e.target.files[0];
    if (a) {
      const data = new FormData()
      data.append("file", a)
      data.append("upload_preset", "social")
      data.append("cloud_name", "naasocialcloud")
      data.append("file", a)
      const response = await fetch('https://api.cloudinary.com/v1_1/naasocialcloud/video/upload', {
        method: 'POST',
        body: data
      });
      setLoading(false);
      const json = await response.json();
      console.log(json.url);

      await setVideo(json.url)
    }
  }

  const handlePost = () => {
    if (photo) {
      dispatch(createPost({ title, image: photo }));
    } else {
      dispatch(createPost({ title, video }));
    }
  }

  const handleClear = () => {
    window.location.reload()
  }

  return (
    <div className="contentBar-contentPost">

      <div className="uploadContainer-contentPost">

        <div className="inputContainer-contentPost">
          <img style={{ marginLeft: "10px" }} className="profilePic-contentPost" src={profile.profile ? profile.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
          <input className="inputfield-contentPost" type="text" placeholder="Enter your thoughts" name="title" onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <input className="postEditPic" id="file-selector" type="file" name="profile" accept="image/*" style={{ display: "none" }} onChange={handleChange} />
        <input className="postEditPic" id="file-selector2" type="file" name="profile" accept="video/*" style={{ display: "none" }} onChange={handleChange2} />
        <img style={{ marginLeft: "10px", width: "200px", height: "200px", display: photo ? "block" : "none" }} src={photo} alt="profile" required />
        <video style={{ marginLeft: "10px", width: "200px", height: "200px", display: video ? "block" : "none" }} controls src={video} />
        {loading && <BallTriangle stroke="#000" />}

        <div className="iconsContainer-contentPost">

          <div style={{ display: "flex" }}>
            {!(photo || video) &&
              <>
                <label htmlFor="file-selector">
                  <MdOutlineImage size={30} className="icon-contentPost" />
                </label>
                <label htmlFor="file-selector2">
                  <MdMovieCreation size={30} className="icon-contentPost" />
                </label>
              </>
            }
            {(photo || video) && <MdClear size={30} className="icon-contentPost" onClick={handleClear} />}
          </div>
          {!loading && title && (video || photo) &&
            <button type="button" className="postBtn-contentPost" onClick={handlePost}>post</button>
          }
        </div>

      </div>

    </div>);
};

export default ContentPost;
