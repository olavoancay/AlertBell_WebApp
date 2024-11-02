const mongoose = require('mongoose');
const moment = require('moment');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    default: () => moment().format('DD/MM/YYYY'), // Formato de data
  },
  time: {
    type: String,
    default: () => moment().format('HH:mm:ss'), // Formato de hora
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
