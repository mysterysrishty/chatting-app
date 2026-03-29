import React, { useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const publicFolder =
    serverPublic ||
    "https://srishty-social-backend.onrender.com/public/images/";

  // ✅ HOOKS MUST BE FIRST (ALWAYS)
  const [liked, setLiked] = useState(
    data?.likes?.includes(user?._id)
  );
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  // ✅ AFTER hooks → safe return
  if (!user || !data) return null;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="Post">

      <div className="postTop">
        <div className="postTopLeft">
          <img
            src={
              data.userProfilePicture
                ? publicFolder + data.userProfilePicture
                : publicFolder + "defaultProfile.png"
            }
            alt="profile"
            className="postProfileImg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = publicFolder + "defaultProfile.png";
            }}
          />
          <span>{data.name}</span>
        </div>
      </div>

      {data.image && (
        <img
          src={publicFolder + data.image}
          alt="post"
          className="postImg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="postActions">
        <img
          src={
            liked
              ? publicFolder + "like.png"
              : publicFolder + "notlike.png"
          }
          alt="like"
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        />
      </div>

      <span>{likes} likes</span>

      <div>
        <b>{data.name}</b> {data.desc}
      </div>

    </div>
  );
};

export default Post;