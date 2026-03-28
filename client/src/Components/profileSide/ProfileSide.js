import React from 'react';
import './ProfileSide.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfileSide = () => {
  return (
    <aside className="ProfileSide" aria-label="Sidebar">

      {/* 🔍 Logo + Search */}
      <section className="sideSection" aria-label="Search section">
        <LogoSearch />
      </section>

      {/* 👤 Profile Card */}
      <section className="sideSection" aria-label="User profile">
        <ProfileCard location="homepage" />
      </section>

      {/* 👥 Followers */}
      <section className="sideSection" aria-label="Suggested users">
        <FollowersCard />
      </section>

    </aside>
  );
};

export default ProfileSide;