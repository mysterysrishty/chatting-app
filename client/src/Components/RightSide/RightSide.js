import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Img/home.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Noti from '../../Img/noti.png';
import Comment from '../../Img/comment.png';
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
          <img src={Home} alt="home" />
        </Link>

        <SettingsOutlinedIcon className="icon" />
        <img src={Noti} alt="notifications" />
        <img src={Comment} alt="comments" />
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