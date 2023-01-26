import React, { useState, useEffect } from "react";
import "./UserProfilePostContainer.css";
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { commentPost, likePost } from "../../../Actions/Posts";

const UserProfilePostContainer = ({ post }) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const profile = JSON.parse(localStorage.getItem("profile")).result;
    const dispatch = useDispatch();

    useEffect(() => {
        setComments(post.comments)
        setLikeCount(post.likes.length)
        setLike(post.likes.includes(profile._id));
    }, []);


    const handleShowComments = () => {
        setShowComments(!showComments)
    }

    const handleLike = () => {
        setLike(true)
        setLikeCount(likeCount + 1)
        dispatch(likePost(post._id));
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
    return (
        <div className="contentBar-userProfile">

            <div className="postContainer-userProfile">

                <div className="postHeader-userProfile">

                    <div className="postSubHeader-userProfile">
                        <img className="profilePicForPost-userProfile" src={post.userpic ? post.userpic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
                        <h5 className="name-userProfile">{post.username}</h5>
                    </div>

                </div>

                <div>
                    {post.image && <img className="postedPic-userProfile" src={post.image} alt="post pic" />}
                    {post.video && <video className="postedPic-userProfile" controls loop src={post.video} />}
                </div>

                <div className="postActions-userProfile">

                    <div className="postSubActions-userProfile">
                        {like
                            ? <FaHeart color="red" size={20} style={{ margin: "5px" }} onClick={handleDisLike} />
                            : <FaRegHeart size={20} style={{ margin: "5px" }} onClick={handleLike} />
                        }
                        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                    </div>

                    <div className="postSubActions-userProfile" onClick={handleShowComments}>
                        <FaRegComment size={20} style={{ margin: "5px" }} /> {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </div>

                </div>

                <div style={{ marginLeft: "15px" }} className="postSubActions-userProfile">
                    <p> <b> {post.username} &nbsp;</b>  {post.title}  </p>
                </div>

                <div className="postSubActions-userProfile">
                    <input className="inputFieldForComment-userProfile" type="text" placeholder="Add a Comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button type="button" className="commentBtn-userProfile" hidden={newComment.length > 0 ? false : true} onClick={addComment}>post</button>
                </div>

                <div style={{ display: showComments ? "block" : "none" }}>
                    {
                        comments.map(
                            (comment) =>
                                <div style={{ marginLeft: "5px" }} className="postSubActions-userProfile" key={Math.random()}>
                                    <p> <b>{comment.username} &nbsp;</b> {comment.comment}</p>
                                </div>
                        )
                    }
                </div>

            </div>

        </div>);
};

export default UserProfilePostContainer;
