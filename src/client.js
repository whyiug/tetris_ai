var net = require('net');   //引入网络模块
var HOST = '192.168.0.141';     //定义服务器地址
var PORT = 12345;            //定义端口号

//创建一个TCP客户端实例
var client = net.connect(PORT, HOST, function() {
  console.log('Connected to the server.');
  client.write('Forrest\r\n');
});

//监听数据传输事件
client.on('data', function(data) {
  var input = data.toString();
  var board_str1 = input.substr(0, 200);
  var board_str2 = input.substr(200, 200);
  var current_piece_index = input.substr(400, 1);
  var next_piece_index = input.substr(401, 1);

  var reg=/\d{10}/g;
  board1=board_str1.match(reg);
  board1.push(board_str1.substring(board1.join('').length));
  board2=board_str1.match(reg);
  board2.push(board_str2.substring(board2.join('').length));

  var board_1 = [];
  var board_2 = [];
  board1.map(function(elem, index, arr){
    if (elem) {
      this.push(parseInt(elem.split("").reverse().join(""), 2));
    }
  }, board_1);
  board2.map(function(elem, index, arr){
    if (elem) {
      this.push(parseInt(elem.split("").reverse().join(""), 2));
    }
  }, board_2);
  console.log(board_1);
  var ElTetris= require('./eltetris'); 
  eltetris = new ElTetris(10, 20, board_1);
  var move = eltetris.play(current_piece_index);
  console.log(move);
  var column = move.column;
  var rsp = '1' + move.index + column + '00\r\n';
  console.log(rsp);
  client.write(rsp);
});

//监听连接关闭事件
client.on('end', function() {
  console.log('Server disconnected.');
  console.log();
});
