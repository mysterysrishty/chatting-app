import React, { useState } from 'react';
import './RightSide.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <aside className="RightSide" aria-label="Right sidebar">

      {/* 🔝 Navigation Icons */}
      <div className="navIcons">

        {/* 🏠 Home */}
        <Link to="/home">
          <img
            src={serverPublic + "home.png"}
            alt="home"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </Link>

        {/* ⚙️ Settings */}
        <SettingsOutlinedIcon className="icon" />

        {/* 🔔 Notifications */}
        <img
          src={serverPublic + "noti.png"}
          alt="notifications"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        {/* 💬 Comments */}
        <img
          src={serverPublic + "comment.png"}
          alt="comments"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

      </div>

      {/* 🔥 Trends */}
      <section className="rightSection" aria-label="Trending topics">
        <TrendCard />
      </section>

      {/* 🚀 Share Button */}
      <button
        className="rg-button"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>

      {/* 📤 Share Modal */}
      <ShareModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />

    </aside>
  );
};

export default RightSide;