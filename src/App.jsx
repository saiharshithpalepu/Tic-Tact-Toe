import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning_combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer='X'

  if (gameTurns.length>0 && gameTurns[0].player=="X"){
    currentPlayer="O"
  }

  return currentPlayer
}
function App() {
  const [player,setPlayer]=useState({
    'X':'Player 1',
    'O':'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer=deriveActivePlayer(gameTurns)

  
  let gameBoard=[...initialBoard.map(arr=>[...arr])]
  let winner

  for (const turn of gameTurns){
    const {square,player}=turn
    const {row,col}=square

    gameBoard[row][col]=player
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=player[firstSquareSymbol]
    }
  }

  const hasDraw=gameTurns.length==9 && !winner 


  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
     const currentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayernameChange(symbol,playerName){
    setPlayer(prevPlayers=>{
      return{
      ...prevPlayers,
      [symbol]:playerName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayernameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayernameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log  turns ={gameTurns}/>
    </main>
  );
}

export default App;
