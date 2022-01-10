import React from 'react';
import Table from '../playing-table/playing-table';
import NewGameButton from '../buttons/new-game-button/new-game-button';
import './game.scss';

const Game = ( props: any ): any => {
    return (
    <div className="game">
        <Table dealerCards={ props.dealerHand } playersCards={ props.playersHands } deck={ props.deck } />
        <NewGameButton newGameBtnClick={ props.gameBtnClick } />
    </div>
    )
}

export default Game; 