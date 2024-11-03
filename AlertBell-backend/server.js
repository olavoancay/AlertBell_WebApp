const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const notificationsRoute = require('./routes/notifications');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB
connectDB();

// Iniciar o app
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());


// Rotas
app.use('/api/notifications', notificationsRoute);

// Porta
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
