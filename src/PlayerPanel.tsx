import React, { useState } from 'react';
import HitButton from '../src/HitButton';
import StayButton from '../src/StayButton';
import AceButton from '../src/AceButton';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';
import handTotal from '../src/handTotal';

const PlayerPanel = ( props: any ): any => {
  const [score, setScore] = useState( handTotal( props.cards ) );
  const aceButtons: any = document.querySelectorAll( "button[id^='aceBtn']" );
  console.log(aceButtons);
  
  const handleHitBtnClick = ( event: any, card: any ): any => {
    const cardValue = handTotal( [ card ] );
    props.cards.push( card );
    setScore( score + cardValue );
  }

  const handleAceBtnClick = ( event: any ): void => {
    const aceBtnId: string = '#aceBtn' + props.player;
    const aceButton: any = document.querySelector( aceBtnId );

    setScore( score + 10 );
    aceButton.disabled = true;
}

  const handleStayBtnClick = ( event: any ): void => {
    const hitBtnId: string = '#hitBtn' + props.player;
    const hitButton: any = document.querySelector( hitBtnId );
    const hitButtons: any = document.querySelectorAll( "button[id^='hitBtn']" );

    let numStays: number = 0;
  
    hitButton.disabled = true;
    
    let numHitButtons: number = hitButtons.length;
    for( let i = 0; i < numHitButtons; i++ ){
      if(hitButtons[i].hasAttribute( 'disabled' ) ) numStays++;
    }
    
    if( numStays === numHitButtons ){
      const hiddenCard: any = document.querySelector('#handDealer div:first-child .left-corner');
      const dealerScore: any = document.querySelector('#scoreDealer');
      hiddenCard.style.visibility = 'visible';
      dealerScore.style.visibility = 'visible';
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
        <AceButton player={ props.player } aceBtnClick={ handleAceBtnClick } />
      </div>
      <div className="cardArea">
        <PlayerScore player={ props.player } score={ score } />
        <Hand player={ props.player } cards={ props.cards } />
      </div>
    </div>
  )
}

export default PlayerPanel;