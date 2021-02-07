import React, { useState } from 'react';
import Ranks from '../src/Ranks';
import CardDeck from '../src/CardDeck';
import HitButton from '../src/HitButton';
import AceButton from '../src/AceButton';
import StayButton from '../src/StayButton';
import Hand from '../src/Hand';
import './App.css';

let numberStays: number = 0;
let numPlayers: number = 0;
let playersDone: boolean = false;

const stayStatus: any = [];
// const splitStatus: any = [];
// const minDealerScore: number = 17;


const DealerArea = ( props: any ): any => {
  const dealer: any = dealerHand;
  const dealerScore = playerTotal( dealer );

}

// const SplitButton = ( props: any ) => {

// }

const PlayerArea = ( props: any ): any => {
  const player: any = players[ props.player ];
  const playerScore = playerTotal( player._hand );
  const [score, setScore] = useState( playerScore );
  const [scoreDealer, setScoreDealer] = useState( playerTotal( dealerHand ) );


  return (
    <div id={ 'player' + props.player }>
      <div className="buttons">
        <HitButton player={ props.player } hitBtnClick={ handleHitBtnClick } />
        <StayButton player={ props.player } stayBtnClick={ handleStayBtnClick } />
      </div>
      <br />
      <div className="buttons">
        <AceButton player={ props.player } aceBtnClick={ handleAceBtnClick } />
      </div>
      <div className="cardArea">
        <Score player={ props.player } score={ score } />
        <Hand player={ props.player } cards={ props.cards } />
      </div>
    </div>
  )
}


function App() {
  return (
    <div className="game">
      <Table numberDecks={ parseInt( '6' ) } numberPlayers={ parseInt( '5' ) } />
    </div>
  )
}

export default App;
