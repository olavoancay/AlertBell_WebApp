const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
