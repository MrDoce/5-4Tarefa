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


## Reflexão Técnica

A principal diferença entre WebSockets e HTTP é que HTTP é request-response, ou seja, o cliente sempre precisa pedir algo pro servidor. Com WebSockets você mantém uma conexão aberta e o servidor pode enviar dados proativamente sem o cliente precisar ficar fazendo requisições. Isso é essencial pra coisas em tempo real tipo chat, notificações, dashboards que atualizam sozinhos, etc. A latência também é menor porque não tem o overhead de criar uma nova conexão HTTP toda vez.

Escalar aplicações WebSocket é mais complicado que HTTP porque cada conexão mantém estado no servidor. Se você tem vários servidores, um cliente conectado no servidor A não vai receber mensagens que foram enviadas pelo servidor B. Precisa usar algo tipo Redis Pub/Sub ou message brokers pra sincronizar entre as instâncias. Também tem que lidar com reconexões quando a rede cai ou o servidor reinicia.

Socket.IO tem várias vantagens sobre WebSockets puros. Primeiro, ele faz fallback automático pra polling se WebSocket não funcionar, então funciona até em ambientes mais restritivos. Segundo, já vem com várias features prontas tipo rooms, namespaces, reconexão automática que você teria que implementar na mão com WebSockets puros. Terceiro, a API é mais simples e consistente. Quarto, tem acknowledgments, eventos customizados, compressão, etc. A comunidade também é grande e tem bastante documentação. A única desvantagem é um pouco mais de overhead comparado com WebSockets puros, mas pra maioria dos casos vale a pena pela facilidade.
