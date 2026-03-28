import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

const UserFollow = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // ✅ Sync following state with data
  useEffect(() => {
    setFollowing(person?.followers?.includes(user?._id) || false);
  }, [person, user]);

  // ❌ Safety check
  if (!user || !person) return null;

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

        {/* 👤 Profile Image */}
        <img
          src={serverPublic + (person.profilePicture || "defaultProfile.png")}
          alt={`${person.firstname}'s profile`}
          className="followerImg"
          onError={(e) => {
            e.target.src = serverPublic + "defaultProfile.png";
          }}
        />

        {/* 🧑 User Info */}
        <div className="name">
          <span className="fullname">
            {person.firstname} {person.lastname}
          </span>
          <span className="username">
            @{person.firstname?.toLowerCase() || "user"}
          </span>
        </div>

      </div>

      {/* 🔘 Follow Button */}
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