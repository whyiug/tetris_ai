/*
  Copyright Islam El-Ashi <islam@elashi.me>

  This file is part of El-Tetris.

  El-Tetris is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  El-Tetris is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with El-Tetris.  If not, see <http://www.gnu.org/licenses/>.
*/ 

/**
 * Defines the shapes and dimensions of the tetrominoes.
 */
var PIECES = new Array();

/* 'I' piece:
  Orientations:

  X
  X       XXXXX
  X
  X
  */
PIECES[1] = [
    {
      orientation: [1, 1, 1, 1],
      width: 1,
      height: 4,
      index: 0
    },
    {
      orientation: [parse('1111')],
      width: 4,
      height: 1,
      index: 1

    }
];

/**
 * 'T' piece
 * Orientations:
 *
 *  O     O      O    OOO
 * OOO    OO    OO     O
 *        O      O
 */
PIECES[2] = [
    {
      orientation: [
          parse('10'),
          parse('11'),
          parse('10')
      ].reverse(),
      width: 2,
      height: 3,
      index: 3
    }, 
    {
      orientation: [
          parse('010'),
          parse('111')
      ].reverse(),
      width: 3,
      height: 2,
      index: 2
    },
    {
      orientation: [
          parse('01'),
          parse('11'),
          parse('01')
      ].reverse(),
      width: 2,
      height: 3,
      index: 1
    },
    {
      orientation: [
          parse('111'),
          parse('010')
      ].reverse(),
      width: 3,
      height: 2,
      index: 0
    },
];

/**
 * 'O' piece
 * Orientations:
 *
 * OO
 * OO
 */
PIECES[0] = [
    {
      orientation: [
          parse('11'),
          parse('11')
      ],
      width: 2,
      height: 2,
      index: 0,
    },
];

/**
 * 'J' piece
 * Orientations:
 *
 * O      OO    OOO    O
 * OOO    O       O    O
 *        O           OO
 */
PIECES[4] = [
    {
      orientation: [
          parse('100'),
          parse('111')
      ].reverse(),
      width: 3,
      height: 2,
      index: 1
    },
    {
      orientation: [
          parse('01'),
          parse('01'),
          parse('11')
      ].reverse(),
      width: 2,
      height: 3,
      index: 0
    },
    {
      orientation: [
          parse('111'),
          parse('001'),
      ].reverse(),
      width: 3,
      height: 2,
      index: 3
    },
    {
      orientation: [
          parse('11'),
          parse('10'),
          parse('10')
      ].reverse(),
      width: 2,
      height: 3,
      index: 2
    },
];

/**
 * 'L' piece
 * Orientations:
 *
 *   O    OO    OOO    O
 * OOO     O    O      O
 *         O           OO
 */
PIECES[3] = [
    {
      orientation: [
          parse('111'),
          parse('100'),
      ].reverse(),
      width: 3,
      height: 2,
      index: 1
    },
    {
      orientation: [
          parse('10'),
          parse('10'),
          parse('11')
      ].reverse(),
      width: 2,
      height: 3,
      index: 0
    },
    {
      orientation: [
          parse('001'),
          parse('111')
      ].reverse(),
      width: 3,
      height: 2,
      index: 3
    },
    {
      orientation: [
          parse('11'),
          parse('01'),
          parse('01')
      ].reverse(),
      width: 2,
      height: 3,
      index: 2
    },
    
];


/**
 * 'S' piece
 * Orientations:
 *
 *  OO    O
 * OO     OO
 *         O
 */
PIECES[6] = [
    {
      orientation: [
          parse('10'),
          parse('11'),
          parse('01')
      ].reverse(),
      width: 2,
      height: 3,
      index: 1
    },
    {
      orientation: [
          parse('011'),
          parse('110')
      ].reverse(),
      width: 3,
      height: 2,
      index: 0
    },
];

/**
 * 'Z' piece
 * Orientations:
 *
 * OO      O
 *  OO    OO
 *        O
 */
PIECES[5] = [
    {
      orientation: [
          parse('01'),
          parse('11'),
          parse('10')
      ].reverse(),
      width: 2,
      height: 3,
      index: 1
    },
    {
      orientation: [
          parse('110'),
          parse('011')
      ].reverse(),
      width: 3,
      height: 2,
      index: 0
    },
];

function parse(x) {
  return parseInt(x.split("").reverse().join(""), 2);
}
