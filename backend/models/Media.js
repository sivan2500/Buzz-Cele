const mongoose = require('mongoose');

const radioStationSchema = mongoose.Schema({
  name: { type: String, required: true },
  genre: String,
  language: String, // EN, ES, KR, etc.
  streamUrl: { type: String, required: true },
  logoColor: String // e.g., 'bg-brand-500'
});

const tvChannelSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: String, // News, Sports, etc.
  logo: String, // URL to logo image
  description: String,
  stream: { type: String, required: true } // HLS Stream URL
});

const RadioStation = mongoose.model('RadioStation', radioStationSchema);
const TVChannel = mongoose.model('TVChannel', tvChannelSchema);

module.exports = { RadioStation, TVChannel };