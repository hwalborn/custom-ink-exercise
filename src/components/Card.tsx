import * as React from 'react';

import { CardProps } from '../../types/props';
import '../style/card.css';

export default ({card, index, handleFlip}: CardProps) => {
    const handleFlipClick = () => {
        if (!card.isFlipped) {
            handleFlip(card, index);
        }
    }
    let className = 'card';
    if (card.isFlipped) {
        className += ' flipped';
    }
    return (
        <div onClick={handleFlipClick} className="card-container">
            <div style={card.style} className={className}>
                <div className="card-face card-front">{card.isFlipped ? <img src={card.image} /> : <></>}</div>
                <div className="card-face card-back"></div>
            </div>
        </div>
    )
}