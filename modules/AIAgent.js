/**
 * AIAgent singleton
 *
 * Class represents an AI player, which implements the minimax algorithm to
 * get the AI players move.
 */
const AIAgent = (() => {
  const getMove = (board, currPlayer) => {
    let _, move;
    [_, move] = _minimax(board, 0, true, currPlayer);
    return move;
  };

  const _minimax = (board, depth, isMaximisingPlayer, player) => {
    // terminal state 1
    if (board.gameWon()) {
      if (isMaximisingPlayer) {
        return [-10 - depth, undefined];
      }

      return [10 - depth, undefined];
    }

    // terminal state 2
    if (!board.hasMovesRemaining()) {
      return [0, undefined];
    }

    if (isMaximisingPlayer) {
      let bestValue = -Infinity;
      let bestMove = undefined;

      board.getPossibleMoves().forEach((move) => {
        board.setTile(move[0], move[1], player);

        let nextPlayer;
        if (player == "x") {
          nextPlayer = "o";
        } else {
          nextPlayer = "x";
        }
        let value, _;
        [value, _] = _minimax(board, depth + 1, false, nextPlayer);

        if (value > bestValue) {
          bestValue = value;
          bestMove = move;
        }

        board.removeTile(move[0], move[1]);
      });

      return [bestValue, bestMove];
    } else {
      let bestValue = Infinity;
      let bestMove = undefined;

      board.getPossibleMoves().forEach((move) => {
        board.setTile(move[0], move[1], player);

        let nextPlayer;
        if (player == "x") {
          nextPlayer = "o";
        } else {
          nextPlayer = "x";
        }
        let value, _;
        [value, _] = _minimax(board, depth + 1, true, nextPlayer);

        if (value < bestValue) {
          bestValue = value;
          bestMove = move;
        }
        
        board.removeTile(move[0], move[1]);
      });

      return [bestValue, bestMove];
    }
  };

  return {
    getMove,
  };
})();

export { AIAgent };
