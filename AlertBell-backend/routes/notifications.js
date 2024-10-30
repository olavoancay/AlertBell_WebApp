const express = require('express');
const router = express.Router();
const notification = require('../models/notification.js');

// Rota para registrar nova notificação
router.post('/', async (req, res) => {
  try {
    const newNotification = new notification();
    await newNotification.save();
    res.status(201).json({ message: 'Notification saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save notification' });
  }
});

// Rota para obter o histórico de notificações
router.get('/', async (req, res) => {
  try {
    const notifications = await notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
});

module.exports = router;
