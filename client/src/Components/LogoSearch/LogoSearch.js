import React from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.png';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>

      {/* Logo + Name */}
      <div className="brand">
        <img src={Logo} alt="logo" />
        <span>Srishty Social</span>
      </div>

      {/* Search Box */}
      <div className="Search">
        <input type="text" placeholder='Search people or posts...' />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch
