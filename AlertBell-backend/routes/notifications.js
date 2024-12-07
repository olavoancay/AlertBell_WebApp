const express = require('express');
const router = express.Router();
const moment = require('moment');
const Notification = require('../models/notification'); // Importando o modelo corretamente

// Rota para registrar nova notificação
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const newNotification = new Notification({
      message,
      date: moment().format('DD/MM/YYYY'), // Formatação da data
      time: moment().format('HH:mm:ss'),    // Formatação do horário
    });
    await newNotification.save();
    res.status(201).json({ message: 'Notification saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save notification' });
  }
});

// Rota para obter o histórico de notificações
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
});

// Rota para deletar uma notificação
router.delete('/:id', async (req, res) => {
  try {
    const notif = await Notification.findByIdAndDelete(req.params.id);
    if (!notif) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }
    res.status(200).json({ message: "Notificação excluída com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

router.get('/graph-data', async (req, res) => {
  try {
    const data = await Notification.aggregate([
      {
        $group: {
          _id: '$message',
          count: { $sum: 1 },
        },
      },
    ]);

    const graphData = {
      'Presença Detectada': 0,
      'Campainha Pressionada': 0,
    };

    data.forEach((item) => {
      if (item._id === 'presença detectada') {
        graphData['Presença Detectada'] = item.count;
      } else if (item._id === 'campainha pressionada') {
        graphData['Campainha Pressionada'] = item.count;
      }
    });

    res.json(graphData);
  } catch (error) {
    console.error('Erro ao buscar dados para o gráfico:', error);
    res.status(500).send('Erro ao buscar dados para o gráfico');
  }
});

module.exports = router;
