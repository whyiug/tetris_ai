var ElTetris = require('./tetris_ai_attack'); 

var PIECES = require('./pieces');
var f = require('./features');
// eltetris = new ElTetris(10, 20, [514, 768, 16, 3,3 , 7, 16, 3,3, 7, 16, 3 ,3, 7, 16, 3, 0, 0, 0, 0]);
eltetris = new ElTetris(10, 20);
var row0 = 0;
var row1 = 0;
var row2 = 0;
var row3 = 0;
var row4 = 0;
var score = 0;
var counter = 0;
var current_piece_index = Math.floor(Math.random() * PIECES.length);
var next_piece_index;
while (true) {
  next_piece_index = Math.floor(Math.random() * PIECES.length);
  // var last = eltetris.play(current_piece_index, next_piece_index);
  var move = strategy(eltetris.board, current_piece_index, next_piece_index);
  var last = eltetris.playMove(eltetris.board, move.orientation, move.column);
  current_piece_index = next_piece_index;
  if (counter == 20000) {
    score = row1 * 4 + row2 * 10 + row3 * 30 + row4 * 120;
    console.log('######end########');
    console.log(row1);
    console.log(row2/row1);
    console.log(row3/row1);
    console.log(row4/row1);
    console.log(eltetris.rows_completed);
    console.log(score);
    break;
  }
  counter ++;
  if (last.game_over) {
    break;
  }
  switch (last.rows_removed) {
    case 0: 
      row0 ++;
      break;
    case 1: 
      row1 ++;
      break;
    case 2: 
      row2 ++;
      break;
    case 3: 
      row3 ++;
      break;
    case 4: 
      row4 ++;
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
