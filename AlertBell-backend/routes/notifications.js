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

// Rota para deletar uma notificação
router.delete('/:id', async (req, res) => {
  try {
    const notif = await notification.findByIdAndDelete(req.params.id);
    if (!notif) {
      return res.status(404).send({ error: "Notificação não encontrada" });
    }
    res.status(200).json({message: "Notificação excluída com sucesso"}); // No Content
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
