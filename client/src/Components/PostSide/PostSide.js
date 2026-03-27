import React from 'react';
import './PostSide.css';
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';

const PostSide = () => {
  return (
    <div className="PostSide-wrapper">
      <div className="PostSide">
        <PostShare />
        <Posts />
      </div>
    </div>
  );
};

export default PostSide;
