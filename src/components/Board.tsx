import * as React from 'react';

import '../style/board.css';

import Card from '../../classes/Card';
import CardComponent from './Card';
import { BoardProps } from '../../types/props';

export default ({gameService, handleGameWon}: BoardProps): JSX.Element => {
    const [cards, setCards] = React.useState([]);
    const [compareCard, setCompareCard] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        gameService.getCardsAndShuffleDeck().then(setCards);
    }, []);

    React.useEffect(() => {
        if (hasWon()) {
            setTimeout(() => {
                alert('YOU WON!');
                handleGameWon();
            })
        }
    }, [cards]);

    const handleFlip = (card: Card, index: number) => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        updateCards(index, !card.isFlipped);
        checkAndUpdateFlips(card, index).finally(() => setIsLoading(false));
    }

    const hasWon = () => {
        return cards.length && cards.every(c => c.isFlipped);
    }

    const checkAndUpdateFlips = (card: Card, index: number): Promise<void> => {
        return new Promise((res, _) => {
            const allAreSame = gameService.handleFlip(card);

            // we have all the same cards and we've found the number for a match
            // leave these cards face up here
            if (allAreSame && compareCard) {
                setCompareCard(undefined);
                res();
            
            // not the same? gotta go ahead and flip them back over... but after 2s
            // to give the player a chance to see what's there
            } else if (!allAreSame) {
                setTimeout(() => {
                    const updatedCards = gameService.handleDifferentCards(cards, compareCard.id, card.id);
                    setCards(updatedCards);
                    setCompareCard(undefined);
                    res();
                }, 2000);
            
            // this is the first card flip
            } else {
                setCompareCard(card);
                res();
            }
        });
    }

    const updateCards = (index: number, value: boolean) => {
        const updatedCards = cards.map((c, i) => i === index ? gameService.updateFlip(c, value) : c);
        setCards(updatedCards);
    }

    const cardComponents = cards.map((c: Card, i) => {
        return <CardComponent key={`card-component-${i}`}
                              card={c}
                              index={i}
                              handleFlip={handleFlip} />;
    });

    return (
        <div className={isLoading ? 'loading' : ''} id="board" style={gameService.boardStyle}>
            {cardComponents}
        </div>
    )
}