import React from 'react';
import './ProfilePageLeft.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfilePageLeft = () => {
  return (
    <aside className="ProfilePageLeft" aria-label="Profile sidebar">

      {/* 🔍 Logo + Search */}
      <section className="leftSection" aria-label="Search section">
        <LogoSearch />
      </section>

      {/* 👤 Profile Info */}
      <section className="leftSection" aria-label="User information">
        <InfoCard />
      </section>

      {/* 👥 Followers */}
      <section className="leftSection" aria-label="Followers suggestions">
        <FollowersCard />
      </section>

    </aside>
  );
};

export default ProfilePageLeft;