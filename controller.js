var io = require('socket.io')(server);

function start () {
  var win = window.open('./display.html');
}

var socket = io.connect('http://localhost:4200');
socket.on('connect', function(data) {
  console.log('In Join global');
});

function moreSpeed() {
  console.log('In more speed');
    socket.emit('join', '+');
}

function lessSpeed() {
  console.log('In less speed');
  socket.emit('join', '-');
}

socket.on('messages', function(data) {
  alert(data);
});
