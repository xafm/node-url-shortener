const mongoose = require('mongoose');

const urlScheme = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0
    }
  }
);

const Url = mongoose.model('Url', urlScheme);
module.exports = Url;
