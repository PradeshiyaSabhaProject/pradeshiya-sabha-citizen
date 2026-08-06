import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }: any) => {
  return (
    <button type={type} onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
