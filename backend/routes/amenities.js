const express = require('express');
const router = express.Router();

const AMENITIES = [
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi', category: 'connectivity' },
  { id: 'ac', label: 'Air Conditioning', icon: 'wind', category: 'comfort' },
  { id: 'mess', label: 'Mess / Meals', icon: 'utensils', category: 'food' },
  { id: 'laundry', label: 'Laundry', icon: 'shirt', category: 'utilities' },
  { id: 'parking', label: 'Parking', icon: 'car', category: 'utilities' },
  { id: 'security', label: '24x7 Security', icon: 'shield', category: 'safety' },
  { id: 'cctv', label: 'CCTV', icon: 'camera', category: 'safety' },
  { id: 'gym', label: 'Gym', icon: 'dumbbell', category: 'fitness' },
  { id: 'reading_room', label: 'Reading Room', icon: 'book', category: 'study' },
  { id: 'power_backup', label: 'Power Backup', icon: 'zap', category: 'utilities' },
  { id: 'water_purifier', label: 'Water Purifier', icon: 'droplets', category: 'utilities' },
  { id: 'tv', label: 'TV / Common Room', icon: 'tv', category: 'entertainment' },
  { id: 'fridge', label: 'Refrigerator', icon: 'box', category: 'appliances' },
  { id: 'attached_bath', label: 'Attached Bathroom', icon: 'bath', category: 'comfort' },
  { id: 'hot_water', label: 'Hot Water', icon: 'flame', category: 'comfort' },
  { id: 'housekeeping', label: 'Housekeeping', icon: 'sparkles', category: 'utilities' },
];

router.get('/', (req, res) => {
  res.json({ success: true, data: AMENITIES });
});

module.exports = router;