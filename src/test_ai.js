
// var mysql      = require('mysql');
// var connection = mysql.createConnection({     
//   host     : 'localhost',       
//   user     : 'root',              
//   password : '031313',       
//   port: '3306',                   
//   database: 'tetris', 
// }); 
connection.connect();
var ElTetris= require('./eltetris'); 
eltetris = new ElTetris(10, 20);
var row0 = 0;
var row1 = 0;
var row2 = 0;
var row3 = 0;
var row4 = 0;
var score = 0;
var counter = 0;
var piece = 1;
while (true) {
  var last = eltetris.play(piece);
  piece = last.next_piece_index;
  if (counter == 20000) {
    console.log('######end########');
    console.log(eltetris.rows_completed);
    console.log(row1);
    console.log(row2/row1);
    console.log(row3/row1);
    console.log(row4/row1);
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
  score = eltetris.rows_completed;
}
// connection.end();