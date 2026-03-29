import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData || {});
  const { posts = [], loading } = useSelector(
    (state) => state.postReducer || {}
  );

  // 🔄 Fetch posts safely
  useEffect(() => {
    if (user?._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user?._id]);

  // ❌ No user safety
  if (!user) {
    return (
      <div className="Posts-wrapper">
        <p className="statusText">Loading user...</p>
      </div>
    );
  }

  // 👤 Filter posts for profile page
  const filteredPosts = id
    ? posts.filter(
        (post) => String(post.userId) === String(id)
      )
    : posts;

  // 🔄 Latest first (safe)
  const sortedPosts = [...filteredPosts].reverse();

  return (
    <div className="Posts-wrapper">
      <div className="Posts">

        {/* ⏳ Loading */}
        {loading && (
          <p className="statusText">Loading posts...</p>
        )}

        {/* 📭 No posts */}
        {!loading && sortedPosts.length === 0 && (
          <p className="statusText">No posts yet 😔</p>
        )}

        {/* 📰 Posts */}
        {!loading &&
          sortedPosts.length > 0 &&
          sortedPosts.map((post) => (
            <Post data={post} key={post._id} />
          ))}

      </div>
    </div>
  );
};

export default Posts;