import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const CITIES = ['Nagpur', 'Pune', 'Bangalore', 'Hyderabad', 'Kota', 'Delhi'];
const COMPANY = [{ label: 'About Nestra', to: '/about' }, { label: 'Blog', to: '/blog' }, { label: 'Careers', to: '/careers' }, { label: 'Press', to: '/press' }, { label: 'Safety Promise', to: '/safety' }];
const SUPPORT = [{ label: 'Help Center', to: '/help' }, { label: 'FAQs', to: '/faqs' }, { label: 'Contact Us', to: '/contact' }, { label: 'Report a Problem', to: '/report' }, { label: 'Refund Policy', to: '/refunds' }];
const OWNERS = [{ label: 'List Your PG', to: '/list-property' }, { label: 'Owner Dashboard', to: '/dashboard' }, { label: 'Pricing Plans', to: '/pricing' }, { label: 'Verification Process', to: '/verification' }];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                  <path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" fill="white" opacity="0.15"/>
                  <path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M18 4L25 8.5" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <div className="footer-logo-name">NESTRA</div>
                  <div className="footer-logo-sub">Student Relocation & Housing</div>
                </div>
              </div>
              <p className="footer-desc">India's most trusted platform for student accommodation. Verified PGs, mess services, and city guides — all in one place.</p>
              <div className="footer-contact">
                <a href="tel:+918000000000" className="footer-contact-item"><FiPhone size={14} /> +91 80000 00000</a>
                <a href="mailto:hello@nestra.in" className="footer-contact-item"><FiMail size={14} /> hello@nestra.in</a>
                <div className="footer-contact-item"><FiMapPin size={14} /> Nagpur, Maharashtra</div>
              </div>
              <div className="footer-social">
                <a href="#" className="footer-social-link"><FiInstagram /></a>
                <a href="#" className="footer-social-link"><FiTwitter /></a>
                <a href="#" className="footer-social-link"><FiFacebook /></a>
                <a href="#" className="footer-social-link"><FiYoutube /></a>
              </div>
            </div>

            {/* Cities */}
            <div className="footer-col">
              <div className="footer-col-title">Cities</div>
              {CITIES.map(city => (
                <Link key={city} to={`/search?city=${city}`} className="footer-link">PGs in {city}</Link>
              ))}
            </div>

            {/* Company */}
            <div className="footer-col">
              <div className="footer-col-title">Company</div>
              {COMPANY.map(item => <Link key={item.label} to={item.to} className="footer-link">{item.label}</Link>)}
            </div>

            {/* Support & Owners */}
            <div className="footer-col">
              <div className="footer-col-title">Support</div>
              {SUPPORT.map(item => <Link key={item.label} to={item.to} className="footer-link">{item.label}</Link>)}
              <div className="footer-col-title" style={{ marginTop: 20 }}>For Owners</div>
              {OWNERS.map(item => <Link key={item.label} to={item.to} className="footer-link">{item.label}</Link>)}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-legal">© 2025 Nestra Technologies Pvt. Ltd. All rights reserved.</div>
            <div className="footer-legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}