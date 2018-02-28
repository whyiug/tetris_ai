var ElTetris= require('./eltetris'); 
eltetris = new ElTetris(10, 20);
var counter = 1;
while(true) {
  var last = eltetris.play();
  counter ++;
  if (last.game_over) {
    break;
  }

  if (counter == 15) {
    break;
  }
}
console.log(eltetris.rows_completed);
