/*
  Copyright Islam El-Ashi <islam@elashi.me> 
  This file is part of El-Tetris.

  El-Tetris is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

  El-Tetris is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with El-Tetris.  If not, see <http://www.gnu.org/licenses/>.
  */

/**
 * Handles game dynamics (Choosing a piece, placing a piece, etc...)
 */

/**
 * Initialize an El-Tetris game.
 *
 * Args:
 *  number_of_columns - Number of columns in the tetris game.
 *  number_of_rows - Number of rows in the tetris game.
 */
var f = require('./features');
var PIECES = require('./pieces');

function ElTetris(number_of_columns, number_of_rows, board) {
  this.number_of_rows = number_of_rows;
  this.number_of_columns = number_of_columns;
  this.rows_completed = 0;

  // The board is represented as an array of integers, one integer for each row.

  if (typeof board !== 'undefined') {
    this.board = board;
  } else {
    this.board = new Array(number_of_rows);
    for (var i = 0; i < number_of_rows; i++) {
      this.board[i] = 0;
    }
  } 
  console.log('-----初始布局-------');
  f.PrintBoard(this.board, this.number_of_columns);
  console.log('------------');
  this.FULLROW = Math.pow(2, number_of_columns) - 1;
}

ElTetris.prototype.play = function(current_piece_index) {
  var next_piece_index = this.getRandomPieceIndex();
  current_piece = PIECES[current_piece_index];
  next_piece = PIECES[next_piece_index];
  //console.log(piece);
  var move = this.pickMove(current_piece, next_piece);
  // console.log(move);
  // f.PrintBestMove(move);
  var last_move = this.playMove(this.board, move.orientation, move.column);
  console.log('-----下落方块-------');
  f.PrintBoard(last_move.piece, this.number_of_columns);
  console.log('------------');
  console.log('-----当前布局-------');
  f.PrintBoard(this.board, this.number_of_columns);
  console.log('------------');
  if (!last_move.game_over) {
    this.rows_completed += last_move.rows_removed;
  }
  //  console.log(this.board);
  //  console.log(piece);
  //  console.log(this.rows_completed);
  //  console.log(move);
  move.rows_removed = last_move.rows_removed;
  move.next_piece_index = next_piece_index;
  return move;
  last_move.next_piece_index = next_piece_index;
  // return move;

  return last_move;
};

/**
 * Pick the best move possible (orientation and location) as determined by the
 * evaluation function.
 *
 * Given a tetris piece, tries all possible orientations and locations and to
 * calculate (what it thinks) is the best move.
 *
 * Args:
 *  piece - A tetris piece.
 *
 * Returns:
 *   An object containing the following attributes:
 *     * orientation - The orientation of the piece to use.
 *     * column - The column at which to place the piece.
 */


ElTetris.prototype.pickMove = function(current_piece, next_piece, number_of_rows, number_of_columns, start_board) {
  var best_evaluation = -100000;
  var best_orientation = 0;
  var best_column = 0;
  var nbest_orientation = 0;
  var nbest_column = 0;
  var evaluation = undefined;
  var best_rows_removed = 0;
  var nbest_rows_removed = 0;
  //
  for (var i in current_piece) {
    var orientation = current_piece[i].orientation;
    for (var j = 0; j < number_of_columns - piece[i].width + 1; j++) {
      var board = start_board.slice(); // board 原来看板
      var last_move = this.playMove(number_of_rows, number_of_columns, board, orientation, j); // board 第一次变换后的新看板
      if (!last_move.game_over) {
        for (var ni in next_piece) {
          var norientation = next_piece[ni].orientation;
          for (var nj = 0; nj < number_of_columns - next_piece[ni].width + 1; nj++) {
            var nboard = board.slice(); // 复制第一次变换后的新看板
            var nlast_move = this.playMove(number_of_rows, number_of_columns, nboard, norientation, nj); // 第二次变换
            if (!nlast_move.game_over) {
              // nboard 新世界
              weight = 1;
              if (nlast_move.landing_height < 15) { // 贪婪
                if (last_move.rows_removed == 0 && nlast_move.rows_removed == 0) {
                  weight = 1;
                } else {
                  weight = last_move.rows_removed * last_move.rows_removed + nlast_move.rows_removed * nlast_move.rows_removed;
                }
              } 
              evaluation = this.evaluateBoard_EL2(nlast_move, number_of_rows, number_of_columns, nboard, weight);
              if (evaluation > best_evaluation) {
                best_evaluation = evaluation;
                best_orientation = i;
                best_column = j;
                best_rows_removed = last_move.rows_removed;
                nbest_orientation = ni;
                nbest_column = nj;
                nbest_rows_removed = nlast_move.rows_removed;
              }
            }
          }
        }

      }
    }
  }

  return {
    'orientation': current_piece[best_orientation].orientation,
    'index': current_piece[best_orientation].index,
    'column': best_column,
    'rows_removed': best_rows_removed,
    'norientation': next_piece[nbest_orientation].orientation,
    'nindex': next_piece[nbest_orientation].index,
    'ncolumn': nbest_column,
    'nrows_removed': nbest_rows_removed,
  };
};
/**
 * Evaluate the board, giving a higher score to boards that "look" better.
 *
 * Args:
 *   last_move - An object containing the following information on the
 *               last move played:
 *                 * landing_height: the row at which the last piece was played
 *                 * piece: the last piece played
 *                 * rows_removed: how many rows were removed in the last move
 *
 * Returns:
 *   A number indicating how "good" a board is, the higher the number, the
 *   better the board.
 */
