import React, { useState } from 'react';
import './Post.css';
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

      {/* 🔹 TOP */}
      <div className="postTop">
        <div className="postTopLeft">
          <img
            src="/defaultProfile.png"  // ✅ FIXED
            alt=""
            className="postProfileImg"
          />
          <span className="postUsername">{data?.name}</span>
        </div>
      </div>

      {/* 🔹 POST IMAGE */}
      {data?.image && (
        <img
          src={serverPublic + data.image}
          alt="post"
          className="postImg"
          onError={(e) => {
            e.target.src = "/defaultPost.jpg"; // ✅ FIXED
          }}
        />
      )}

      {/* 🔹 ACTIONS */}
      <div className="postActions">
        <img
          src={liked ? "/like.png" : "/notlike.png"} // ✅ FIXED
          alt="like"
          onClick={handleLike}
        />
        <img src="/comment.png" alt="comment" />   {/* ✅ FIXED */}
        <img src="/share.png" alt="share" />       {/* ✅ FIXED */}
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