import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiShield, FiStar, FiMapPin, FiArrowRight, FiCheck, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi';
import api from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import './HomePage.css';

const TRUST_STATS = [
  { value: '2,400+', label: 'Verified Listings', icon: <FiHome size={22} /> },
  { value: '18,000+', label: 'Happy Students', icon: <FiUsers size={22} /> },
  { value: '5', label: 'Cities & Growing', icon: <FiMapPin size={22} /> },
  { value: '4.7★', label: 'Average Rating', icon: <FiStar size={22} /> },
];

const FEATURES = [
  { icon: '🛡️', title: 'Physically Verified', desc: 'Our team visits every PG before listing. No fake photos, no misrepresentation.', color: '#EFF6FF' },
  { icon: '🔍', title: 'Owner ID Checked', desc: 'Every owner\'s identity and property documents are verified by our team.', color: '#F0FDF4' },
  { icon: '⭐', title: 'Student Reviews Only', desc: 'Reviews come only from students who actually stayed. Zero fake ratings.', color: '#FFFBEB' },
  { icon: '📍', title: 'Area Intelligence', desc: 'Mess, ATMs, pharmacies, laundry, coaching — all mapped for every locality.', color: '#FDF2F8' },
  { icon: '💬', title: 'Direct WhatsApp Connect', desc: 'No middlemen. Connect directly with verified owners via WhatsApp or call.', color: '#F0FDFA' },
  { icon: '🚫', title: 'Anti-Fraud Guarantee', desc: 'No advance payment scams. We back every verified listing with our guarantee.', color: '#FFF7ED' },
];

const TESTIMONIALS = [
  { name: 'Arjun Singh', college: 'B.Tech CSE · VNIT Nagpur', text: 'Found my PG on Nestra the same evening I arrived in Nagpur. The area guide showed me the closest mess and medical store — details no other site provides. Absolutely love it.', rating: 5, avatar: 'AS', bg: '#EEF2FF', color: '#3730A3' },
  { name: 'Priya Mehta (Parent)', college: 'Daughter at LIT Nagpur', text: 'As a parent, the verification badge and owner ID check gave me real confidence. My daughter is safe, happy, and very comfortable in her Dharampeth PG. Thank you Nestra.', rating: 5, avatar: 'PM', bg: '#FEF3C7', color: '#92400E' },
  { name: 'Rohit Jaiswal', college: 'JEE Aspirant · Kota', text: 'Scholar Den was exactly what I needed. Quiet, study-focused, and the mess food is home-like. Nestra\'s search made it easy to find the best option near my coaching institute.', rating: 5, avatar: 'RJ', bg: '#F0FDF4', color: '#15803D' },
];

