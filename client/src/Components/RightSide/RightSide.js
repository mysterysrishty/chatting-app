import React, { useState } from 'react';
import './RightSide.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <aside className="RightSide">

      {/* 🔝 Navigation Icons */}
      <div className="navIcons">
        <Link to="/home">
          <img src="/home.png" alt="home" />
        </Link>

        <SettingsOutlinedIcon className="icon" />

        <img src="/noti.png" alt="notifications" />
        <img src="/comment.png" alt="comments" />
      </div>

      {/* 🔥 Trends */}
      <section className="rightSection">
        <TrendCard />
      </section>

      {/* 🚀 Share Button */}
      <button
        className="rg-button"
        onClick={() => setModalOpened(true)}
      >
        Share
      </button>

      {/* 📤 Modal */}
      <ShareModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />

    </aside>
  );
};

export default RightSide;