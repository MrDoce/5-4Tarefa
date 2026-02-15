# Sistema de Notificações Real-time

Sistema simples de notificações em tempo real usando Node.js com Express e Socket.IO no backend e Angular no frontend.

## Como funciona

O backend tem um servidor Express na porta 3000 com Socket.IO. Tem um endpoint POST /notify que recebe notificações e emite pra todos os clientes conectados via WebSocket.

O frontend Angular conecta no Socket.IO quando inicia e fica escutando eventos. Quando recebe uma notificação, mostra um toast e adiciona no histórico.

## Como rodar

Backend:
- cd backend
- npm install
- npm start
- roda na porta 3000

Frontend:
- cd frontend  
- npm install
- npm start
- abre em localhost:4200

Pra testar, só clicar no botão de teste na interface ou fazer um POST pra http://localhost:3000/notify com:
```json
{
  "title": "titulo",
  "message": "mensagem",
  "type": "info"
}
