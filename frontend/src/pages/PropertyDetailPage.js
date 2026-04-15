import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiStar, FiPhone, FiShare2, FiHeart, FiCheck, FiChevronRight, FiUser } from 'react-icons/fi';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './PropertyDetailPage.css';

const AMENITY_LABELS = { wifi:'Wi-Fi', ac:'AC', mess:'Mess/Meals', laundry:'Laundry', security:'24×7 Security', cctv:'CCTV', gym:'Gym', reading_room:'Study Room', power_backup:'Power Backup', hot_water:'Hot Water', parking:'Parking', housekeeping:'Housekeeping', tv:'TV Room', water_purifier:'Water Purifier', fridge:'Refrigerator', attached_bath:'Attached Bathroom' };
const AMENITY_ICONS = { wifi:'📶', ac:'❄️', mess:'🍽️', laundry:'👕', security:'🔒', cctv:'📷', gym:'💪', reading_room:'📚', power_backup:'⚡', hot_water:'🚿', parking:'🅿️', housekeeping:'✨', tv:'📺', water_purifier:'💧', fridge:'🧊', attached_bath:'🛁' };

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, saveProperty, isSaved } = useAuth();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiryForm, setEnquiryForm] = useState({ name: user?.name || '', phone: user?.phone || '', message: '', source: 'form' });
  const [submitting, setSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      api.get(`/properties/${id}`),
      api.get(`/reviews/property/${id}`)
    ]).then(([pRes, rRes]) => {
      setProperty(pRes.data.data);
      setReviews(rRes.data.data);
    }).catch(() => navigate('/search'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/leads', { ...enquiryForm, property: id });
      toast.success('Enquiry sent! The owner will contact you soon.');
      setEnquiryForm({ name: '', phone: '', message: '', source: 'form' });
    } catch { toast.error('Failed to send enquiry'); }
    finally { setSubmitting(false); }
  };

  const handleWhatsApp = () => {
    if (!property?.contactWhatsapp) return toast.error('WhatsApp not available');
    const msg = encodeURIComponent(`Hi, I found ${property.name} on Nestra and I'm interested. Could you share more details?`);
    window.open(`https://wa.me/91${property.contactWhatsapp}?text=${msg}`, '_blank');
    api.post('/leads', { name: user?.name || 'WhatsApp visitor', phone: property.contactWhatsapp, property: id, source: 'whatsapp' }).catch(() => {});
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to leave a review');
    try {
      const { data } = await api.post('/reviews', { ...reviewForm, property: id });
      setReviews(r => [data.data, ...r]);
      setShowReviewForm(false);
      toast.success('Review submitted!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to submit review'); }
  };

  if (loading) return (
    <div className="detail-loading">
      <div className="container">
        <div className="skeleton" style={{ height: 420, borderRadius: 20, marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          <div className="skeleton" style={{ height: 500, borderRadius: 14 }} />
          <div className="skeleton" style={{ height: 500, borderRadius: 14 }} />
        </div>
      </div>
    </div>
  );

  if (!property) return null;

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <div className="container">
          <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
          <FiChevronRight size={13} />
          <span onClick={() => navigate(`/search?city=${property.address.city}`)} className="breadcrumb-link">{property.address.city}</span>
          <FiChevronRight size={13} />
          <span className="breadcrumb-current">{property.name}</span>
        </div>
      </div>

      {/* Hero Image Area */}
      <div className="detail-hero">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-main-img">
              {property.thumbnail ? (
                <img src={property.thumbnail} alt={property.name} />
              ) : (
                <div className="detail-img-placeholder" style={{ background: 'linear-gradient(135deg, #1C2B4A, #2E4480)' }}>
                  <svg viewBox="0 0 100 100" fill="none" width="80" height="80"><path d="M50 12L88 33V88H62V60H38V88H12V33L50 12Z" fill="white" opacity="0.2"/><path d="M50 12L88 33V88H62V60H38V88H12V33L50 12Z" stroke="white" strokeWidth="2" opacity="0.4"/></svg>
                </div>
              )}
            </div>
            <div className="detail-sub-imgs">
              {[1,2,3,4].map(i => (
                <div key={i} className="detail-sub-img" style={{ background: `linear-gradient(135deg, hsl(${210+i*20},40%,${40+i*5}%), hsl(${230+i*15},50%,${50+i*3}%))` }}>
                  <div style={{ opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 20 }}>🏠</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container detail-body">
        <div className="detail-main">
          {/* Header */}
          <div className="detail-header">
            <div className="detail-header-left">
              <div className="detail-badges">
                {property.isVerified && <span className="badge-verified">Nestra Verified</span>}
                {property.isFeatured && <span className="tag tag-amber">Featured</span>}
                <span className={`tag tag-${property.gender === 'boys' ? 'blue' : property.gender === 'girls' ? 'red' : 'gray'}`}>{property.gender}</span>
                <span className="tag tag-gray">{property.type}</span>
              </div>
              <h1 className="detail-name">{property.name}</h1>
              <div className="detail-location"><FiMapPin size={15} />{property.address.street}, {property.address.area}, {property.address.city}</div>
              <div className="detail-rating-row">
                <div className="rating-badge"><FiStar size={12} fill="white" stroke="white" /> {property.rating}</div>
                <span className="detail-review-count">{property.reviewCount} reviews</span>
                <span className="detail-dot" />
                <span className="detail-enquiry">{property.enquiryCount}+ enquiries</span>
              </div>
            </div>
            <div className="detail-header-actions">
              <button className={`detail-action-btn${isSaved(property._id) ? ' saved' : ''}`} onClick={() => saveProperty(property._id)}>
                <FiHeart size={17} fill={isSaved(property._id) ? '#E63B2E' : 'none'} stroke={isSaved(property._id) ? '#E63B2E' : 'currentColor'} />
                {isSaved(property._id) ? 'Saved' : 'Save'}
              </button>
              <button className="detail-action-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
                <FiShare2 size={17} /> Share
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
            {['overview', 'amenities', 'location', 'reviews'].map(t => (
              <button key={t} className={`detail-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="detail-tab-content animate-in">
              <div className="detail-section">
                <h2 className="detail-section-title">About this property</h2>
                <p className="detail-desc">{property.description}</p>
              </div>
              <div className="detail-section">
                <h2 className="detail-section-title">Room types & pricing</h2>
                <div className="room-types">
                  {property.roomTypes?.map((r, i) => (
                    <div key={i} className="room-type-card">
                      <div className="room-type-header">
                        <span className="room-type-name">{r.type.charAt(0).toUpperCase() + r.type.slice(1)} Room</span>
                        <span className="room-type-price">₹{r.price.toLocaleString('en-IN')}<span>/mo</span></span>
                      </div>
                      <div className="room-type-meta">
                        <span className={`room-availability${r.availability === 0 ? ' full' : ''}`}>
                          {r.availability === 0 ? '❌ Full' : `✅ ${r.availability} available`}
                        </span>
                        <span>{r.totalRooms} total rooms</span>
                      </div>
                      {r.features?.length > 0 && (
                        <div className="room-features">{r.features.map(f => <span key={f} className="room-feature"><FiCheck size={11} />{f}</span>)}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {property.rules?.length > 0 && (
                <div className="detail-section">
                  <h2 className="detail-section-title">House rules</h2>
                  <div className="rules-list">
                    {property.rules.map((r, i) => <div key={i} className="rule-item"><span className="rule-dot" />{r}</div>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="detail-tab-content animate-in">
              <div className="detail-section">
                <h2 className="detail-section-title">All amenities</h2>
                <div className="amenities-grid">
                  {property.amenities?.map(a => (
                    <div key={a} className="amenity-item">
                      <span className="amenity-icon">{AMENITY_ICONS[a] || '✓'}</span>
                      <span className="amenity-label">{AMENITY_LABELS[a] || a}</span>
                    </div>
                  ))}
                </div>
                <div className="food-info">
                  <span className="food-label">Food type:</span>
                  <span className={`tag tag-${property.foodType === 'veg' ? 'green' : property.foodType === 'both' ? 'amber' : 'gray'}`}>{property.foodType === 'none' ? 'No mess' : property.foodType}</span>
                  {property.messIncluded && <span className="tag tag-green">Mess included</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="detail-tab-content animate-in">
              <div className="detail-section">
                <h2 className="detail-section-title">What's nearby</h2>
                {Object.entries(property.nearbyServices || {}).filter(([, v]) => v?.length > 0).map(([cat, items]) => (
                  <div key={cat} className="nearby-category">
                    <div className="nearby-cat-title">{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
                    <div className="nearby-items">
                      {items.map((item, i) => (
                        <div key={i} className="nearby-item">
                          <span className="nearby-name">{item.name}</span>
                          {item.distance && <span className="nearby-distance">{item.distance}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="detail-tab-content animate-in">
              <div className="detail-section">
                <div className="reviews-header">
                  <h2 className="detail-section-title">Student reviews ({reviews.length})</h2>
                  {user && <button className="btn btn-outline btn-sm" onClick={() => setShowReviewForm(!showReviewForm)}>Write a Review</button>}
                </div>
                {showReviewForm && (
                  <form className="review-form" onSubmit={handleReview}>
                    <div className="review-rating-select">
                      {[5,4,3,2,1].map(n => (
                        <button key={n} type="button" className={`star-btn${reviewForm.rating >= n ? ' active' : ''}`} onClick={() => setReviewForm(f => ({ ...f, rating: n }))}>★</button>
                      ))}
                    </div>
                    <input required placeholder="Review title" value={reviewForm.title} onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))} className="review-input" />
                    <textarea required placeholder="Share your experience..." rows={4} value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} className="review-textarea" />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button type="submit" className="btn btn-primary">Submit Review</button>
                      <button type="button" className="btn btn-outline" onClick={() => setShowReviewForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}
                {reviews.length === 0 ? (
                  <p className="no-reviews">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="reviews-list">
                    {reviews.map(r => (
                      <div key={r._id} className="review-card">
                        <div className="review-header">
                          <div className="review-avatar">{r.user?.name?.[0] || 'U'}</div>
                          <div>
                            <div className="review-user">{r.user?.name || 'Student'}</div>
                            <div className="review-college">{r.user?.college || ''}</div>
                          </div>
                          <div className="review-rating-badge">{'★'.repeat(r.rating)}</div>
                        </div>
                        <div className="review-title">{r.title}</div>
                        <p className="review-comment">{r.comment}</p>
                        {r.isVerifiedStay && <div className="review-verified"><FiCheck size={12} /> Verified stay</div>}
                        <div className="review-date">{new Date(r.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enquiry Sidebar */}
        <aside className="detail-sidebar">
          <div className="enquiry-card">
            <div className="enquiry-price">
              <span className="price-from">from</span>
              <span className="price-big">₹{property.priceRange?.min?.toLocaleString('en-IN')}</span>
              <span className="price-period">/month</span>
            </div>
            <div className="enquiry-deposit">₹{(property.priceRange?.min * property.depositMonths)?.toLocaleString('en-IN')} deposit · {property.depositMonths} month(s)</div>

            <button className="btn btn-whatsapp btn-lg enquiry-wa-btn" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.849L.057 23.886c-.07.264.162.497.426.426l6.037-1.469A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.806-.538-5.381-1.476l-.385-.228-3.99.97.99-3.9-.25-.395A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Chat on WhatsApp
            </button>
            <a href={`tel:+91${property.contactPhone}`} className="btn btn-outline btn-lg enquiry-call-btn"><FiPhone size={17} /> Call Owner</a>

            <div className="enquiry-divider"><span>or send an enquiry</span></div>

            <form onSubmit={handleEnquiry} className="enquiry-form">
              <input required placeholder="Your name" value={enquiryForm.name} onChange={e => setEnquiryForm(f => ({ ...f, name: e.target.value }))} />
              <input required placeholder="Your phone number" value={enquiryForm.phone} onChange={e => setEnquiryForm(f => ({ ...f, phone: e.target.value }))} />
              <textarea placeholder="Message (optional)" rows={3} value={enquiryForm.message} onChange={e => setEnquiryForm(f => ({ ...f, message: e.target.value }))} />
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>{submitting ? 'Sending...' : 'Send Enquiry'}</button>
            </form>

            <div className="enquiry-trust">
              {['Free to enquire', 'No broker fee', 'Owner responds in ~2 hrs'].map(t => <div key={t} className="enquiry-trust-item"><FiCheck size={13} />{t}</div>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}