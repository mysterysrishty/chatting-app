import React from 'react'
import './Home.css'
import ProfileSide from '../../Components/profileSide/ProfileSide'
import PostSide from '../../Components/PostSide/PostSide'
import RightSide from '../../Components/RightSide/RightSide'

const Home = () => {
  return (
    <div className="Home">
      
      <div className="left-side">
        <ProfileSide />
      </div>

      <div className="main-side">
        <PostSide />
      </div>

      <div className="right-side">
        <RightSide />
      </div>

    </div>
  )
}

export default Home
