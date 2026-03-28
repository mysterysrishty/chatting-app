import React, { useState } from 'react';
import './Post.css';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // ✅ Hooks must be at top (NO conditions before this)
  const [liked, setLiked] = useState(
    data?.likes?.includes(user?._id)
  );
  const [likes, setLikes] = useState(data?.likes?.length || 0);

  // ✅ AFTER hooks → safe condition
  if (!user || !data) return null;

  const handleLike = () => {
    setLiked((prev) => !prev);

    likePost(data._id, user._id);

    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <div className="Post">

      <div className="postTop">
        <div className="postTopLeft">
          <img
            src={serverPublic + (data.userProfilePicture || "defaultProfile.png")}
            alt=""
            className="postProfileImg"
          />
          <span>{data?.name}</span>
        </div>
      </div>

      {data?.image && (
        <img
          src={serverPublic + data.image}
          alt=""
          className="postImg"
        />
      )}

      <div className="postActions">
        <img
          src={
            liked
              ? serverPublic + "like.png"
              : serverPublic + "notlike.png"
          }
          alt=""
          onClick={handleLike}
        />
      </div>

      <span>{likes} likes</span>

      <div>
        <b>{data?.name}</b> {data?.desc}
      </div>

    </div>
  );
};

export default Post;