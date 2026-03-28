import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import UserFollow from '../UserFollow/UserFollow';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const { data } = await getAllUser();
        setPersons(data);
      } catch (err) {
        console.log("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <div className="FollowersCard">Loading...</div>;
  }

  // ❌ Safety check
  if (!user) return null;

  // 👥 Filter users (exclude self)
  const filteredUsers = persons.filter(
    (person) => person._id !== user._id
  );

  return (
    <div className="FollowersCard">

      <h3 className="fc-title">People you may know</h3>

      {/* 👇 No users case */}
      {filteredUsers.length === 0 ? (
        <span style={{ fontSize: "14px", color: "gray" }}>
          No users to show
        </span>
      ) : (
        filteredUsers.map((person) => (
          <UserFollow person={person} key={person._id} />
        ))
      )}

    </div>
  );
};

export default FollowersCard;