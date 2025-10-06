import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import { Server as SocketIO } from 'socket.io';
dotenv.config();

const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET','POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('send-message', (msg) => {
    // broadcast to room
    io.to(msg.room).emit('receive-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => server.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.error(err));
