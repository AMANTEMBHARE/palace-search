const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Property = require('./models/Property');
const City = require('./models/City');
const Review = require('./models/Review');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([User.deleteMany(), Property.deleteMany(), City.deleteMany(), Review.deleteMany()]);
  console.log('Cleared existing data');

  // Create users
  const admin = await User.create({ name: 'Nestra Admin', email: 'admin@nestra.in', password: 'admin123', role: 'admin', phone: '9000000000' });
  const owner1 = await User.create({ name: 'Rajesh Sharma', email: 'rajesh@owner.com', password: 'owner123', role: 'owner', phone: '9111111111' });
  const owner2 = await User.create({ name: 'Sunita Patil', email: 'sunita@owner.com', password: 'owner123', role: 'owner', phone: '9222222222' });
  const student1 = await User.create({ name: 'Arjun Singh', email: 'arjun@student.com', password: 'student123', role: 'student', college: 'VNIT Nagpur', city: 'Nagpur' });
  const student2 = await User.create({ name: 'Priya Mehta', email: 'priya@student.com', password: 'student123', role: 'student', college: 'LIT Nagpur', city: 'Nagpur' });
  console.log('Users created');

  // Create cities
  const cities = await City.insertMany([
    { name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra', propertyCount: 0, isActive: true, isFeatured: true, description: 'The Orange City — central India\'s student hub with top engineering and medical colleges.', popularAreas: [{ name: 'Dharampeth' }, { name: 'Ramdaspeth' }, { name: 'Sitabuldi' }, { name: 'Amravati Road' }], colleges: ['VNIT', 'BITS Nagpur', 'LIT', 'RCOEM', 'NIT Nagpur'] },
    { name: 'Pune', slug: 'pune', state: 'Maharashtra', propertyCount: 0, isActive: true, isFeatured: true, description: 'The Oxford of the East — India\'s fastest-growing student destination.', popularAreas: [{ name: 'Kothrud' }, { name: 'Viman Nagar' }, { name: 'Wakad' }], colleges: ['Symbiosis', 'COEP', 'MIT Pune', 'Fergusson College'] },
    { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', propertyCount: 0, isActive: true, isFeatured: true, description: 'India\'s tech capital with world-class colleges and startup ecosystem.', popularAreas: [{ name: 'Koramangala' }, { name: 'HSR Layout' }, { name: 'Indiranagar' }], colleges: ['IISc', 'PES University', 'RV College', 'BMS College'] },
    { name: 'Kota', slug: 'kota', state: 'Rajasthan', propertyCount: 0, isActive: true, isFeatured: false, description: 'India\'s coaching capital — home to lakhs of JEE and NEET aspirants.', popularAreas: [{ name: 'Talwandi' }, { name: 'Mahaveer Nagar' }], colleges: ['Allen', 'Resonance', 'Bansal Classes'] },
    { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana', propertyCount: 0, isActive: true, isFeatured: false, description: 'City of Pearls — booming with premier tech colleges and research institutes.', popularAreas: [{ name: 'Gachibowli' }, { name: 'Kondapur' }, { name: 'Kukatpally' }], colleges: ['BITS Hyderabad', 'IIIT Hyderabad', 'Osmania University'] },
  ]);
  console.log('Cities created');

  // Create properties
  const properties = await Property.insertMany([
    {
      name: 'Sunrise Boys PG Dharampeth',
      owner: owner1._id,
      type: 'pg',
      gender: 'boys',
      address: { street: '12, Palm Road', area: 'Dharampeth', city: 'Nagpur', state: 'Maharashtra', pincode: '440010', coordinates: { lat: 21.1458, lng: 79.0882 } },
      priceRange: { min: 5500, max: 8000 },
      roomTypes: [
        { type: 'single', price: 8000, availability: 3, totalRooms: 10, features: ['AC', 'Attached bath', 'Study table'] },
        { type: 'double', price: 6000, availability: 5, totalRooms: 15, features: ['Fan', 'Common bath'] },
        { type: 'triple', price: 5500, availability: 2, totalRooms: 8, features: ['Fan', 'Common bath'] },
      ],
      description: 'Premium PG accommodation in the heart of Dharampeth, just 1.2 km from VNIT. Modern facilities, hygienic home-cooked meals, and 24/7 security make it the top choice for engineering students.',
      images: [],
      amenities: ['wifi', 'mess', 'laundry', 'security', 'cctv', 'power_backup', 'hot_water', 'reading_room'],
      foodType: 'veg',
      messIncluded: true,
      rating: 4.7,
      reviewCount: 38,
      isVerified: true,
      isFeatured: true,
      verificationBadges: ['ID Verified', 'Photos Verified', 'Field Inspected'],
      enquiryCount: 124,
      contactPhone: '9111111111',
      contactWhatsapp: '9111111111',
      nearbyServices: {
        college: [{ name: 'VNIT Nagpur', distance: '1.2 km' }, { name: 'RCOEM', distance: '2.5 km' }],
        transport: [{ name: 'Dharampeth Bus Stop', distance: '200 m' }, { name: 'Nagpur Metro', distance: '800 m' }],
        medical: [{ name: 'Orange City Hospital', distance: '500 m' }],
        food: [{ name: 'Dominos', distance: '300 m' }, { name: 'Haldiram\'s', distance: '400 m' }],
        atm: [{ name: 'SBI ATM', distance: '150 m' }, { name: 'HDFC ATM', distance: '300 m' }],
      },
      rules: ['No smoking/alcohol', 'Guests allowed till 9 PM', 'Silent hours after 10 PM'],
      depositMonths: 2,
    },
    {
      name: 'Harmony Girls Hostel Ramdaspeth',
      owner: owner2._id,
      type: 'hostel',
      gender: 'girls',
      address: { street: '8, Ring Road', area: 'Ramdaspeth', city: 'Nagpur', state: 'Maharashtra', pincode: '440010', coordinates: { lat: 21.1524, lng: 79.0920 } },
      priceRange: { min: 6500, max: 9500 },
      roomTypes: [
        { type: 'single', price: 9500, availability: 2, totalRooms: 12, features: ['AC', 'Attached bath', 'Wardrobe'] },
        { type: 'double', price: 7500, availability: 4, totalRooms: 20, features: ['AC', 'Common bath'] },
      ],
      description: 'Safe and premium girls hostel in Ramdaspeth. Close to LIT and Law College. Female security staff, biometric entry, CCTV, and nutritious meals. Parents\' first choice in Nagpur.',
      images: [],
      amenities: ['wifi', 'ac', 'mess', 'security', 'cctv', 'hot_water', 'housekeeping', 'power_backup', 'water_purifier'],
      foodType: 'veg',
      messIncluded: true,
      rating: 4.8,
      reviewCount: 54,
      isVerified: true,
      isFeatured: true,
      verificationBadges: ['ID Verified', 'Photos Verified', 'Field Inspected', 'Safety Certified'],
      enquiryCount: 189,
      contactPhone: '9222222222',
      contactWhatsapp: '9222222222',
      nearbyServices: {
        college: [{ name: 'LIT Nagpur', distance: '0.8 km' }, { name: 'Nagpur Law College', distance: '1.1 km' }],
        transport: [{ name: 'Ramdaspeth Bus Stop', distance: '100 m' }],
        medical: [{ name: 'Lata Mangeshkar Hospital', distance: '600 m' }],
        food: [{ name: 'Café Coffee Day', distance: '200 m' }],
        atm: [{ name: 'ICICI ATM', distance: '250 m' }],
      },
      rules: ['Girls only', 'Visitors allowed in common area', 'Gate closes at 10 PM', 'No outside food in rooms'],
      depositMonths: 2,
    },
    {
      name: 'Budget Stay Sitabuldi',
      owner: owner1._id,
      type: 'pg',
      gender: 'boys',
      address: { street: '45, Central Avenue', area: 'Sitabuldi', city: 'Nagpur', state: 'Maharashtra', pincode: '440012', coordinates: { lat: 21.1463, lng: 79.0825 } },
      priceRange: { min: 3800, max: 5500 },
      roomTypes: [
        { type: 'double', price: 5000, availability: 8, totalRooms: 20, features: ['Fan', 'Common bath'] },
        { type: 'triple', price: 3800, availability: 10, totalRooms: 15, features: ['Fan', 'Common bath'] },
      ],
      description: 'Affordable student accommodation near Sitabuldi metro and coaching institutes. Best value PG in central Nagpur. Tiffin service available nearby.',
      images: [],
      amenities: ['wifi', 'security', 'power_backup', 'water_purifier', 'parking'],
      foodType: 'none',
      messIncluded: false,
      rating: 4.3,
      reviewCount: 21,
      isVerified: true,
      isFeatured: false,
      verificationBadges: ['ID Verified', 'Field Inspected'],
      enquiryCount: 67,
      contactPhone: '9111111111',
      contactWhatsapp: '9111111111',
      nearbyServices: {
        college: [{ name: 'RCOEM', distance: '3 km' }, { name: 'Nagpur University', distance: '2 km' }],
        transport: [{ name: 'Sitabuldi Metro', distance: '300 m' }],
        food: [{ name: 'Local Mess', distance: '100 m' }],
        atm: [{ name: 'Multiple ATMs', distance: '50 m' }],
      },
      rules: ['No smoking', 'Guests till 8 PM'],
      depositMonths: 1,
    },
    {
      name: 'Elite Co-Living Koramangala',
      owner: owner2._id,
      type: 'pg',
      gender: 'co-ed',
      address: { street: '3rd Block, 5th Cross', area: 'Koramangala', city: 'Bangalore', state: 'Karnataka', pincode: '560034', coordinates: { lat: 12.9352, lng: 77.6245 } },
      priceRange: { min: 9000, max: 15000 },
      roomTypes: [
        { type: 'single', price: 15000, availability: 4, totalRooms: 20, features: ['AC', 'Attached bath', 'Work desk', 'Netflix'] },
        { type: 'double', price: 11000, availability: 6, totalRooms: 25, features: ['AC', 'Common bath', 'Work desk'] },
      ],
      description: 'Premium co-living space in the heart of Koramangala. High-speed internet, fully furnished rooms, and a vibrant student community. Walking distance to PES University and tech parks.',
      images: [],
      amenities: ['wifi', 'ac', 'gym', 'laundry', 'security', 'cctv', 'housekeeping', 'power_backup', 'tv', 'reading_room'],
      foodType: 'both',
      messIncluded: true,
      rating: 4.6,
      reviewCount: 72,
      isVerified: true,
      isFeatured: true,
      verificationBadges: ['ID Verified', 'Photos Verified', 'Field Inspected'],
      enquiryCount: 210,
      contactPhone: '9222222222',
      contactWhatsapp: '9222222222',
      nearbyServices: {
        college: [{ name: 'PES University', distance: '1.5 km' }, { name: 'Christ University', distance: '2 km' }],
        transport: [{ name: 'Koramangala Bus Stop', distance: '200 m' }],
        medical: [{ name: 'Manipal Hospital', distance: '1 km' }],
        food: [{ name: 'Multiple restaurants', distance: '100 m' }],
        atm: [{ name: 'Multiple ATMs', distance: '200 m' }],
      },
      rules: ['No loud music after 11 PM', 'Guests with prior intimation'],
      depositMonths: 2,
    },
    {
      name: 'Scholar Den Talwandi Kota',
      owner: owner1._id,
      type: 'hostel',
      gender: 'boys',
      address: { street: 'Near Allen Institute', area: 'Talwandi', city: 'Kota', state: 'Rajasthan', pincode: '324005', coordinates: { lat: 25.1462, lng: 75.8523 } },
      priceRange: { min: 4500, max: 7000 },
      roomTypes: [
        { type: 'single', price: 7000, availability: 5, totalRooms: 15, features: ['AC', 'Study table', 'Bookshelf'] },
        { type: 'double', price: 5500, availability: 8, totalRooms: 20, features: ['AC', 'Study table'] },
        { type: 'triple', price: 4500, availability: 6, totalRooms: 10, features: ['Fan', 'Study table'] },
      ],
      description: 'Purpose-built for JEE/NEET aspirants in Kota. Dedicated study hall open 24/7, nutritious meals, and a focused learning environment. Just 200m from Allen Institute.',
      images: [],
      amenities: ['wifi', 'ac', 'mess', 'security', 'cctv', 'reading_room', 'power_backup', 'hot_water', 'water_purifier'],
      foodType: 'veg',
      messIncluded: true,
      rating: 4.5,
      reviewCount: 43,
      isVerified: true,
      isFeatured: true,
      verificationBadges: ['ID Verified', 'Photos Verified', 'Field Inspected'],
      enquiryCount: 156,
      contactPhone: '9111111111',
      contactWhatsapp: '9111111111',
      nearbyServices: {
        college: [{ name: 'Allen Institute', distance: '200 m' }, { name: 'Resonance', distance: '500 m' }],
        transport: [{ name: 'Kota Bus Stand', distance: '2 km' }],
        medical: [{ name: 'MB Hospital', distance: '1.5 km' }],
        food: [{ name: 'Mess included', distance: '0 m' }],
        atm: [{ name: 'SBI ATM', distance: '300 m' }],
      },
      rules: ['Study hours 6 AM–10 PM', 'No mobile use during study hours', 'Lights out by 11 PM'],
      depositMonths: 1,
    },
    {
      name: 'Green View PG Viman Nagar',
      owner: owner2._id,
      type: 'pg',
      gender: 'girls',
      address: { street: 'Clover Park Road', area: 'Viman Nagar', city: 'Pune', state: 'Maharashtra', pincode: '411014', coordinates: { lat: 18.5679, lng: 73.9143 } },
      priceRange: { min: 7000, max: 12000 },
      roomTypes: [
        { type: 'single', price: 12000, availability: 3, totalRooms: 12, features: ['AC', 'Attached bath', 'Balcony'] },
        { type: 'double', price: 8500, availability: 5, totalRooms: 18, features: ['AC', 'Common bath'] },
      ],
      description: 'Upscale girls PG near Symbiosis International University and airport. Professional environment for college students and working women. Fully furnished with all utilities included.',
      images: [],
      amenities: ['wifi', 'ac', 'laundry', 'security', 'cctv', 'housekeeping', 'power_backup', 'gym', 'hot_water'],
      foodType: 'veg',
      messIncluded: false,
      rating: 4.4,
      reviewCount: 31,
      isVerified: true,
      isFeatured: false,
      verificationBadges: ['ID Verified', 'Photos Verified'],
      enquiryCount: 98,
      contactPhone: '9222222222',
      contactWhatsapp: '9222222222',
      nearbyServices: {
        college: [{ name: 'Symbiosis', distance: '2 km' }, { name: 'MIT Pune', distance: '3 km' }],
        transport: [{ name: 'Viman Nagar Bus Stop', distance: '300 m' }],
        medical: [{ name: 'Columbia Asia Hospital', distance: '1 km' }],
        food: [{ name: 'Food court', distance: '500 m' }],
        atm: [{ name: 'Axis ATM', distance: '200 m' }],
      },
      rules: ['Girls only', 'Visitors in common area only', 'Gate closes at 10:30 PM'],
      depositMonths: 2,
    },
  ]);
  console.log('Properties created');

  // Update city property counts
  await City.findOneAndUpdate({ slug: 'nagpur' }, { propertyCount: 3 });
  await City.findOneAndUpdate({ slug: 'bangalore' }, { propertyCount: 1 });
  await City.findOneAndUpdate({ slug: 'kota' }, { propertyCount: 1 });
  await City.findOneAndUpdate({ slug: 'pune' }, { propertyCount: 1 });

  // Create reviews
  await Review.insertMany([
    { property: properties[0]._id, user: student1._id, rating: 5, title: 'Best PG near VNIT!', comment: 'The mess food is excellent and the reading room helps a lot during exams. Owner is very cooperative. Highly recommend to all VNIT students.', categories: { cleanliness: 5, safety: 5, amenities: 5, location: 5, valueForMoney: 4 }, isVerifiedStay: true },
    { property: properties[0]._id, user: student2._id, rating: 4, title: 'Great value for money', comment: 'Good location, clean rooms, and responsive management. Wi-Fi speed could be better. Overall very happy with my stay.', categories: { cleanliness: 4, safety: 5, amenities: 4, location: 5, valueForMoney: 5 }, isVerifiedStay: true },
    { property: properties[1]._id, user: student2._id, rating: 5, title: 'Parents chose this, I love it!', comment: 'My parents specifically chose Harmony because of the safety features. Biometric entry, female security guard, and the warden is very helpful. Food is amazing.', categories: { cleanliness: 5, safety: 5, amenities: 4, location: 4, valueForMoney: 4 }, isVerifiedStay: true },
  ]);
  console.log('Reviews created');

  console.log('\n✅ Seed complete!');
  console.log('📧 Admin: admin@nestra.in / admin123');
  console.log('🏠 Owner: rajesh@owner.com / owner123');
  console.log('🎓 Student: arjun@student.com / student123');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
