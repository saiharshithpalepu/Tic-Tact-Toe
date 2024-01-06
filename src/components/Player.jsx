import { useState } from "react"
export default function Player({initialName,symbol,isActive,onChangeName}){
    const [isEditing,setEditing]=useState(false)
    const [playerName,setPlayerName]=useState(initialName)

    function handleEditClick(){
        setEditing(editing=>!editing)

        if(isEditing){
        onChangeName(symbol,playerName)
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }
    let editableplayerName=<span className="player-name">{playerName}</span>
    if(isEditing){
        editableplayerName=<input type="text" required onChange={handleChange} value={playerName}></input> 
    }
    return(
        <li className={isActive?'active':undefined}>
            <span className="player">
              {editableplayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
          </li>
    )
}