const CITIES = [
  { name: 'Nagpur', slug: 'nagpur', count: '400+', desc: 'Engineering & Medical hub', emoji: '🍊' },
  { name: 'Pune', slug: 'pune', count: '600+', desc: 'Oxford of the East', emoji: '🎓' },
  { name: 'Bangalore', slug: 'bangalore', count: '800+', desc: 'India\'s tech capital', emoji: '💻' },
  { name: 'Kota', slug: 'kota', count: '200+', desc: 'JEE & NEET coaching hub', emoji: '📚' },
  { name: 'Hyderabad', slug: 'hyderabad', count: '300+', desc: 'Pearl City of opportunity', emoji: '💎' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [city, setCity] = useState('Nagpur');
  const [budget, setBudget] = useState('');
  const [search, setSearch] = useState('');
  const [featuredProps, setFeaturedProps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get('/properties/featured').then(r => { setFeaturedProps(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (budget) params.set('maxPrice', budget);
    if (search) params.set('search', search);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape hero-bg-shape-1" />
          <div className="hero-bg-shape hero-bg-shape-2" />
          <div className="hero-bg-dots" />
        </div>
        <div className="container hero-content">
          <div className="hero-text animate-in">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Now live in Nagpur, Pune & Bangalore
            </div>
            <h1 className="hero-headline">
              Your new city,<br />
              <span className="hero-headline-accent">figured out.</span>
            </h1>
            <p className="hero-sub">
              Find verified PGs, hostels & mess services near your college.
              Safe. Trusted. Student-first.
            </p>

            {/* Search Box */}
            <form className="hero-search" onSubmit={handleSearch}>
              <div className="hero-search-inner">
                <div className="hero-search-field">
                  <label>City</label>
                  <select value={city} onChange={e => setCity(e.target.value)}>
                    <option>Nagpur</option><option>Pune</option><option>Bangalore</option><option>Kota</option><option>Hyderabad</option>
                  </select>
                </div>
                <div className="hero-search-divider" />
                <div className="hero-search-field hero-search-field--grow">
                  <label>Near college or area</label>
                  <input type="text" placeholder="VNIT, Dharampeth, Koramangala..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="hero-search-divider" />
                <div className="hero-search-field">
                  <label>Budget / month</label>
                  <select value={budget} onChange={e => setBudget(e.target.value)}>
                    <option value="">Any budget</option>
                    <option value="5000">Under ₹5,000</option>
                    <option value="8000">Under ₹8,000</option>
                    <option value="12000">Under ₹12,000</option>
                    <option value="20000">Under ₹20,000</option>
                  </select>
                </div>
                <button type="submit" className="hero-search-btn">
                  <FiSearch size={18} />
                  <span>Search</span>
                </button>
              </div>
            </form>

            <div className="hero-trust-bar">
              {['2,400+ Verified listings', 'Anti-fraud guarantee', 'Free for students', 'Direct WhatsApp connect'].map(t => (
                <div key={t} className="hero-trust-item"><FiCheck size={13} />{t}</div>
              ))}
            </div>
          </div>

          <div className="hero-visual animate-in" style={{ animationDelay: '0.15s' }}>
            <div className="hero-card-float hero-card-1">
              <div className="hero-card-icon">🛡️</div>
              <div><div className="hero-card-title">Nestra Verified</div><div className="hero-card-sub">Owner ID • Photos • Field visit</div></div>
            </div>
            <div className="hero-card-float hero-card-2">
              <div style={{ fontSize: 22 }}>⭐</div>
              <div><div className="hero-card-title">4.8 rating</div><div className="hero-card-sub">54 student reviews</div></div>
            </div>
            <div className="hero-card-float hero-card-3">
              <div style={{ fontSize: 22 }}>🔥</div>
              <div><div className="hero-card-title">189+ enquiries</div><div className="hero-card-sub">this month</div></div>
            </div>
            <div className="hero-illustration">
              <svg viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="60" width="240" height="220" rx="20" fill="white" opacity="0.08"/>
                <rect x="20" y="60" width="240" height="220" rx="20" stroke="white" strokeWidth="1" opacity="0.2"/>
                <rect x="20" y="60" width="240" height="100" rx="20" fill="white" opacity="0.06"/>
                <path d="M140 20L200 55V130H80V55L140 20Z" fill="white" opacity="0.15"/>
                <path d="M140 20L200 55V130H80V55L140 20Z" stroke="white" strokeWidth="2" opacity="0.4"/>
                <path d="M140 20L162 34" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="100" cy="170" r="20" fill="white" opacity="0.1"/>
                <circle cx="100" cy="170" r="20" stroke="white" strokeWidth="1" opacity="0.3"/>
                <rect x="130" y="158" width="110" height="8" rx="4" fill="white" opacity="0.2"/>
                <rect x="130" y="172" width="80" height="6" rx="3" fill="white" opacity="0.12"/>
                <rect x="40" y="210" width="200" height="8" rx="4" fill="white" opacity="0.1"/>
                <rect x="40" y="224" width="160" height="8" rx="4" fill="white" opacity="0.08"/>
                <rect x="40" y="238" width="180" height="8" rx="4" fill="white" opacity="0.06"/>
                <circle cx="230" cy="100" r="12" fill="#22C55E" opacity="0.9"/>
                <path d="M225 100L229 104L236 97" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats-bar">
          <div className="container">
            <div className="hero-stats">
              {TRUST_STATS.map(s => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-icon">{s.icon}</div>
                  <div className="hero-stat-value">{s.value}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Simple process</div>
            <h2 className="section-title">Find your PG in 3 steps</h2>
            <p className="section-sub">No agents. No hidden fees. No surprises. Just safe, verified student homes.</p>
          </div>
          <div className="how-steps">
            {[
              { num: '01', title: 'Search', desc: 'Enter your city, college, and budget. Get matched with verified listings instantly.', icon: '🔍' },
              { num: '02', title: 'Compare', desc: 'Browse full details — rooms, amenities, area maps, reviews. Everything you need.', icon: '📊' },
              { num: '03', title: 'Connect', desc: 'WhatsApp or call the owner directly. Visit in person and move in!', icon: '🤝' },
            ].map((step, i) => (
              <div key={i} className="how-step">
                <div className="how-step-num">{step.num}</div>
                <div className="how-step-icon">{step.icon}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-eyebrow">Hand-picked for you</div>
              <h2 className="section-title">Featured verified PGs</h2>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/search')}>View all <FiArrowRight size={15} /></button>
          </div>
          {loading ? (
            <div className="grid-3">
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 360, borderRadius: 14 }} />)}
            </div>
          ) : featuredProps.length > 0 ? (
            <div className="grid-3">
              {featuredProps.slice(0, 6).map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: 48 }}>🏠</div>
              <p>No featured properties yet. <button onClick={() => navigate('/search')}>Browse all listings</button></p>
            </div>
          )}
        </div>
      </section>

      {/* WHY NESTRA */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Why Nestra</div>
            <h2 className="section-title">We check everything,<br />so you don't have to.</h2>
            <p className="section-sub">Every listing goes through our 5-point verification before it reaches you.</p>
          </div>
          <div className="why-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="why-card" style={{ '--card-bg': f.color }}>
                <div className="why-card-icon">{f.icon}</div>
                <h3 className="why-card-title">{f.title}</h3>
                <p className="why-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="section cities-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Where we are</div>
            <h2 className="section-title">Student cities we serve</h2>
          </div>
          <div className="cities-grid">
            {CITIES.map((c, i) => (
              <div key={c.slug} className={`city-card${i === 0 ? ' city-card--large' : ''}`} onClick={() => navigate(`/search?city=${c.name}`)}>
                <div className="city-card-emoji">{c.emoji}</div>
                <div className="city-card-name">{c.name}</div>
                <div className="city-card-count">{c.count} listings</div>
                <div className="city-card-desc">{c.desc}</div>
                <div className="city-card-cta">Explore <FiArrowRight size={13} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testi-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Student stories</div>
            <h2 className="section-title">Trusted by students across India</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-stars">{Array(t.rating).fill('★').join('')}</div>
                <p className="testi-quote">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar" style={{ background: t.bg, color: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-college">{t.college}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR OWNERS */}
      <section className="owners-section">
        <div className="container">
          <div className="owners-inner">
            <div className="owners-text">
              <div className="section-eyebrow" style={{ color: '#F5A623' }}>PG & Hostel Owners</div>
              <h2 className="owners-title">Fill your rooms faster with Nestra leads</h2>
              <p className="owners-desc">List your PG for free. Get verified. Receive direct WhatsApp enquiries from students actively searching in your area.</p>
              <ul className="owners-benefits">
                {['Free listing — no upfront cost', 'Verified badge builds tenant trust', 'Direct leads via WhatsApp & call', 'Admin dashboard to manage enquiries'].map(b => (
                  <li key={b}><FiCheckCircle size={16} />{b}</li>
                ))}
              </ul>
              <div className="owners-ctas">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('/list-property')}>List Your PG Free →</button>
                <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => navigate('/contact')}>Talk to us</button>
              </div>
            </div>
            <div className="owners-stats">
              {[{ n: '8,000+', l: 'Monthly student searches' }, { n: '₹0', l: 'Cost to list your PG' }, { n: '24 hrs', l: 'Verification turnaround' }, { n: '189', l: 'Avg enquiries/month' }].map(s => (
                <div key={s.l} className="owners-stat">
                  <div className="owners-stat-num">{s.n}</div>
                  <div className="owners-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}