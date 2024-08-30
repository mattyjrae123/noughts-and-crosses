/**
 * AIAgent singleton
 * 
 * Class represents an AI player, which implements the minimax algorithm to
 * get the AI players move.
 */
const AIAgent = (() => {
  const getMove = (board) => {
    return board.getPossibleMoves()[0];
  };

  const _minimax = (board, isMaximisingPlayer) => {
    // terminal state 1
    if (board.gameWon()) {
      if (isMaximisingPlayer) {
        return -1;
      }

      return 1;
    }

    // terminal state 2
    if (!board.hasMovesRemaining()) {
      return 0;
    }
  };
  
  return {
    getMove
  };
})();

export { AIAgent };
