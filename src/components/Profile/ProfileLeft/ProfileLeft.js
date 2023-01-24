import React, { useState } from "react";
import './ProfileLeft.css';
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../Actions/Auth";
import { updatePost } from "../../../Actions/Posts";

const ProfileLeft = () => {
    const profile = JSON.parse(localStorage.getItem('profile')).result;
    const [formData, setFormData] = useState({ username: '', profile: '', phonenumber: '', bio: '' });
    const [edit, setEdit] = useState(false);
    const [photo, setPhoto] = useState("");
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.Posts.posts);
    let followersdetails = useSelector((state) => state.Auth.followersdetails);

    const handleEditBtn = () => {
        setEdit(!edit)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (photo) {
            const data = new FormData()
            data.append("file", photo)
            data.append("upload_preset", "social")
            data.append("cloud_name", "naasocialcloud")
            data.append("file", photo)
            const response = await fetch('https://api.cloudinary.com/v1_1/naasocialcloud/image/upload', {
                method: 'POST',
                body: data
            });
            const json = await response.json();
            await setFormData({ ...formData, profile: json.url });
            if (formData.username) {
                console.log(json.url);
                await posts.map((post) => (
                    dispatch(updatePost(post._id, { username: formData.username, userpic: json.url }))
                ))
            }
            else {
                console.log(json.url);
                await posts.map(async (post) => (
                    await dispatch(updatePost(post._id, { userpic: json.url }))
                ))
            }
            await dispatch(updateProfile({ ...formData, profile: json.url }));
        }
        else {
            if (formData.username) {
                posts.map((post) => (
                    <div key={post._id}>
                        {dispatch(updatePost(post._id, { username: formData.username }))}
                    </div>
                ))
            }
            dispatch(updateProfile(formData));
        }


    }
    return (
        <div className="profileLeftBar">

            <div className="profileContainer-profile">
                {edit ? <>
                    <input className="inputFieldsClass" type="file" name="profile" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} /><br />
                    <input className="inputFieldsClass" type="text" name="username" placeholder="enter username" onChange={handleChange} /><br />
                    <input className="inputFieldsClass" type="number" name="phonenumber" placeholder="enter phonenumber" onChange={handleChange} /><br />
                    <input className="inputFieldsClass" type="text" name="bio" placeholder="enter bio" onChange={handleChange} /><br />
                    <button className="profileEditBtn" onClick={handleSubmit}>Save Profile</button>
                </> : <>
                    <img className="profileContainerProfilePic" src={profile.profile} alt="profile" />
                    <h2 style={{ height: "20px", margin: "1px" }}>{profile.username}</h2>
                    <div className="userProfileStats">
                        <h4>Followers</h4>
                        <p>{profile.followers.length}</p>
                    </div>

                    <div className="userProfileStats">
                        <h4>Following</h4>
                        <p>{profile.following.length}</p>
                    </div>

                    <div className="userProfileStats">
                        <h4>Email</h4>
                        <p>{profile.email}</p>
                    </div>

                    <div className="userProfileStats">
                        <h4>number</h4>
                        <p>{profile.phonenumber}</p>
                    </div>

                    <p>{profile.bio}</p>
                    <button className="profileEditBtn" onClick={handleEditBtn}>Edit Profile</button>
                </>
                }
            </div>

            <div className="profileContainer-profile">

                <div className="friend">
                    <p style={{ color: "#aaa" }}><b>Followers</b></p>
                </div>

                {followersdetails?.length === 0 ? "You have no followers" :
                    followersdetails?.map((item) => (
                        <div className="request" key={Math.random()}>
                            <img style={{ marginLeft: "10px" }} className="friendRequestPic" src={item.profile ? item.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
                            <p style={{ marginRight: "10px" }} className="adData"><b>{item.username} </b></p>
                        </div>
                    ))}
            </div>

        </div>);
};

export default ProfileLeft;
