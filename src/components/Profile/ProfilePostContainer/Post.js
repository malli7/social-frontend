import React, { useState, useEffect } from "react";
import './Post.css'
import { MdDelete, MdMode } from 'react-icons/md';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { commentPost, deletePost, likePost, updatePostFromProfile } from "../../../Actions/Posts";
import { useDispatch } from "react-redux";

const Post = ({ post }) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ title: '', image: '' });
    const [photo, setPhoto] = useState("");
    const [showComments, setShowComments] = useState(false);
    const profile = JSON.parse(localStorage.getItem("profile")).result;

    useEffect(() => {
        setComments(post.comments)
        setLikeCount(post.likes.length)
        setLike(post.likes.includes(profile._id));
    }, []);

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }

    const handleEdit = () => {
        setIsUpdate(!isUpdate);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
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
            if (formData.title) {
                dispatch(updatePostFromProfile(post._id, { title: formData.title, image: json.url }))
            }
            else {
                dispatch(updatePostFromProfile(post._id, { image: json.url }))
            }
        }
        else {
            dispatch(updatePostFromProfile(post._id, { title: formData.title }))
        }
    }

    const handleLike = () => {
        dispatch(likePost(post._id));
        setLike(true)
        setLikeCount(likeCount + 1)
    }
    const handleDisLike = () => {
        dispatch(likePost(post._id));
        setLike(false)
        setLikeCount(likeCount - 1)
    }

    const addComment = () => {
        const a = {
            username: profile.username,
            comment: newComment
        }
        dispatch(commentPost(post._id, a))
        setComments([...comments, a])
        setNewComment('')
    }

    const toggleComments = () => {
        setShowComments(!showComments)
    }

    return (
        <div className="contentBar">

            <div className="postContainer">
                {!isUpdate ? <>
                    <div className="postHeader">

                        <div className="postSubHeader">
                            <img className="profilePicForPost" src={post.userpic ? post.userpic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
                            <h5 className="name">{post.username}</h5>
                        </div>

                        <div>
                            <MdMode size={25} style={{ marginRight: "10px" }} onClick={handleEdit} />
                            <MdDelete size={25} style={{ marginRight: "10px" }} onClick={handleDelete} />
                        </div>

                    </div>

                    <div>
                        {post.image && <img className="postedPic" src={post.image} alt="post pic" />}
                        {post.video && <video className="postedPic" controls loop src={post.video} />}
                    </div>

                    <div className="postActions">

                        <div className="postSubActions">
                            {like
                                ? <FaHeart color="red" size={20} style={{ margin: "5px" }} onClick={handleDisLike} />
                                : <FaRegHeart size={20} style={{ margin: "5px" }} onClick={handleLike} />
                            }
                            {likeCount} {likeCount > 1 ? 'Likes' : 'Like'}
                        </div>

                        <div className="postSubActions" onClick={toggleComments} >
                            <FaRegComment size={20} style={{ margin: "5px" }} /> {comments.length} Comments
                        </div>

                    </div>

                    <div style={{ marginLeft: "5px" }} className="postSubActions">
                        <p> <b> {post.username} &nbsp;</b>  {post.title}  </p>
                    </div>

                    <div className="postSubActions">
                        <input className="inputFieldForComment" type="text" placeholder="Add a Comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        <button type="button" className="commentBtn" hidden={newComment.length > 0 ? false : true} onClick={addComment}>post</button>
                    </div>

                    {showComments &&
                        comments.map((comment) =>
                            <div style={{ marginLeft: "5px" }} className="postSubActions" key={comment._id || Math.random()}>
                                <p> <b> {comment.username} &nbsp;</b> {comment.comment}</p>
                            </div>
                        )
                    }
                </> :
                    <div className="postEditContainer">
                        <input className="postEditPic" type="file" name="profile" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} /><br />
                        <input className="postEditPic" type="text" name="title" placeholder="enter title" onChange={handleChange} /><br />
                        <button className="postEditBtn" onClick={handleSubmit}>Save Post</button>
                    </div>
                }
            </div>

        </div>);
};

export default Post;
