import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import GameCard from './GameCard';
import GameCardButton from "./GameCardButton";
import { createDeck, takeCard } from './gameUtils';

const useStyles = makeStyles({
  boxItem: {
    margin: 10
  },
  box: {
    margin: 10
  }
});

// TODO:
// Features: Add more cards
// Aesthetics: everything lol
// Bugs: Bug selecting incorrect last spot

export default function GameApp() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [remainingCards, setRemainingCards] = useState();
  const [playedCards, setPlayedCards] = useState();
  const [nextCard, setNextCard] = useState();
  const [lives, setLives] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [guessMode, setGuessMode] = useState(true);

  const onSuccessfulGuess = (index) => {
    setPlayedCards([...playedCards.slice(0, index), 
      nextCard, ...playedCards.slice(index)]);
    setShowFail(false);
    setShowSuccess(true);
    setGuessMode(false);
  };

  const onUnsuccessfulGuess = () => {
    setLives(lives - 1);
    setShowFail(true);
    setShowSuccess(false);
    setGuessMode(false);
  };

  const onDrawCard = () => {
    const nextCard = takeCard(remainingCards, 
      setRemainingCards);
    setNextCard(nextCard);
    setGuessMode(true);
    setShowFail(false);
    setShowSuccess(false);
  };

  useEffect(() => {
    createDeck((deck) => {
      const firstCard = takeCard(deck, (newDeck) => {
        const secondCard = takeCard(newDeck, setRemainingCards);
        setNextCard(secondCard);
      });
      setPlayedCards([firstCard]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="GameApp">
      {!isLoading && <>
        {lives > 0 && playedCards.length < 10 &&
          <>
            <Box className={classes.box}>
              <Typography>Lives: {lives}</Typography>

              {guessMode && (<>
                <Typography>Your goal is to correctly order 10 events in history.</Typography>
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

        {playedCards.length >= 10 &&
          <Typography>You Win!</Typography>
        }
      </>}
    </div>
  );
}