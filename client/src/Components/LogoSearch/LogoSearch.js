import React, { useState } from 'react';
import './LogoSearch.css';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search:", query);
  };

  return (
    <div className="LogoSearch">

      {/* Logo + Name */}
      <div className="brand">
        {/* ✅ FIXED: using public folder */}
        <img src="/Img/logo.png" alt="logo" />
        <span>Srishty Social</span>
      </div>

      {/* Search Box */}
      <div className="Search">
        <input
          type="text"
          placeholder="Search people or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="s-icon" onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>

    </div>
  );
};

export default LogoSearch;