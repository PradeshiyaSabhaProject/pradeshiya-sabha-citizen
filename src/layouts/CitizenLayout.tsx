import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const CitizenLayout = ({ children }) => {
  return (
    <div className="layout-container min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="main-content flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CitizenLayout;
