const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = 3000;

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

app.post('/notify', (req, res) => {
  const { title, message, type } = req.body;
  
  if (!title || !message) {
    return res.status(400).json({ error: 'Title e message são obrigatórios' });
  }
  
  const notification = {
    title,
    message,
    type: type || 'info',
    timestamp: new Date().toISOString()
  };
  
  io.emit('notification', notification);
  
  res.json({ success: true, notification });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
