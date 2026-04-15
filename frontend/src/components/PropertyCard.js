import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiMapPin, FiStar, FiWifi, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './PropertyCard.css';

const AMENITY_ICONS = { wifi: '📶', ac: '❄️', mess: '🍽️', laundry: '👕', security: '🔒', gym: '💪', parking: '🅿️', reading_room: '📚' };

const PLACEHOLDER_COLORS = [
  ['#1C2B4A','#2E4480'], ['#7C3AED','#A855F7'], ['#0D9488','#14B8A6'],
  ['#DC2626','#EF4444'], ['#D97706','#F59E0B'], ['#059669','#10B981'],
];

export default function PropertyCard({ property, index = 0 }) {
  const navigate = useNavigate();
  const { saveProperty, isSaved } = useAuth();
  const saved = isSaved(property._id);
  const [g1, g2] = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const handleSave = (e) => { e.stopPropagation(); saveProperty(property._id); };
  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(`Hi, I found ${property.name} on Nestra and I'm interested. Can you share more details?`);
    window.open(`https://wa.me/91${property.contactWhatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="property-card" onClick={() => navigate(`/property/${property._id}`)}>
      {/* Image / Placeholder */}
      <div className="property-card-img" style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}>
        {property.thumbnail ? (
          <img src={property.thumbnail} alt={property.name} />
        ) : (
          <div className="property-card-placeholder">
            <svg viewBox="0 0 60 60" fill="none" width="48" height="48">
              <path d="M30 8L52 20V52H38V36H22V52H8V20L30 8Z" fill="white" opacity="0.2"/>
              <path d="M30 8L52 20V52H38V36H22V52H8V20L30 8Z" stroke="white" strokeWidth="2" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </div>
        )}
        {/* Overlays */}
        <div className="property-card-overlay">
          {property.isVerified && <div className="property-card-verified"><span>✓</span> Nestra Verified</div>}
          <button className={`property-card-save${saved ? ' saved' : ''}`} onClick={handleSave}>
            <FiHeart size={16} fill={saved ? 'white' : 'none'} />
          </button>
        </div>
        {property.isFeatured && <div className="property-card-featured">Featured</div>}
        <div className="property-card-gender" data-gender={property.gender}>{property.gender}</div>
      </div>

      {/* Body */}
      <div className="property-card-body">
        <div className="property-card-meta">
          <div className="property-card-location"><FiMapPin size={12} />{property.address.area}, {property.address.city}</div>
          <div className="property-card-rating">
            <FiStar size={12} fill="#F5A623" stroke="#F5A623" />
            <span>{property.rating}</span>
            <span className="property-card-reviews">({property.reviewCount})</span>
          </div>
        </div>

        <h3 className="property-card-name">{property.name}</h3>

        {/* Amenities */}
        <div className="property-card-amenities">
          {property.amenities?.slice(0, 4).map(a => (
            <span key={a} className="property-card-amenity" title={a}>{AMENITY_ICONS[a] || '•'}</span>
          ))}
          {property.amenities?.length > 4 && <span className="property-card-amenity-more">+{property.amenities.length - 4}</span>}
        </div>

        {/* Price + CTA */}
        <div className="property-card-footer">
          <div className="property-card-price">
            <span className="price-from">from</span>
            <span className="price-value">₹{property.priceRange?.min?.toLocaleString('en-IN')}</span>
            <span className="price-period">/mo</span>
          </div>
          <button className="property-card-wa" onClick={handleWhatsApp}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.849L.057 23.886c-.07.264.162.497.426.426l6.037-1.469A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.806-.538-5.381-1.476l-.385-.228-3.99.97.99-3.9-.25-.395A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp
          </button>
        </div>

        {property.enquiryCount > 10 && (
          <div className="property-card-social-proof">🔥 {property.enquiryCount}+ students enquired this month</div>
        )}
      </div>
    </div>
  );
}