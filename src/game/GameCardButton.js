import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({

});

export default function GameCardButton(props) {
    const { playedCards, index, nextCard, onSuccessfulGuess, 
        onUnsuccessfulGuess } = props;

    const handleButtonClick = () => {
        if ((index === 0 || nextCard.year >= playedCards[index - 1].year) &&
            (index === playedCards.length || 
                nextCard.year <= playedCards[index].year)) {
            onSuccessfulGuess(index);
        } else {
            if (onUnsuccessfulGuess != null) onUnsuccessfulGuess();
        }
    };

    return (
        <Button onClick={handleButtonClick}>
            Add Here
        </Button>
    );
}

GameCardButton.propTypes = {
    playedCards: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
    nextCard: PropTypes.object.isRequired,
    onSuccessfulGuess: PropTypes.func.isRequired,
    onUnsuccessfulGuess: PropTypes.func
}