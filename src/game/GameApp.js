import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import GameCard from './GameCard';
import GameCardButton from "./GameCardButton";

const useStyles = makeStyles({
    boxItem: {
        margin: 10
    },
    box: {
        margin: 10
    }
});

let allCards = [
    {year: -200, description: "Invention of glass bottle"},
    {year: 900, description: "Invention of the playing card"},
    {year: 1513, description: "Discovery of planetary motion"},
    {year: 1869, description: "Twenty Thousand Leagues Under the Sea"},
    
];

allCards = shuffle(allCards);

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default function GameApp() {
    const classes = useStyles();
    const [remainingCards, setRemainingCards] = useState(allCards.slice(2));
    const [playedCards, setPlayedCards] = useState([allCards[0]]);
    const [nextCard, setNextCard] = useState(allCards[1]);
    const [lives, setLives] = useState(3);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [guessMode, setGuessMode] = useState(true);
    const [gameWon, setGameWon] = useState(false);

    const onSuccessfulGuess = (index) => {
        setPlayedCards([...playedCards.slice(0, index), 
            nextCard, ...playedCards.slice(index)]);
        setShowFail(false);
        setShowSuccess(true);
        setGuessMode(false);
    }

    const onUnsuccessfulGuess = () => {
        setLives(lives - 1);
        setShowFail(true);
        setShowSuccess(false);
        setGuessMode(false);
    }

    const onDrawCard = () => {
        if (remainingCards.length > 0) {
            setNextCard(remainingCards[0]);
            setRemainingCards(remainingCards.slice(1));
            setGuessMode(true);
            setShowFail(false);
            setShowSuccess(false);
        } else {
            setGameWon(true);
        }
    }

    return (
        <div className="GameApp">
            {lives > 0 && !gameWon &&
                <>
                    <Box className={classes.box}>
                        <Typography>Lives: {lives}</Typography>

                        {guessMode && (<>
                            <Typography>Guess where the following event happened in relation to the events below:</Typography>
                            <Typography>{nextCard.description}</Typography>
                        </>)}

                        {showSuccess && <Typography>Correct!</Typography>}
                        {showFail && <Typography>Incorrect! This event happened in {nextCard.year}</Typography>}

                        {!guessMode && <Button onClick={onDrawCard}>Draw Card</Button>}
                    </Box>
                    
                    <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.box}>
                        {playedCards.map((card, index) => (
                            <>
                                {guessMode &&
                                    <GameCardButton className={classes.boxItem} 
                                        index={index} key={"Button" + index} 
                                        nextCard={nextCard} playedCards={playedCards} 
                                        onSuccessfulGuess={onSuccessfulGuess} onUnsuccessfulGuess={onUnsuccessfulGuess}/>
                                }
                                <GameCard className={classes.boxItem} year={card.year} 
                                    description={card.description} key={index} />
                            </>
                        ))}
                        {guessMode &&
                            <GameCardButton index={playedCards.length} nextCard={nextCard} 
                                playedCards={playedCards} key={"Button" + playedCards.length}
                                onSuccessfulGuess={onSuccessfulGuess}/>
                        }
                    </Box>
                </>
            }

            {lives <= 0 &&
                <Typography>You Lost!</Typography>
            }

            {gameWon &&
                <Typography>You Win!</Typography>
            }

        </div>
    )
}