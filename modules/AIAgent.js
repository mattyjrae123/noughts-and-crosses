/**
 * AIAgent singleton
 * 
 * Class represents an AI player, which implements the minimax algorithm to
 * get the AI players move.
 */
const AIAgent = () => {
  const getMove = (board) => {
    console.log(`AIAgent.getMove()`);
  };
  
  return {
    getMove
  };
};

export { AIAgent };
