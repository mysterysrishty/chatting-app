import React from "react";
import "./TrendCard.css";
import { TrendData } from "../Data/TrendData";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <div className="trend-header">
        <h3>Trending for you</h3>
        <span className="see-all">See all</span>
      </div>

      <div className="trend-list">
        {TrendData.map((trend) => (
          <div className="trend" key={trend.id}>
            <div className="trend-info">
              <span className="trend-name">#{trend.name}</span>
              <span className="trend-shares">
                {trend.shares}k Shares
              </span>
            </div>

            <button className="trend-btn">•••</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendCard;
