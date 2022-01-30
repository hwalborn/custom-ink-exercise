import * as React from 'react';

import SelectGame from './SelectGame';
import Board from './Board';
import GameServiceFactory from '../../services/GameServiceFactory';

export default (): JSX.Element => {
    const [ selectedGame, setSelectedGame ] = React.useState('');
    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedGame(e.target.value);
    }
    if (!selectedGame) {
        return <SelectGame handleSelect={handleSelect}/>
    } else {
        const gameService = GameServiceFactory(selectedGame);
        return <Board gameService={gameService} handleGameWon={() => setSelectedGame('')} />
    }
}