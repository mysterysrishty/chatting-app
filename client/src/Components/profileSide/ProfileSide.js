import React from 'react';
import './ProfileSide.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfileSide = () => {
  return (
    <aside className="ProfileSide">

      {/* 🔍 Logo + Search */}
      <section className="sideSection">
        <LogoSearch />
      </section>

      {/* 👤 Profile Card */}
      <section className="sideSection">
        <ProfileCard location="homepage" />
      </section>

      {/* 👥 Followers */}
      <section className="sideSection">
        <FollowersCard />
      </section>

    </aside>
  );
};

export default ProfileSide;

