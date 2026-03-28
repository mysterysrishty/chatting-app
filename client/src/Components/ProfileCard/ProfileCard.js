import React from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const postCount = posts.filter(
    (post) => post.userId === user._id
  ).length;

  return (
    <div className="ProfileCard">

      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : "/defaultCover.jpg"
          }
          alt=""
          onError={(e) => (e.target.src = "/defaultCover.jpg")}
        />

        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : "/defaultProfile.png"
          }
          alt=""
          onError={(e) => (e.target.src = "/defaultProfile.png")}
        />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt || "Write about yourself..."}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>

          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{postCount}</span>
                <span>Posts</span>
              </div>
            </>
          )}

        </div>
        <hr />
      </div>

      {location !== "profilePage" && (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}

    </div>
  );
};

export default ProfileCard;
