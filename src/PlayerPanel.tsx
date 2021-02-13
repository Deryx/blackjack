import React, { useState, useContext } from 'react';
import DeckContext from './DeckContext';
import PlayersContext from './PlayersContext';
import HitButton from '../src/HitButton';
import StayButton from '../src/StayButton';
import AceButton from '../src/AceButton';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';
import handTotal from '../src/handTotal';

const PlayerPanel = ( props: any ): any => {
  const deckContext = useContext( DeckContext );
  const playersContext = useContext( PlayersContext );
  const deck: any = props.deck;
  const playerHand: any = props.data.hand;
  const [hand, setHand] = useState( playerHand );
  const [score, setScore] = useState( handTotal( hand ) );

  const handleAceBtnClick = ( event: any ): void => {
    const aceBtnId: string = '#aceBtn' + props.player;
    const aceButton: any = document.querySelector( aceBtnId );

    setScore( score + 10 );
    aceButton.disabled = true;
  }

  const handleHitBtnClick = ( event: any ): any => {
    let index: any = deckContext.index;
    const card: any = deck[index];
    const cardValue: number = handTotal( [card] );
    playerHand.push( card );
    setHand( playerHand );
    setScore( score + cardValue );

    deckContext.index += 1;
  }

  const handleStayBtnClick = (event: any): void => {
    const hitBtnId: string = '#hitBtn' + props.player;
    const hitButton: any = document.querySelector( hitBtnId );
    const hitButtons: any = document.querySelectorAll( "button[id^='hitBtn']" );
    const aceBtnId: string = '#aceBtn' + props.player;
    const aceButton: any = document.querySelector( aceBtnId );

    let numStays: number = 0;

    hitButton.disabled = true;
    aceButton.disabled = true;

    let numHitButtons: number = hitButtons.length;
    for (let i = 0; i < numHitButtons; i++) {
      if ( hitButtons[i].hasAttribute('disabled') )
        numStays++;
    }

    if (numStays === numHitButtons) {
      const hiddenCard: any = document.querySelector('#handDealer div:first-child .left-corner');
      const dealerScore: any = document.querySelector('#scoreDealer');
      hiddenCard.style.visibility = 'visible';
      dealerScore.style.visibility = 'visible';

      playersContext.allDone = true;
    }
  }

  return (
    <div id={ 'player' + props.player }>
      <div className="buttons">
        <HitButton player={ props.player } hitBtnClick={ handleHitBtnClick } />
        <StayButton player={ props.player } stayBtnClick={ handleStayBtnClick } />
      </div>
      <br />
      <div className="buttons">
        <AceButton player={ props.player } aceBtnClick={ handleAceBtnClick } aceStatus={ props.data.hasAce } />
      </div>
      <div className="cardArea">
        <PlayerScore player={ props.player } score={ score } />
        <Hand player={ props.player } cards={ props.data.hand } />
      </div>
    </div>
  )
}

export default PlayerPanel;