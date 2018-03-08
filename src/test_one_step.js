/**
 * 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000053\r\n
 */
 var ElTetris = require('./tetris_attack');
 var PIECES = require('./pieces');
 var f = require('./features');
 var board = [];
// var board_arr = [
//     "0000000000", // 19
//     "0000000000", // 18
//     "0000000000", // 17
//     "0000000000", // 16
//     "0000000000", // 15
//     "0000000000", // 14
//     "0000000000", // 13
//     "0000000000", // 12
//     "0000000000", // 11
//     "0000000000", // 10
//     "0000000000", // 9
//     "0000000000", // 8
//     "0000000000", // 7
//     "0000000000", // 6
//     "0000000000", // 5
//     "0000000000", // 4
//     "0000000000", // 3
//     "0000000000", // 2
//     "0000000000", // 1
//     "1111110111", // 0
//     ];
var board_arr = [
    "0000000000", // 19
    "0000000000", // 18
    "0000000000", // 17
    "0000000000", // 16
    "1000000000", // 15
    "1000000000", // 14
    "1000000000", // 13
    "1100000000", // 12
    "1111000000", // 11
    "1111000000", // 10
    "1111100001", // 9
    "1111110001", // 8
    "1011111111", // 7
    "1111111011", // 6
    "1111001111", // 5
    "1111111110", // 4
    "1111011111", // 3
    "1111110111", // 2
    "0111111111", // 1
    "0111111111", // 0
    ];
    board_arr.reverse().map(function(elem, index, arr) {
        if (elem) {
            this.push(parseInt(elem.split("").reverse().join(""), 2));
        }
    }, board);

    var current_piece_index = 1;
    var next_piece_index = 3;
    eltetris = new ElTetris(10, 20, board);
    var move = strategy(board, current_piece_index, next_piece_index);
    var last = eltetris.playMove(eltetris.board, move.orientation, move.column);
    // console.log(move);
    process.exit();
// var board = [ 999, 994, 768, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

var piece = 1;
eltetris = new ElTetris(10, 20, board);
var last = eltetris.play(piece);
return;
var counter = 1;
while (true) {
    var last = eltetris.play();
    counter++;
    if (last.game_over) {
        break;
    }

    if (counter == 15) {
        break;
    }
}
function strategy (board, current_piece_index, next_piece_index) 
{
  var height = f.GetBoardHeight(board);
  var aboard = board.slice();
  var attempt_tetris = new ElTetris(10, 20, aboard);
  // var l_board = f.GetLeftBoard(board, 10);
  // var l_fullrow = f.GetBoardFullRows(l_board, 9);
  var move1 = attempt_tetris.play(current_piece_index, next_piece_index);
  return move1;
  if (height > 10) {
    return move1;
} else {
    var left_board = f.GetLeftBoard(board, 10);
    var left_tetris = new ElTetris(9, 20, left_board);
    var move2 = left_tetris.play(current_piece_index, next_piece_index);
    // if ((move.rows_removed < 2 && move.nrows_removed < 2) || (move.rows_removed < l_fullrow && move.nrows_removed < l_fullrow)) {
        if (height > 6) {
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