
import React, { useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked
      ? setLikes((prev) => prev - 1)
      : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">

      {/* 🔥 FIXED IMAGE */}
      <img
        src={
          data.image
            ? `https://your-backend-url/uploads/${data.image}`
            : "/defaultPost.png"
        }
        alt=""
        className="postImg"
        onError={(e) => (e.target.src = "/defaultPost.png")}
      />

      <div className="postReact">
        <img
          src={liked ? Like : Notlike}
          alt=""
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span className="likes">{likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span>{data.desc}</span>
      </div>

    </div>
  );
};

export default Post;
