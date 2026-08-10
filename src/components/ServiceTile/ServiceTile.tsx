import React from 'react';

const ServiceTile = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="service-tile"
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {icon && <div className="service-icon">{icon}</div>}
      <h4 className="service-title">{title}</h4>
      <p className="service-desc">{description}</p>
    </div>
  );
};

export default ServiceTile;
