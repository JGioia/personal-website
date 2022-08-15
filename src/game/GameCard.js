import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    gameCard: {

    },
    yearText: {

    },
    descriptionText: {

    }
});

export default function GameCard(props) {
    const { year, description, hidden } = props;
    const classes = useStyles();

    return (!hidden &&
        <Card className={classes.gameCard}>
            {year &&
                <CardHeader title={year} className={classes.yearText} />
            }
            <CardContent>
                <Typography className={classes.descriptionText}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

GameCard.propTypes = {
    year: PropTypes.number,
    description: PropTypes.string.isRequired,
    hidden: PropTypes.bool
};
