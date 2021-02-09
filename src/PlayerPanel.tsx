import React, { useState } from 'react';
import HitButton from '../src/HitButton';
import StayButton from '../src/StayButton';
import AceButton from '../src/AceButton';
import Player from '../src/Player';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';
import handTotal from '../src/handTotal';

const player: Player = new Player();

const PlayerPanel = ( props: any ): any => {
  const [score, setScore] = useState( handTotal( player.hand ) );

    const handleHitBtnClick = ( event: any, card: any ): any => {
        const cardValue = handTotal( [ card ] );
        player.hand.push( card );
        setScore( score + cardValue );
      }
    
      const handleAceBtnClick = ( event: any ): void => {
        const id: string = '#aceBtn' + props.player;
        const button: any = document.querySelector( id );
    
        player.hasAce = true;
        setScore( score + 10 );
        player.score = score;
        button.disabled = player.hasAce;
      }
    
      const handleStayBtnClick = ( event: any ): void => {
        const hitBtnId: string = '#hitBtn' + props.player;
        const hitButton: any = document.querySelector( hitBtnId );
        hitButton.disabled = true;
        // numberStays++;
    
        // if(numberStays === numPlayers){
        //   const hiddenCard: any = document.querySelector('#handDealer div:first-child .left-corner');
        //   const dealerScore: any = document.querySelector('#scoreDealer');
        //   playersDone = true;
        //   hiddenCard.style.visibility = 'visible';
        //   dealerScore.style.visibility = 'visible';
        //   let newCard = deck[deckIndex];
        //   dealerHand.push( newCard );
        //   console.log(newCard, dealerHand);
        //   let cardValue = handTotal( [newCard] );
        //   setScoreDealer( scoreDealer + cardValue );
        // }
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