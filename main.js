"use strict";

const gameboard = (() => {
  const tiles = [[], [], []];

  for (let x = 0; x < 3; x+=1) {
    for (let y = 0; y < 3; y+=1) {
      tiles[x][y] = {element: document.querySelector(`.gameboard-tile[data-col="${x}"][data-row="${y}"]`),
                     player: undefined};
    }
  }

  return {tiles};
})();