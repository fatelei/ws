var WebSocketServer = require('../../index').Server;

var auth = function (req, callback) {
  // You can check cookie here.
  // If the connection is invalid,
  // the server will return 403 response.
  if (req.headers.cookie === undefined) {
    return callback(new Error('invalid connection'));
  }

  var cookie = req.headers.cookie;
  var list = {};

  cookie.split(';').forEach(function (v) {
    var parts = v.split('=');
    if (parts.length >= 2) {
      list[parts.shift().trim()] = parts.shift().trim();
    }
  });

  if (list.auth === undefined) {
    return callback(new Error('invalid connection'));
  }

  if (list.auth === '1') {
    return callback(null, null);
  }

  return callback(new Error('invalid connection'));
};


var wss = new WebSocketServer({ port: 8080, auth: auth });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
