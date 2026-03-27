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

  const [liked, setLiked] = useState(
    data?.likes?.includes(user?._id)
  );
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);

    liked
      ? setLikes((prev) => prev - 1)
      : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">

      {/* 🔹 TOP SECTION (PROFILE + NAME) */}
      <div className="postTop">
        <div className="postTopLeft">
          <img
            src={serverPublic + "defaultProfile.png"}
            alt=""
            className="postProfileImg"
          />
          <span className="postUsername">{data?.name}</span>
        </div>
      </div>

      {/* 🔹 IMAGE */}
      {data?.image && (
        <img
          src={serverPublic + data.image}
          alt="post"
          className="postImg"
          onError={(e) => {
            e.target.src = serverPublic + "defaultPost.jpg";
          }}
        />
      )}

      {/* 🔹 ACTIONS */}
      <div className="postActions">
        <img
          src={liked ? Like : Notlike}
          alt="like"
          onClick={handleLike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>

      {/* 🔹 LIKES */}
      <span className="likes">{likes} likes</span>

      {/* 🔹 CAPTION */}
      <div className="caption">
        <b>{data?.name}</b> {data?.desc}
      </div>

    </div>
  );
};

export default Post;