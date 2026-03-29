import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // fallback safety if env is missing
  const publicFolder =
    serverPublic ||
    "https://srishty-social-backend.onrender.com/public/images/";

  const postCount = posts.filter(
    (post) => post.userId === user._id
  ).length;

  return (
    <div className="ProfileCard">

      {/* Profile Images */}
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? publicFolder + user.coverPicture
              : publicFolder + "defaultCover.jpg"
          }
          alt="cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = publicFolder + "defaultCover.jpg";
          }}
        />

        <img
          src={
            user.profilePicture
              ? publicFolder + user.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = publicFolder + "defaultProfile.png";
          }}
        />
      </div>

      {/* Profile Name */}
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt || "Write about yourself..."}</span>
      </div>

      {/* Follow Status */}
      <div className="followStatus">
        <hr />
        <div>

          <div className="follow">
            <span>{user.followers?.length || 0}</span>
            <span>Followers</span>
          </div>

          <div className="vl"></div>

          <div className="follow">
            <span>{user.following?.length || 0}</span>
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

      {/* Profile Link */}
      {location !== "profilePage" && (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;