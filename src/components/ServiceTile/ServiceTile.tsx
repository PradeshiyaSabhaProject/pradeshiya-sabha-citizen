import React from 'react';

const ServiceTile = ({ title, description, icon, onClick }) => {
  return (
    <button type="button" className="service-tile" onClick={onClick}>
      {icon && <div className="service-icon">{icon}</div>}
      <h4 className="service-title">{title}</h4>
      <p className="service-desc">{description}</p>
    </button>
  );
};

export default ServiceTile;
