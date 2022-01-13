import React, { useState } from 'react';
import PlayerScore from '../player-score/player-score';
import HitButton from '../buttons/hit-button/hit-button';
import StayButton from '../buttons/stay-button/stay-button';
import AceButton from '../buttons/ace-button/ace-button';
import Hand from '../hand/hand';
import NewGameButton from '../buttons/new-game-button/new-game-button';
import handTotal from '../handTotal';
import './playing-table.scss';

const Table = ( props: any ): any => {
  const deck: any = props.deck;
  const dealerMinimum: number = 17;
  const bestScore: number = 21;

  let playerControls: any;
  
  const [stays, setStays] = useState( 1 );
  const [hands, setHands] = useState({
    dealerHand: props.dealerCards,
    playerHands: props.playersCards
  });

  const incrementStays = (): void => {
    setStays( stays + 1 );
  }

  const resetStays = (): void => {
    setStays( 1 );
  }

  const gameOver = (): boolean => {
    return stays === playerHands.length;
  }

  const processGameOver = () => {
    const firstCard: any = document.querySelector('.dealerRow #handDealer div:first-child .left-corner');
    const hiddenCards: any = document.querySelectorAll('.dealerRow #handDealer div.card:nth-child(n+2)');
    const dealerScoreArea: any = document.querySelector('#scoreDealer');
    const dealerScore: any = document.querySelector('#dealerSection .score span:nth-child(2)');
    const playerScores: any = document.querySelectorAll( '.playersRow div[id^=score] span:nth-child(2)' );

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

  const handleHitBtnClick = ( event: any ): any => {
    const hitButtonId: string = event.target.id;
    const playerId: number = parseInt( hitButtonId.split('')[hitButtonId.length - 1] );
    const stayButton: any = document.querySelector( '#stayBtn' + playerId );
    const hitButton: any = document.querySelector( '#hitBtn' + playerId );
    const dealerScore: any = document.querySelector('#dealerSection .score span:nth-child(2)');
    const dlrScore: number = parseInt( dealerScore.innerText );
  
    const card: any = deck.shift();
    let playersCards: any = playerHands;
    let playerHand: any = playerHands[playerId];

    playerHand = [...playerHand, card];
    let playerScore: number = handTotal( playerHand );
    if( playerScore > bestScore ) {
      incrementStays();
      stayButton.disabled = true;
      hitButton.disabled = true;

      setGameStatus( playerId, dlrScore );

      if ( gameOver() ) processGameOver();
    }

    playersCards[playerId] = playerHand;

    setHands({
      dealerHand: dealerHand,
      playerHands: playersCards
    });

  }

  const setGameStatus = ( player: number, dealrScore: number ): void => {
    const playerScoreArea: any = document.querySelector( '#score' + player + ' span:nth-child(2)' );
    const playerScore: number = parseInt( playerScoreArea.innerText );
    const playerGameStatus: any = document.querySelector( '#player' + player + 'GameStatus' );

    if( playerGameStatus.innerText === ''){
      if( playerScore <= bestScore && ( dealrScore > bestScore || playerScore > dealrScore ) ) playerGameStatus.innerText = "You win!";
      if( playerScore > bestScore ) playerGameStatus.innerText = "You lose!";
      if( playerScore <= bestScore && dealrScore <= bestScore && playerScore < dealrScore ) playerGameStatus.innerText = "You lose!";
      if( ( playerScore <= bestScore && dealrScore <= bestScore ) && playerScore === dealrScore ) playerGameStatus.innerText = "You tie!";
    }
  }

  const handleStayBtnClick = ( event: any ): void => {
    const stayBtnId: string = event.target.id;
    const idNumber: number = parseInt( stayBtnId.split('')[stayBtnId.length - 1] );
    const stayButton: any = document.querySelector( '#' + stayBtnId );
    const hitBtnId: string = "hitBtn" + idNumber;
    const hitButton: any = document.querySelector( '#' + hitBtnId );

    hitButton.disabled = true;
    stayButton.disabled = true;

    incrementStays();

    if ( gameOver() ) processGameOver();
  }

  const handleAceBtnClick = ( event: any ): void => {
    const aceBtnId: string = event.target.id;
    const playerId: number = parseInt( aceBtnId.split('')[aceBtnId.length - 1]);
    const aceButton: any = document.querySelector( '#aceBtn' + playerId );
    const playerScore: any = document.querySelector( '#player' + playerId + ' div[id=score' + playerId + '] span:nth-child(2)' );
    console.log(aceBtnId);

    let score: number = parseInt( playerScore.innerText ) + 10;
    playerScore.innerText = score;
  
    aceButton.disabled = true;
  }

  const createPlayerControls = (): any => {
    const controls: any = [];

    for( let i = 0; i < playerHands.length; i++ ) {
      controls.push(
        <div id={ 'player' + i } className="playerArea">
          <div id={ 'player' + i + 'Buttons' } className="buttons">
            <HitButton player={ i } hitBtnClick={ handleHitBtnClick } />
            <StayButton player={ i } stayBtnClick={ handleStayBtnClick } />
            <AceButton player={ i } aceBtnClick={ handleAceBtnClick } aceStatus={ !( playerHands[i][0].props.rank === 'A' || playerHands[i][1].props.rank === 'A' ) } />
          </div>
          <div id={ 'player' + i + 'GameStatus' } className="gameStatus"></div>
          <div id={ 'player' + i + 'Cards'} className="cardArea">
            <PlayerScore player={ i } score={ handTotal( playerHands[i] ) } />
            <Hand player={ i } cards={ playerHands[i] } />
          </div>
        </div>
      );
    }

    return controls;
  }

  const dealCards = (): void => {  
    let dealerCards: any = [];
    let playerCards: any = [];

    for( let i = 0; i < playerHands.length; i++ ) {
      playerCards.push( [] );
    }

    for( let i = 0; i < 2; i++ ) {
        for( let j = 0; j < playerHands.length; j++ ) {
          playerCards[j] = [...playerCards[j], deck.shift() ];
        }
        dealerCards = [...dealerCards, deck.shift()];
    }
  
    let dealerScore: number = dealerCards[0].props.rank === 'A' || dealerCards[1].props.rank === 'A' ? handTotal( dealerCards ) + 10 : handTotal( dealerCards );
    while( dealerScore < dealerMinimum ) {
      dealerCards = [...dealerCards, deck.shift()];

      dealerScore = dealerCards[0].props.rank === 'A' || dealerCards[1].props.rank === 'A' ? handTotal( dealerCards ) + 10 : handTotal( dealerCards );
    }

    setHands({
      dealerHand: dealerCards,
      playerHands: playerCards
    });
  }

  const resetGameStatus = ( player: number ): void => {
    const playerGameStatus: any = document.querySelector( '#player' + player + 'GameStatus' );
  
    playerGameStatus.innerText = '';
  }
    
  const handleNewGameClick = ( ) => {
    const firstCard: any = document.querySelector('.dealerRow #handDealer div:first-child .left-corner');
    const hiddenCards: any = document.querySelectorAll('.dealerRow #handDealer div.card:nth-child(n+3)');
    const dealerScoreArea: any = document.querySelector('#scoreDealer');
    const playerScores: any = document.querySelectorAll( '.playersRow div[id^=score] span:nth-child(2)' );
    const stayButtons: any = document.querySelectorAll( "button[id^='stayBtn']" );
    const hitButtons: any = document.querySelectorAll( "button[id^='hitBtn']" );
    const aceButtons: any = document.querySelectorAll( "button[id^='aceBtn']" );

    resetStays();
    dealCards();

    firstCard.style.visibility = 'hidden';

    for( let i = 0; i < hiddenCards.length; i++ ) {
      hiddenCards[i].style.visibility = 'hidden';
    }     

    dealerScoreArea.style.visibility = 'hidden';

    stayButtons.forEach( ( button: any ) => button.disabled = false );
    hitButtons.forEach( ( button: any ) => button.disabled = false );
    aceButtons.forEach( ( button: any ) => button.disabled === true ? false : false );
        
    for( let i = 0; i < playerScores.length; i++ ) {
      resetGameStatus( i );
    }
  }
  
  const { dealerHand, playerHands } = hands;
  playerControls = createPlayerControls();

  return (
    <div className="bj-table">
      <div id="dealerSection">
        <div className="dealerRow">
          <div className="dealerArea">
            <PlayerScore player="Dealer" score={ dealerHand[0].props.rank === 'A' || dealerHand[1].props.rank === 'A' ? handTotal( dealerHand ) + 10 : handTotal( dealerHand ) } />
            <Hand player="Dealer" cards={ dealerHand } />
          </div>
        </div>
      </div>
      <NewGameButton newGameBtnClick={ handleNewGameClick } />
      <div id="playersSection">
        <div className='playersRow'>
          { playerControls }
        </div>
      </div>
    </div>
  )
}
  
export default Table;