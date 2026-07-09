import React from "react";
import { Link } from "react-router-dom";
import "./Payment.css";

const UtilityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2">
    <path d="M12 2C8 7 5 10.5 5 14a7 7 0 0 0 14 0c0-3.5-3-7-7-12z" />
  </svg>
);

const MiscIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h6" strokeLinecap="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B1E3F" strokeWidth="2">
    <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.35-1.5.9-1.5 1.7v.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.5" fill="#8B1E3F" />
  </svg>
);

const CATEGORIES = [
  {
    key: "utility",
    icon: <UtilityIcon />,
    title: "Utility",
    description: "Pay water charges, assessment rates, and other recurring municipal utility bills.",
    to: "/payments/utility", // TODO: update once the Utility flow route exists
  },
  {
    key: "miscellaneous",
    icon: <MiscIcon />,
    title: "Miscellaneous",
    description: "Settle one-off charges such as certificates, permits, fines, and other municipal fees.",
    to: "/payments/miscellaneous", // TODO: update once the Miscellaneous flow route exists
  },
];

const Payments = () => {
  return (
    <div className="payments-page">
      <div className="payments-page__breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span className="payments-page__breadcrumb-sep">›</span>
        <span className="payments-page__breadcrumb-current">Payments</span>
      </div>

      <p className="payments-page__eyebrow">PAYMENTS</p>
      <h1 className="payments-page__title">Make a payment</h1>
      <p className="payments-page__subtitle">
        Choose a payment category to get started. You&apos;ll select the specific service to
        pay for on the next page.
      </p>

      <div className="payments-page__grid">
        {CATEGORIES.map((category) => (
          <div className="payment-card" key={category.key}>
            <div className="payment-card__icon">{category.icon}</div>
            <h2 className="payment-card__title">{category.title}</h2>
            <p className="payment-card__description">{category.description}</p>
            <Link to={category.to} className="payment-card__select">
              Select <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="payments-page__footer-row">
        <div className="footer-card footer-card--history">
          <div>
            <h3 className="footer-card__title">Need a history of your transactions?</h3>
            <p className="footer-card__description">
              Access your digital receipts and payment history directly from your citizen
              dashboard.
            </p>
          </div>
          <Link to="/payments/history" className="footer-card__button">
            View History
          </Link>
        </div>

        <div className="footer-card footer-card--help">
          <div className="footer-card__help-icon">
            <HelpIcon />
          </div>
          <div>
            <h3 className="footer-card__title">Help &amp; Support</h3>
            <p className="footer-card__description">Available 24/7 for payment inquiries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;