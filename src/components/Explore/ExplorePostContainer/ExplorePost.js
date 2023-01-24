import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { follow } from "../../../Actions/Auth";
import { commentPost, likePost } from "../../../Actions/Posts"; import "./ExplorePost.css";
import { useNavigate } from "react-router-dom";

const ExplorePost = ({ post }) => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const profile = JSON.parse(localStorage.getItem("profile")).result;
    const dispatch = useDispatch();
    const navigate = useNavigate()


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

    const handleExploreFollow = () => {
        dispatch(follow(post.user));
    }

    const handleViewProfile = () => {
        navigate(`/profile/${post.user}`)
    }

    return (
        <div className="exploreContentBar">
            <div className="explorePostContainer">
                <div className="explorePostHeader">
                    <div className="explorePostSubHeader" onClick={handleViewProfile}>
                        <img className="exploreProfilePicForPost" src={post.userpic ? post.userpic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" />
                        <h5 className="exploreName">{post.username}</h5>
                    </div>
                    <button type="button" className="exploreFollowBtn" onClick={handleExploreFollow}><MdOutlinePersonAddAlt size={20} /></button>
                </div>
                <div>
                    {post.image && <img className="postedPic" src={post.image} alt="post pic" />}
                    {post.video && <video className="postedPic" controls loop src={post.video} />}
                </div>
                <div className="explorePostActions">

                    <div className="explorePostSubActions">
                        {like
                            ? <FaHeart color="red" size={20} style={{ margin: "5px" }} onClick={handleDisLike} />
                            : <FaRegHeart size={20} style={{ margin: "5px" }} onClick={handleLike} />
                        }
                        {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
                    </div>

                    <div className="explorePostSubActions" onClick={handleShowComments}>
                        <FaRegComment size={20} style={{ margin: "5px" }} /> {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                    </div>

                    <div className="explorePostSubActions">
                        <IoPaperPlaneOutline size={20} style={{ margin: "5px", marginRight: "20px" }} />
                    </div>

                </div>

                <div style={{ marginLeft: "15px" }} className="explorePostSubActions">
                    <p> <b> {post.username} &nbsp;</b>  {post.title}  </p>
                </div>

                <div className="explorePostSubActions">
                    <input className="exploreInputFieldForComment" type="text" placeholder="Add a Comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button type="button" className="exploreCommentBtn" hidden={newComment.length > 0 ? false : true} onClick={addComment}>post</button>
                </div>

                <div style={{ display: showComments ? "block" : "none" }}>
                    {
                        comments.map(
                            (comment) =>
                                <div style={{ marginLeft: "5px" }} className="explorePostSubActions" key={Math.random()}>
                                    <p> <b>{comment.username} &nbsp;</b> {comment.comment}</p>
                                </div>
                        )
                    }
                </div>

            </div>
        </div>);
};

export default ExplorePost;
