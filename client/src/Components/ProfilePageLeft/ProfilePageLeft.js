import React from 'react';
import './ProfilePageLeft.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfilePageLeft = () => {
  return (
    <aside className="ProfilePageLeft">

      {/* 🔍 Logo + Search */}
      <section className="leftSection">
        <LogoSearch />
      </section>

      {/* 👤 Profile Info */}
      <section className="leftSection">
        <InfoCard />
      </section>

      {/* 👥 Followers */}
      <section className="leftSection">
        <FollowersCard />
      </section>

    </aside>
  );
};

export default ProfilePageLeft;
