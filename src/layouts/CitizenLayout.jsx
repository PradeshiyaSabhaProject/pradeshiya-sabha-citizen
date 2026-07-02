import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const CitizenLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CitizenLayout;
