import * as React from 'react';

import '../style/selectGame.css';

import { GameSelectProps } from '../../types/props';

export default ({handleSelect}: GameSelectProps) => {
    return (
        <div id="game-select">
            <div>
                <h1>Select Game</h1>
            </div>
            <div>
                <select onChange={handleSelect}>
                    <option value="">--SELECT--</option>
                    <option value="pokemon">pokemon</option>
                    <option value="playing-card">playing cards</option>
                </select>
            </div>
        </div>
    )
}