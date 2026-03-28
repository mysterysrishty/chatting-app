import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts = [], loading } = useSelector((state) => state.postReducer);

  // 🔄 Fetch posts
  useEffect(() => {
    if (user?._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user?._id]);

  // ❌ Safety: if no user
  if (!user) return null;

  // 👤 Filter posts for profile page
  const filteredPosts = params.id
    ? posts.filter((post) => post.userId?.toString() === params.id?.toString())
    : posts;

  return (
    <div className="Posts-wrapper">
      <div className="Posts">

        {loading ? (
          <p className="statusText">Loading posts...</p>

        ) : filteredPosts.length > 0 ? (
          filteredPosts
            .slice()   // copy array
            .reverse() // latest first
            .map((post) => (
              <Post data={post} key={post._id} />
            ))

        ) : (
          <p className="statusText">No posts yet 😔</p>
        )}

      </div>
    </div>
  );
};

export default Posts;