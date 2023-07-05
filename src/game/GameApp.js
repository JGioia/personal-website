import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GameCard from './GameCard';
import GameCardButton from "./GameCardButton";
import { createDeck, takeCard } from './gameUtils';
import Text from '../shared/Text';
import Button from '../shared/Button';
import { useWindowSize } from '../shared/utils';

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
  const size = useWindowSize();
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
    <div style={{minHeight: "100vh", backgroundColor: "#957588"}}>
      {!isLoading && <>
        {lives > 0 && playedCards.length < 10 &&
          <>
            <div style={{padding: 20, display: "flex", alignItems: "center", flexDirection: "column", rowGap: 10}}>
              <Text white bold large>TimeLine Game!</Text>
              <Text white bold>Lives: {lives}</Text>

              {guessMode && (<>
                <Text white>Your goal is to correctly order 10 events in history.</Text>
                <Text white>Guess where the following event happened in relation to the events below:</Text>
                <Text white bold>{nextCard.description}</Text>
              </>)}

              {showSuccess && <Text white>Correct!</Text>}
              {showFail && <Text white>Incorrect! This event happened in {nextCard.year}</Text>}

              {!guessMode && <Button onClick={onDrawCard}><Text white bold>Draw Card</Text></Button>}
            </div>
            
            <div style={{display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center", 
              gap: 10, 
              margin: 20,
              flexDirection: size.width > 1000 ? "row": "column"}}>
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
            </div>
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