var WebSocket = require('../../index');
var ws = new WebSocket('ws://localhost:8080/', {
  protocolVersion: 8,
  origin: 'http://websocket.org',
  headers: {
    cookie: 'auth=2; '
  }
});

ws.on('error', function (err) {
  console.log(err);
});

ws.on('close', function close() {
  console.log('disconnected');
});
