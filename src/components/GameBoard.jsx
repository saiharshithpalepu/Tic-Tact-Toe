


export default function GameBoard({onSelectSquare,board}) {
 
  // const [gameBoard, setGameBoard]=useState(initialBoard)
  // function handleSelectSquare(rowIndex,colIndex){
  //   setGameBoard((prevGameBoard)=>{
  //    const updatedBoard=[...prevGameBoard.map((innerArray)=>[...innerArray])]
  //    updatedBoard[rowIndex][colIndex]=activePlayerSymbol
  //    return updatedBoard
  //   })
  //   onSelectSquare()
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowindex) => 
       (
        <li key={rowindex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
               <li key={colIndex}> <button onClick={()=>onSelectSquare(rowindex,colIndex)} disabled={playerSymbol!==null}> {playerSymbol} </button> </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
