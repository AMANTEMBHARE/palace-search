import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHeart, FiLogOut, FiSettings, FiHome } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navClass = `navbar${isHome && !scrolled ? ' navbar--transparent' : ' navbar--solid'}${scrolled ? ' navbar--scrolled' : ''}`;

  return (
    <nav className={navClass}>
      <div className="nav-inner container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 36 36" fill="none"><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" fill="currentColor" opacity="0.15"/><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M18 4L25 8.5" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <span className="nav-logo-name">NESTRA</span>
            <span className="nav-logo-tagline">Student Relocation</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          <Link to="/search" className="nav-link">Find PG</Link>
          <Link to="/cities" className="nav-link">Cities</Link>
          <Link to="/list-property" className="nav-link">List Your PG</Link>
          <a href="tel:+918000000000" className="nav-link nav-link--phone">
            <span className="nav-phone-dot" />
            <span>Helpline</span>
          </a>
        </div>

        {/* Auth */}
        <div className="nav-auth">
          {user ? (
            <div className="nav-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="nav-avatar">{user.name[0].toUpperCase()}</div>
              <span className="nav-username">{user.name.split(' ')[0]}</span>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-header">
                    <div className="nav-dropdown-avatar">{user.name[0]}</div>
                    <div>
                      <div className="nav-dropdown-name">{user.name}</div>
                      <div className="nav-dropdown-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="nav-dropdown-divider" />
                  <Link to="/profile" className="nav-dropdown-item"><FiUser size={15} /> My Profile</Link>
                  <Link to="/saved" className="nav-dropdown-item"><FiHeart size={15} /> Saved PGs</Link>
                  {(user.role === 'owner' || user.role === 'admin') && (
                    <Link to="/dashboard" className="nav-dropdown-item"><FiHome size={15} /> Dashboard</Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin" className="nav-dropdown-item"><FiSettings size={15} /> Admin Panel</Link>
                  )}
                  <div className="nav-dropdown-divider" />
                  <button className="nav-dropdown-item nav-dropdown-logout" onClick={logout}><FiLogOut size={15} /> Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Log In</button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Sign Up</button>
            </>
          )}
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile">
          <Link to="/search" className="nav-mobile-link">Find PG</Link>
          <Link to="/cities" className="nav-mobile-link">Cities</Link>
          <Link to="/list-property" className="nav-mobile-link">List Your PG</Link>
          <div className="nav-mobile-divider" />
          {user ? (
            <>
              <Link to="/profile" className="nav-mobile-link">My Profile</Link>
              <Link to="/saved" className="nav-mobile-link">Saved PGs</Link>
              <button className="nav-mobile-link" onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-mobile-link">Log In</Link>
              <Link to="/register" className="nav-mobile-link nav-mobile-link--cta">Sign Up Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}