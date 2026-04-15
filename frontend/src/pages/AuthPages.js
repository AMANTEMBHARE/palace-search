import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.success) navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">
            <svg viewBox="0 0 36 36" fill="none" width="40" height="40"><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" fill="white" opacity="0.2"/><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/><path d="M18 4L25 8.5" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span>NESTRA</span>
          </div>
          <h2 className="auth-left-title">Find your student home with confidence.</h2>
          <p className="auth-left-sub">2,400+ verified listings across 5 Indian cities. Zero scams, zero middlemen.</p>
          <div className="auth-left-stats">
            {[['2,400+','Verified listings'],['18k+','Happy students'],['4.7★','Avg rating']].map(([n,l]) => (
              <div key={l} className="auth-left-stat"><div className="auth-left-stat-num">{n}</div><div className="auth-left-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Log in to your Nestra account</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
          </form>
          <div className="auth-demo">
            <div className="auth-demo-title">Demo accounts</div>
            <div className="auth-demo-accounts">
              <button onClick={() => setForm({ email: 'admin@nestra.in', password: 'admin123' })}>Admin</button>
              <button onClick={() => setForm({ email: 'rajesh@owner.com', password: 'owner123' })}>Owner</button>
              <button onClick={() => setForm({ email: 'arjun@student.com', password: 'student123' })}>Student</button>
            </div>
          </div>
          <p className="auth-switch">Don't have an account? <Link to="/register">Sign up free</Link></p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'student', college: '', city: 'Nagpur' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo"><svg viewBox="0 0 36 36" fill="none" width="40" height="40"><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" fill="white" opacity="0.2"/><path d="M18 4L32 13V32H24V22H12V32H4V13L18 4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/><path d="M18 4L25 8.5" stroke="#E63B2E" strokeWidth="2.5" strokeLinecap="round"/></svg><span>NESTRA</span></div>
          <h2 className="auth-left-title">Join thousands of students who found their perfect PG.</h2>
          <div className="auth-benefits">
            {['Free to search and enquire','Save your favourite listings','Get alerts for new listings','Review and rate your PG'].map(b => (
              <div key={b} className="auth-benefit">✓ {b}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Free forever for students</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full name</label>
                <input required placeholder="Arjun Singh" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="tel" placeholder="98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" required placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required minLength={6} placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>I am a</label>
              <div className="role-select">
                {[['student','🎓 Student'],['owner','🏠 PG Owner']].map(([v,l]) => (
                  <button key={v} type="button" className={`role-btn${form.role === v ? ' active' : ''}`} onClick={() => setForm(f => ({ ...f, role: v }))}>{l}</button>
                ))}
              </div>
            </div>
            {form.role === 'student' && (
              <div className="form-row">
                <div className="form-group">
                  <label>College (optional)</label>
                  <input placeholder="VNIT Nagpur" value={form.college} onChange={e => setForm(f => ({ ...f, college: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <select value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}>
                    {['Nagpur','Pune','Bangalore','Kota','Hyderabad'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}