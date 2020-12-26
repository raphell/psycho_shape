const express = require('express');
var cors = require('cors');
const app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = 3000

var speed = 1.0;
var g_rotation = 0.0;
var s_rotation = 0.0;
var drunk_shape = 1.0;
var breath_effect = 0.0;
var divs_number = null;
var blur_effect = 0.1;

app.use(cors());

app.use('/js', express.static(__dirname));

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/display', function(req, res, next) {
    res.sendFile(__dirname + '/display.html');
});

io.on('connection', function(client) {
    console.log('Client connected....');
    client.on('join', function(data) {
      let res_data;
      switch (data.type) {
        case 'reload':
          res_data = {
            type: 'reload',
            value: null,
          }
          client.broadcast.emit('broad',res_data);
          break;
        case 's+':
          speed++;
          res_data = {
            type: 's+',
            value: speed,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 's-':
          speed--;
          res_data = {
            type: 's-',
            value: speed,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'd':
          console.log('in get the divs');
          divs_number = data.value;
          res_data = {
            type: 'd',
            value: data.value,
          }
          client.broadcast.emit('messages',res_data);
          break;
        case 'd+':
        divs_number++;
          res_data = {
            type: 'd+',
            value: divs_number,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'd-':
          divs_number--;
          res_data = {
            type: 'd-',
            value: divs_number,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        case 'g_r+':
          g_rotation += 0.0001;
          res_data = {
            type: 'g_r+',
            value: g_rotation,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'g_r-':
          g_rotation -= 0.0001;
          res_data = {
            type: 'g_r-',
            value: g_rotation,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        case 's_r+':
          s_rotation += 0.0001;
          res_data = {
            type: 's_r+',
            value: s_rotation,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 's_r-':
          s_rotation -= 0.0001;
          res_data = {
            type: 's_r-',
            value: s_rotation,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        case 'b+':
          breath_effect += 0.1;
          res_data = {
            type: 'b+',
            value: breath_effect,
          };
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'b-':
          breath_effect -= 0.1;
          res_data = {
            type: 'b-',
            value: breath_effect,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        case 'drunk+':
          drunk_shape++;
          res_data = {
            type: 'd+',
            value: drunk_shape,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'drunk-':
          drunk_shape--;
          res_data = {
            type: 'd-',
            value: drunk_shape,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        case 'blur+':
          blur_effect += 0.05;
          res_data = {
            type: 'blur+',
            value: blur_effect,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;
        case 'blur-':
          blur_effect -= 0.05;
          res_data = {
            type: 'blur-',
            value: blur_effect,
          }
          client.emit('messages', res_data);
          client.broadcast.emit('broad',res_data);
          break;

        default:

      }

    });
});

server.listen(4200);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
