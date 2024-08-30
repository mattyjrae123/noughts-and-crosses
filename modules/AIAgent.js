/**
 * AIAgent singleton
 * 
 * Class represents an AI player, which implements the minimax algorithm to
 * get the AI players move.
 */
const AIAgent = (id) => {
  const _id = id;

  const getMove = (board) => {
    console.log(`id: ${_id}: AIAgent.getMove()`);
  };
  
  return {
    getMove
  };
};

export { AIAgent };