ElTetris.prototype.evaluateBoard_PD = function(last_move, board) {
  return f.GetLandingHeight(last_move, board) * -1 +
    last_move.rows_removed * 1 +
    f.GetRowTransitions(board, this.number_of_columns) * -1 +
    f.GetColumnTransitions(board, this.number_of_columns) * -1 +
    f.GetNumberOfHoles(board, this.number_of_columns) * -1 +
    f.GetWellSums(board, this.number_of_columns) * -1;
};
ElTetris.prototype.evaluateBoard_EL = function(last_move, board) {
  return f.GetLandingHeight(last_move, board) * -4.500158825082766 +
    last_move.rows_removed * 3.4181268101392694 +
    f.GetRowTransitions(board, this.number_of_columns) * -3.2178882868487753 +
    f.GetColumnTransitions(board, this.number_of_columns) * -9.348695305445199 +
    f.GetNumberOfHoles(board, this.number_of_columns) * -7.899265427351652 +
    f.GetWellSums(board, this.number_of_columns) * -3.3855972247263626;
};
ElTetris.prototype.evaluateBoard_EL2 = function(last_move, number_of_rows, number_of_columns, board, weight) {
  return f.GetLandingHeight(last_move, board) * -4.500158825082766 +
    last_move.rows_removed * 3.4181268101392694 * weight +
    f.GetRowTransitions(board, number_of_columns) * -3.2178882868487753 +
    f.GetColumnTransitions(board, number_of_columns) * -9.348695305445199 +
    f.GetNumberOfHoles(board, number_of_columns) * -7.899265427351652 +
    f.GetWellSums(board, number_of_columns) * -3.3855972247263626;
};
/**
 * Play the given piece at the specified location.
 *
 * Args:
 *  board - The game board.
 *  piece - The piece to play.
 *  column - The column at which to place the piece.
 *
 * Returns:
 *   True if play succeeded, False if game is over.
 */
ElTetris.prototype.playMove = function(number_of_rows, number_of_columns, board, piece, column) {
  piece = this.movePiece(piece, column);
  var placementRow = this.getPlacementRow(board, piece);
  var rowsRemoved = 0;

  if (placementRow + piece.length > this.number_of_rows) {
    // Game over.
    return { 'game_over': true };
  }

  // Add piece to board.
  for (var i = 0; i < piece.length; i++) {
    board[placementRow + i] |= piece[i];
  }

  // Remove any full rows
  for (i = 0; i < piece.length; i++) {
    if (board[placementRow + i] == this.FULLROW) {
      board.splice(placementRow + i, 1);
      // Add an empty row on top.
      board.push(0);
      // Since we have decreased the number of rows by one, we need to adjust
      // the index accordingly.
      i--;
      rowsRemoved++;
    }
  }

  return {
    'landing_height': placementRow,
    'piece': piece,
    'rows_removed': rowsRemoved,
    'game_over': false
  };
};

/**
 * Given a piece, return the row at which it should be placed.
 */
ElTetris.prototype.getPlacementRow = function(board, piece) {
  // Descend from top to find the highest row that will collide
  // with the our piece.
  for (var row = this.number_of_rows - piece.length; row >= 0; row--) {
    // Check if piece collides with the cells of the current row.
    for (var i = 0; i < piece.length; i++) {
      if ((board[row + i] & piece[i]) !== 0) {
        // Found collision - place piece on row above.
        return row + 1;
      }
    }
  }

  return 0; // No collision found, piece should be placed on first row.
};

ElTetris.prototype.movePiece = function(piece, column) {
  // Make a new copy of the piece
  var newPiece = piece.slice();
  for (var i = 0; i < piece.length; i++) {
    newPiece[i] = piece[i] << column;
  }

  return newPiece;
};

ElTetris.prototype.getRandomPieceIndex = function() {
  return Math.floor(Math.random() * PIECES.length);
};

ElTetris.prototype.getRandomPiece = function() {
  return PIECES[this.getRandomPieceIndex()];
};

module.exports = ElTetris;
