import React from 'react';

function Scoreboard (props){
    return (
        <div 
            className={`player-${props.id}-panel ${props.activePlayer === props.id && props.winner === '' ? 'active' : null } 
            ${props.winner === props.id ? 'winner': null}`}
        >
            <div className="player-name" id={`name-${props.id}`}>{props.winner === props.id ? 'Winner!' : props.playerName}</div>
            <div className="player-score" id={`score-${props.id}`}>{props.scores[props.id]}</div>
            <div className="player-current-box">
                <div className="player-current-label">Current</div>
                <div className="player-current-score" id={`current-${props.id}`}>{props.activePlayer === props.id? props.roundScore : '0'}</div>
            </div>
        </div>
    )
}


export default Scoreboard;