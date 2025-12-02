const mongoose = require('mongoose');

// Schema for Celebrity Sightings
const sightingSchema = new mongoose.Schema({
  celebName: String,
  locationName: String,
  coordinates: { x: Number, y: Number },
  timestamp: { type: Date, default: Date.now },
  description: String
});

// Schema for Calendar Events
const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // Stored as string for display flexibility or Date object
  type: { type: String, enum: ['Award', 'Release', 'Event'] }
});

// Schema for Fashion Battle
const fashionBattleSchema = new mongoose.Schema({
  title: String,
  contender1: { name: String, imageUrl: String, votes: { type: Number, default: 0 } },
  contender2: { name: String, imageUrl: String, votes: { type: Number, default: 0 } }
});

// Main Widget Model to hold these collections
// Note: In a larger app, these would be separate collections. 
// Here we export separate models for clarity.

const Sighting = mongoose.model('Sighting', sightingSchema);
const CalendarEvent = mongoose.model('CalendarEvent', eventSchema);
const FashionBattle = mongoose.model('FashionBattle', fashionBattleSchema);

module.exports = { Sighting, CalendarEvent, FashionBattle };