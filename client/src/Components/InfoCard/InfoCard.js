import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (profileUserId?.toString() === user._id?.toString()) {
          setProfileUser(user);
        } else {
          const { data } = await UserApi.getUser(profileUserId);
          setProfileUser(data);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">

      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId && (
          <div>
            <EditIcon
              style={{ cursor: "pointer" }}
              onClick={() => setModalOpened(true)}
            />

            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        )}
      </div>

      <div className="info">
        <span>Status</span>
        <span>{profileUser?.relationship || "Not added"}</span>
      </div>

      <div className="info">
        <span>Lives in</span>
        <span>{profileUser?.livesin || "Not added"}</span>
      </div>

      <div className="info">
        <span>Works at</span>
        <span>{profileUser?.worksAt || "Not added"}</span>
      </div>

      <button className="logout-button" onClick={handleLogOut}>
        Log Out
      </button>

    </div>
  );
};

export default InfoCard;
