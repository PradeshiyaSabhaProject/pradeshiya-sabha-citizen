import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdMiscellaneousServices,
  MdAssignment,
  MdPayment,
  MdVerifiedUser,
  MdHelp,
  MdNotifications,
  MdAccountCircle,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useState } from "react";
import "./Navbar.css";

interface NavLink {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
  { label: "Services", path: "/services", icon: <MdMiscellaneousServices /> },
  { label: "Applications", path: "/applications", icon: <MdAssignment /> },
  { label: "Payments", path: "/payments", icon: <MdPayment /> },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const isActive = (path: string): boolean =>
    location.pathname.startsWith(path);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__brand">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.15)" />
              <path
                d="M20 6L32 14V26L20 34L8 26V14L20 6Z"
                stroke="white"
                strokeWidth="2"
                fill="rgba(255,255,255,0.1)"
              />
              <circle cx="20" cy="20" r="5" fill="white" opacity="0.9" />
            </svg>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-main">Homagama</span>
            <span className="navbar__brand-sub">Pradeshiya Sabha</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${isActive(link.path) ? "navbar__link--active" : ""}`}
            >
              <span className="navbar__link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="navbar__verified-btn" type="button" aria-label="Verified Citizen">
            <MdVerifiedUser className="navbar__verified-icon" />
            <span>Verified Citizen</span>
          </button>

          <button className="navbar__icon-btn" type="button" aria-label="Help">
            <MdHelp />
          </button>
          <button className="navbar__icon-btn" type="button" aria-label="Notifications">
            <MdNotifications />
            <span className="navbar__notif-badge">3</span>
          </button>
          <button className="navbar__icon-btn navbar__profile-btn" type="button" aria-label="Profile">
            <MdAccountCircle />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__mobile-link ${isActive(link.path) ? "navbar__mobile-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="navbar__link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="navbar__mobile-actions">
            <button className="navbar__verified-btn" type="button">
              <MdVerifiedUser className="navbar__verified-icon" />
              <span>Verified Citizen</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
