import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiX, FiChevronDown } from 'react-icons/fi';
import api from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import './SearchPage.css';

const AMENITY_OPTIONS = ['wifi','ac','mess','laundry','security','cctv','gym','reading_room','power_backup','hot_water','parking','housekeeping'];
const AMENITY_LABELS = { wifi:'Wi-Fi', ac:'AC', mess:'Mess/Meals', laundry:'Laundry', security:'24×7 Security', cctv:'CCTV', gym:'Gym', reading_room:'Study Room', power_backup:'Power Backup', hot_water:'Hot Water', parking:'Parking', housekeeping:'Housekeeping' };

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    gender: searchParams.get('gender') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    amenities: searchParams.get('amenities') || '',
    verified: searchParams.get('verified') || '',
    page: Number(searchParams.get('page')) || 1,
    sort: searchParams.get('sort') || '-createdAt',
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== null));
      const { data } = await api.get('/properties', { params });
      setProperties(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const updateFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value, page: 1 }));
  };

  const toggleAmenity = (a) => {
    const arr = filters.amenities ? filters.amenities.split(',').filter(Boolean) : [];
    const idx = arr.indexOf(a);
    if (idx === -1) arr.push(a); else arr.splice(idx, 1);
    updateFilter('amenities', arr.join(','));
  };

  const clearFilters = () => setFilters({ city: '', search: '', type: '', gender: '', minPrice: '', maxPrice: '', amenities: '', verified: '', page: 1, sort: '-createdAt' });

  const activeCount = [filters.type, filters.gender, filters.verified, filters.amenities].filter(Boolean).length + (filters.minPrice || filters.maxPrice ? 1 : 0);

  return (
    <div className="search-page">
      {/* TOP BAR */}
      <div className="search-topbar">
        <div className="container search-topbar-inner">
          <div className="search-topbar-left">
            <div className="search-inline-form">
              <input
                type="text" placeholder="Search city, area, college..."
                value={filters.search} onChange={e => updateFilter('search', e.target.value)}
                className="search-inline-input"
              />
              <select value={filters.city} onChange={e => updateFilter('city', e.target.value)} className="search-inline-select">
                <option value="">All Cities</option>
                {['Nagpur','Pune','Bangalore','Kota','Hyderabad'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="search-topbar-right">
            <button className={`search-filter-btn${activeCount > 0 ? ' active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}>
              <FiFilter size={15} />Filters{activeCount > 0 && <span className="filter-count">{activeCount}</span>}
            </button>
            <select value={filters.sort} onChange={e => updateFilter('sort', e.target.value)} className="search-sort-select">
              <option value="-createdAt">Newest first</option>
              <option value="-rating">Highest rated</option>
              <option value="priceRange.min">Price: Low to High</option>
              <option value="-priceRange.min">Price: High to Low</option>
            </select>
            <div className="view-toggle">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><FiGrid size={16} /></button>
              <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><FiList size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container search-layout">
        {/* FILTERS PANEL */}
        <aside className={`filters-panel${filtersOpen ? ' open' : ''}`}>
          <div className="filters-header">
            <span className="filters-title">Filters</span>
            {activeCount > 0 && <button onClick={clearFilters} className="filters-clear"><FiX size={14} /> Clear all</button>}
          </div>

          {/* Type */}
          <div className="filter-group">
            <div className="filter-group-title">Property Type <FiChevronDown size={14} /></div>
            <div className="filter-options">
              {[['', 'All Types'], ['pg', 'PG'], ['hostel', 'Hostel'], ['flat', 'Flat'], ['mess', 'Mess']].map(([v, l]) => (
                <label key={v} className={`filter-option${filters.type === v ? ' selected' : ''}`}>
                  <input type="radio" name="type" value={v} checked={filters.type === v} onChange={() => updateFilter('type', v)} />
                  {l}
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="filter-group">
            <div className="filter-group-title">For <FiChevronDown size={14} /></div>
            <div className="filter-options">
              {[['', 'All'], ['boys', 'Boys'], ['girls', 'Girls'], ['co-ed', 'Co-ed']].map(([v, l]) => (
                <label key={v} className={`filter-option${filters.gender === v ? ' selected' : ''}`}>
                  <input type="radio" name="gender" value={v} checked={filters.gender === v} onChange={() => updateFilter('gender', v)} />
                  {l}
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="filter-group">
            <div className="filter-group-title">Budget (₹/month)</div>
            <div className="filter-budget">
              <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} />
              <span>–</span>
              <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} />
            </div>
            <div className="filter-options" style={{ marginTop: 8 }}>
              {[['5000','Under ₹5k'], ['8000','Under ₹8k'], ['12000','Under ₹12k']].map(([v, l]) => (
                <label key={v} className={`filter-option${filters.maxPrice === v ? ' selected' : ''}`}>
                  <input type="radio" name="maxPrice" value={v} checked={filters.maxPrice === v} onChange={() => updateFilter('maxPrice', v)} />
                  {l}
                </label>
              ))}
            </div>
          </div>

          {/* Verified */}
          <div className="filter-group">
            <div className="filter-group-title">Verification</div>
            <label className={`filter-option filter-option--check${filters.verified === 'true' ? ' selected' : ''}`}>
              <input type="checkbox" checked={filters.verified === 'true'} onChange={e => updateFilter('verified', e.target.checked ? 'true' : '')} />
              <span>✓</span> Nestra Verified only
            </label>
          </div>

          {/* Amenities */}
          <div className="filter-group">
            <div className="filter-group-title">Amenities</div>
            <div className="filter-amenities">
              {AMENITY_OPTIONS.map(a => {
                const selected = filters.amenities?.split(',').includes(a);
                return (
                  <button key={a} className={`filter-amenity${selected ? ' selected' : ''}`} onClick={() => toggleAmenity(a)}>
                    {AMENITY_LABELS[a]}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RESULTS */}
        <main className="search-results">
          <div className="results-header">
            <div className="results-count">
              {loading ? 'Searching...' : <><strong>{total}</strong> properties found{filters.city ? ` in ${filters.city}` : ''}</>}
            </div>
          </div>

          {loading ? (
            <div className={view === 'grid' ? 'grid-3' : 'list-view'}>
              {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: 360, borderRadius: 14 }} />)}
            </div>
          ) : properties.length === 0 ? (
            <div className="no-results">
              <div style={{ fontSize: 56 }}>🏠</div>
              <h3>No properties found</h3>
              <p>Try changing your filters or search in a different city.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className={view === 'grid' ? 'grid-3' : 'list-view'}>
                {properties.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`page-btn${filters.page === p ? ' active' : ''}`} onClick={() => setFilters(f => ({ ...f, page: p }))}>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}