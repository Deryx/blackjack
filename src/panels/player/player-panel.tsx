import React, { useState } from 'react';
import HitButton from '../../buttons/hit-button/hit-button';
import StayButton from '../../buttons/stay-button/stay-button';
import AceButton from '../../buttons/ace-button/ace-button';
import PlayerScore from '../../player-score/player-score';
import PlayerBank from '../../player-bank/player-bank';
import Hand from '../../hand/hand';
import handTotal from '../../handTotal';
import './player-panel.scss';

const PlayerPanel = ( props: any ): any => {
  const deck: any = props.deck;
  const playerHand: any = props.data.hand;
  const [hand, setHand] = useState( playerHand );
  const [score, setScore] = useState( handTotal( hand ) );
  let stays: number = 0;

  const handleAceBtnClick = ( event: any ): void => {
    const aceBtnId: string = '#aceBtn' + props.player;
    const aceButton: any = document.querySelector( aceBtnId );

    setScore( score + 10 );
    aceButton.disabled = true;
  }

  const handleHitBtnClick = ( event: any ): any => {
    const card: any = deck.shift();
    const cardValue: number = handTotal( [card] );
    playerHand.push( card );
    setHand( playerHand );
    setScore( score + cardValue );
  }

  const setGameStatus = ( player: number, dealrScore: number ): void => {
    const playerScoreArea: any = document.querySelector( '#score' + player + ' span:nth-child(2)' );
    const playerScore: number = parseInt( playerScoreArea.innerText );
    const playerGameStatus: any = document.querySelector( '#player' + player + 'GameStatus' );

    playerGameStatus.innerText = ( ( playerScore <= 21 && playerScore > dealrScore ) || dealrScore > 21 ) ? 'You won!' : 'You lost!';
  }

  const handleStayBtnClick = (event: any): void => {
    const stayBtnId: string = '#stayBtn' + props.player;
    const stayButton: any = document.querySelector( stayBtnId );
    const hitBtnId: string = '#hitBtn' + props.player;
    const hitButton: any = document.querySelector( hitBtnId );
    const hitButtons: any = document.querySelectorAll( "button[id^='hitBtn']" );
    const aceBtnId: string = '#aceBtn' + props.player;
    const aceButton: any = document.querySelector( aceBtnId );

    hitButton.disabled = true;
    aceButton.disabled = true;
    stayButton.disabled = true;

    let numHitButtons: number = hitButtons.length;
    for (let i = 0; i < numHitButtons; i++) {
      if ( hitButtons[i].hasAttribute('disabled') )
        stays++;
    }

    if (stays === numHitButtons) {
      const firstCard: any = document.querySelector('.dealerRow #handDealer div:first-child .left-corner');
      const hiddenCards: any = document.querySelectorAll('.dealerRow #handDealer div.card:nth-child(n+2)');
      const dealerScoreArea: any = document.querySelector('#scoreDealer');
      const dealerScore: any = document.querySelector('#dealerSection .score span:nth-child(2)');
      const playerScores: any = document.querySelectorAll( '#playerSection div[id^=score] span:nth-child(2)' );
      firstCard.style.visibility = 'visible';
      for( let i = 0; i < hiddenCards.length; i++ ) {
        hiddenCards[i].style.visibility = 'visible';
      }     
      dealerScoreArea.style.visibility = 'visible';
      const dlrScore: number = parseInt( dealerScore.innerText );
      for( let i = 0; i < playerScores.length; i++ ) {
        setGameStatus( i, dlrScore );
      }
    }
  }

  return (
    <div id={ 'player' + props.player } className="playerArea">
      <div id={ 'player' + props.player + 'Buttons' } className="buttons">
        <HitButton player={ props.player } hitBtnClick={ handleHitBtnClick } />
        <StayButton player={ props.player } stayBtnClick={ handleStayBtnClick } />
      </div>
      <br />
      <div id={ 'player' + props.player + 'AceButton' } className="buttons">
        <AceButton player={ props.player } aceBtnClick={ handleAceBtnClick } aceStatus={ props.data.hasAce } />
      </div>
      <div id={ 'player' + props.player + 'GameStatus' } className="gameStatus"></div>
      <div id={ 'player' + props.player + 'Cards'} className="cardArea">
        <PlayerScore player={ props.player } score={ score } />
        <Hand player={ props.player } cards={ props.data.hand } />
      </div>
      <div id={ 'player' + props.player + 'Bank' } className="bankArea">
        <PlayerBank player={ props.player } bank={ props.data.bank } />
      </div>
    </div>
  )
}

export default PlayerPanel;