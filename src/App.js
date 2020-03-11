import React, {useState} from 'react'
import dice1 from './images/dice-1.png'
import dice2 from './images/dice-2.png'
import dice3 from './images/dice-3.png'
import dice4 from './images/dice-4.png'
import dice5 from './images/dice-5.png'
import dice6 from './images/dice-6.png'
import ScoreBoard from './Components/ScoreBoard'

const App = props =>  {
    // constructor(){
    //     super();
    //     this.state = {
    //         scores: [0, 0],
    //         activePlayer: 0,
    //         roundScore: [0, 0],
    //         isGamePlaying: false,
    //         showDice: 'none'
    //     }
    // }

    const [scores, setScores] = useState([0, 0])
    const [activePlayer, setActivePlayer] = useState(0)
    const [roundScore, setRoundScore] = useState(0)
    const [isGamePlaying, setIsGamePlaying] = useState(true)
    const [showDice, setShowDice] = useState('none')
    const [diceImgSrc, setDiceImgSrc] = useState(['',''])
    const [winner, setWinner] = useState('');

    const nextPlayer  = () => {// Move to Next player
        
        !activePlayer ? setActivePlayer(1) : setActivePlayer(0);
        setRoundScore(0);
        setShowDice('none');

    }

    const rollDice = () => {
       if (isGamePlaying){
            //Generate random dice values and store total
            const random1 = Math.floor(Math.random() * 6) + 1;
            const random2 = Math.floor(Math.random() * 6) + 1;
            const totalRandom = random1 + random2;

            //get dice images and set Dice Image Src state
            const dice = [getDiceValueImage(random1), getDiceValueImage(random2)]
            setDiceImgSrc(dice);

            //set state to display dice
            setShowDice('block');

            //Add roundscore if user does not roll a 1 on any dice else change player
            if (random1 !== 1 && random2 !== 1){
                setRoundScore(previous => previous + totalRandom)
            } else {
                console.log('You rolled 1')
                nextPlayer();
            }

            //Get Dice Image source based on value generated
            function getDiceValueImage (value) {
                switch (value){
                    case 1:
                        return dice1
                    case 2:
                        return dice2
                    case 3:
                        return dice3
                    case 4:
                        return dice4
                    case 5:
                        return dice5
                    case 6:
                        return dice6
                    default:
                        return null
                }
            }
       } 
    }

    const holdFunction = (currentPlayer) => {
        if (isGamePlaying){
            //Add Current Score to global score based on current player
            const currentScore = scores[currentPlayer] + roundScore;
            currentPlayer?
            setScores(prevScores => [prevScores[0], currentScore]):
            setScores(prevScores => [currentScore, prevScores[1]]);
            
            checkWinner(currentPlayer, currentScore, nextPlayer);
        }
    }

    const checkWinner = (currentPlayer, currentScore, callback) =>{
        if (currentScore >= 20){
            setWinner(currentPlayer)
            setShowDice('none');
            setIsGamePlaying(false);
            setRoundScore(0);
        } else {
            callback();
        }

    }

    const init = () => {
        setScores([0,0]);
        setActivePlayer(0);
        setRoundScore(0);
        setIsGamePlaying(true);
        setShowDice('none');
        setDiceImgSrc(['','']);
        setWinner('');
    }

    const scoreBoardComponents = ['Player 1', 'Player 2'].map((cur, index) =>{
        return <ScoreBoard 
                    key = {index}
                    id = {index} 
                    activePlayer = {activePlayer} 
                    winner = {winner} 
                    roundScore = {roundScore} 
                    playerName = {cur}
                    scores = {scores}
                />
    })

    return (
        <div className="wrapper clearfix">
            {/* <div className={`player-${0}-panel ${activePlayer === 0 && winner === '' ? 'active' : null } ${winner === 0 ? 'winner': null}`}>
                <div className="player-name" id={`name-${0}`}>{winner === 0 ? 'Winner!' : 'Player 1'}</div>
                <div className="player-score" id={`score-${0}`}>{scores[0]}</div>
                <div className="player-current-box">
                    <div className="player-current-label">Current</div>
                    <div className="player-current-score" id={`current-${0}`}>{activePlayer === 0? roundScore : '0'}</div>
                </div>
            </div>

            <div className={`player-${1}-panel ${activePlayer === 1 && winner === '' ? 'active' : null } ${winner === 1 ? 'winner': null}`}>
                <div className="player-name" id={`name-${1}`}>{winner === 1 ? 'Winner!' : 'Player 2'}</div>
                <div className="player-score" id={`score-${1}`}>{scores[1]}</div>
                <div className="player-current-box">
                    <div className="player-current-label">Current</div>
                    <div className="player-current-score" id={`current-${1}`}>{activePlayer === 1? roundScore : '0'}</div>
                </div>
            </div>  */}
            {scoreBoardComponents}
            <h1>{roundScore}</h1>
            
            <button className="btn-new" onClick = {init} ><i className="ion-ios-plus-outline"></i>New game</button>
            <button className="btn-roll" onClick = {rollDice} ><i className="ion-ios-loop"></i>Roll dice</button>
            <button className="btn-hold" onClick = {holdFunction.bind(null, activePlayer)} ><i className="ion-ios-download-outline"></i>Hold</button>
            
            <input type="number" placeholder="Final score" id="final-score" className="final-score"/>

            <img src={diceImgSrc[0]} alt="Dice" style = {{display: showDice}} className="dice" id="dice-1"/>
            <img src={diceImgSrc[1]} alt="Dice" style = {{display: showDice}} className="dice" id="dice-2"/>
        </div>
    )
    
    
}


export default App