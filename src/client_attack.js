var PIECES = require('./pieces');
var f = require('./features');
var ElTetris = require('./tetris_attack');
var ElTetris2 = require('./tetris_attack2');
var net = require('net'); //引入网络模块
var HOST = '192.168.0.141'; //定义服务器地址
//var HOST = '192.168.0.201'; //定义服务器地址
var PORT = 12345; //定义端口号

//创建一个TCP客户端实例
var client = net.connect(PORT, HOST, function() {
  console.log('Connected to the server.');
  client.write('wahaha\r\n'); });

var rows = 0;
//监听数据传输事件
client.on('data', function(data) {
  var input = data.toString();
  var board_str1 = input.substr(0, 200);
  var board_str2 = input.substr(200, 200);
  var current_piece_index = input.substr(400, 1);
  var next_piece_index = input.substr(401, 1);

  var reg = /\d{10}/g;
  var board_1 = formatParams(board_str1);
  var board_2 = formatParams(board_str2);
  // eltetris = new ElTetris(10, 20, board_1);
  var move = strategy(board_1, current_piece_index, next_piece_index);
  // rows += eltetris.rows_completed;
  var rsp = '1' + move.index + move.column + '00\r\n';
  client.write(rsp);
});

//监听连接关闭事件
client.on('end', function() {
  console.log('Server disconnected.');
});

function formatParams(board_str) {
  var reg = /\d{10}/g;
  var board = board_str.match(reg);
  board.push(board_str.substring(board.join('').length));
  var board_arr = [];
  board.map(function(elem, index, arr) {
    if (elem) {
      this.push(parseInt(elem.split("").reverse().join(""), 2));
    }
  }, board_arr);
  return board_arr;
}

function strategy (board, current_piece_index, next_piece_index) 
{
  var height = f.GetBoardHeight(board);
  var aboard = board.slice();
  var attempt_tetris = new ElTetris(10, 20, aboard);
  // var l_board = f.GetLeftBoard(board, 10);
  // var l_fullrow = f.GetBoardFullRows(l_board, 9);
  var move1 = attempt_tetris.play(current_piece_index, next_piece_index);
  // return move1;
  if (height > 7) {
    return move1;
  } else {
    var left_board = f.GetLeftBoard(board, 10);
    var left_tetris = new ElTetris2(9, 20, left_board);
    var move2 = left_tetris.play(current_piece_index, next_piece_index);
    // if ((move.rows_removed < 2 && move.nrows_removed < 2) || (move.rows_removed < l_fullrow && move.nrows_removed < l_fullrow)) {
    if (height > 4) {
      if (move1.rows_removed < 2 && move1.nrows_removed < 2) {
        // 堆左边的9个
        return move2;
      } else {
        return move1;
      } 
    } else {
      if (move1.rows_removed < 3 && move1.nrows_removed < 3) {
        // 堆左边的9个
        return move2;
      } else {
        return move1;
      } 
    }
  } 
}
