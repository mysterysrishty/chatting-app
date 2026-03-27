import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

const UserFollow = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(
    person?.followers?.includes(user?._id) || false
  );
  const [loading, setLoading] = useState(false);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (following) {
        await dispatch(unFollowUser(person._id, user));
      } else {
        await dispatch(followUser(person._id, user));
      }

      setFollowing((prev) => !prev);
    } catch (err) {
      console.error("Follow action failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="follower">
      <div className="follower-info">
        <img
          src={
            person?.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt={`${person.firstname}'s profile`}
          className="followerImg"
        />

        <div className="name">
          <span className="fullname">
            {person.firstname} {person.lastname}
          </span>
          <span className="username">
            @{person.firstname?.toLowerCase()}
          </span>
        </div>
      </div>

      <button
        className={`button fc-button ${following ? "unfollow" : ""}`}
        onClick={handleFollow}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : following
          ? "Unfollow"
          : "Follow"}
      </button>
    </div>
  );
};

export default UserFollow;


