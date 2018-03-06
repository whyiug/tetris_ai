var net = require('net'); //引入网络模块
// var HOST = '192.168.0.141'; //定义服务器地址
var HOST = '127.0.0.1'; //定义服务器地址
var PORT = 12345; //定义端口号

//创建一个TCP客户端实例
var client = net.connect(PORT, HOST, function() {
    console.log('Connected to the server.');
    client.write('tourist\r\n');
});

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

    var ElTetris = require('./eltetris');
    eltetris = new ElTetris(10, 20, board_1);
    var move = eltetris.play(current_piece_index);
    // rows += eltetris.rows_completed;
    var rsp = '1' + move.index + move.column + '00\r\n';
//    console.log(move);
//    console.log(rsp);
//    console.log(rows);
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
