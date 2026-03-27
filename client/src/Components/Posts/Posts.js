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
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  const filteredPosts = params.id
    ? posts.filter((post) => post.userId === params.id)
    : posts;

  return (
    <div className="Posts-wrapper">
      <div className="Posts">

        {loading ? (
          <p>Fetching Posts...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post data={post} key={post._id} />
          ))
        ) : (
          <p>No posts yet</p>
        )}

      </div>
    </div>
  );
};

export default Posts;
