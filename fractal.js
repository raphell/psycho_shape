var io = require('socket.io')(server);

function start () {
  var win = window.open('./test.html');
}

function moreSpeed() {
  item_speed += 0.1;
  console.log('ITEM SPEEEED : '+item_speed);

}

function color() {

  console.log('ITEM COLOR : '+item_speed);

}

function lessSpeed() {
  item_speed -= 0.1;
  console.log('ITEM SPEEEED : '+item_speed);

}

function reload(){

  init();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}
