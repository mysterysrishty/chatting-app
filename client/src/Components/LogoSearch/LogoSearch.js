import React, { useState } from 'react';
import './LogoSearch.css';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  const [query, setQuery] = useState("");

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // 🔍 Handle search
  const handleSearch = () => {
    if (!query.trim()) return;
    console.log("Search:", query);
  };

  return (
    <div className="LogoSearch">

      {/* 🔹 Logo + Name */}
      <div className="brand">
        <img
          src={serverPublic + "logo.png"}
          alt="logo"
          onError={(e) => {
            e.target.src = serverPublic + "defaultProfile.png"; // fallback
          }}
        />
        <span>Srishty Social</span>
      </div>

      {/* 🔹 Search Box */}
      <div className="Search">
        <input
          type="text"
          placeholder="Search people or posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <div className="s-icon" onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>

    </div>
  );
};

export default LogoSearch;