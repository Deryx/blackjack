import React, { useState } from 'react';
import Ranks from '../src/Ranks';
import CardDeck from '../src/CardDeck';
import './App.css';

let deckIndex: number = 0;
let deck: any = [];
let numberStays: number = 0;
let numPlayers: number = 0;
let playersDone: boolean = false;

const stayStatus: any = [];
// const splitStatus: any = [];
const players: any = [];
const dealerHand: any = [];
const playerHand: any = [];
// const minDealerScore: number = 17;

class Player {
  private _hand: any;
  private _score: number;
  private _hasAce: boolean;

  constructor() {
    this._hand = [];
    this._score = 0;
    this._hasAce = false;
  }

  get hand(): any {
    return this._hand;
  }

  set hand(hand: any) {
    this._hand = hand;
  }

  get score(): number {
    return this._score;
  }

  set score(score: number) {
    this._score = score;
  }
}

const shuffleDeck = ( cardDeck: any ): any => {
  const deckLength: number = cardDeck.length;
  let shuffledArray: number[] = [];
  const shuffledDeck: any = [];
  let index = 0;

  const generateRandomNumber = ( maxNumber: number ): number => {
    return Math.floor( Math.random() * maxNumber );
  }
  
  const generateRandomNumberArray = ( arrayLength: number, maxNumber: number, numberArray: number[] ): number[] => {
    if( index < arrayLength ) {
      let randomNumber: number = generateRandomNumber(maxNumber);
      if (numberArray.indexOf(randomNumber) === -1) {
        numberArray.push(randomNumber);
        index++;
      }
  
      return generateRandomNumberArray(arrayLength, maxNumber, numberArray);
    } else {
      index = 0;
      return numberArray;
    }
  }

  generateRandomNumberArray(deckLength, deckLength, shuffledArray);

  for ( let i = 0; i < deckLength; i++) {
    shuffledDeck.push( cardDeck[shuffledArray[ i ]] );
  }

  return shuffledDeck;
}

let playerTotal = ( cards: any ): number => {
  let total: number = 0;

  for( let i = 0; i < cards.length; i++ ) {
    let card: any = cards[ i ].props.rank;
    total += Ranks[ card ];
  }

  return total;
}

const Score = ( props: any ): any => {
  return (
    <div id={ 'score' + props.player } className="score">
      <span>
        score: 
      </span>
      { props.score }
    </div>
  )
}

const Hand = ( props: any ): any => {
  return (
    <div id={ 'hand' + props.player } className="cards">
      { props.cards }
    </div>
  )
}

const DealerArea = ( props: any ): any => {
  const dealer: any = dealerHand;
  const dealerScore = playerTotal( dealer );

  return (
    <div className="dealerRow">
      <div className="dealerArea">
        <Score player="Dealer" score={ dealerScore } />
        <Hand player="Dealer" cards={ props.cards } />
      </div>
    </div>
  )
}

const HitButton = ( props: any ): any => {
  return (
    <div>
      <button id={ 'hitBtn' + props.player } onClick={ props.hitBtnClick } disabled={ stayStatus[ props.player ]}>
        hit
      </button>
    </div>
  )
}

const StayButton = ( props: any ): any => {
  return (
    <div>
      <button id={ 'stayBtn' + props.player } onClick={ props.stayBtnClick }>
        stay
      </button>
    </div>
  )
}

const AceButton = ( props: any ): any => {
  const player: any = players[ props.player ];
  const hand = player._hand;
  let hasAce = player._hasAce;

  for( let i = 0; i < hand.length; i++) {
    if(hand[i].props.rank === 'A') hasAce = true;
  }

  return (
    <div>
      <button id={ 'aceBtn' + props.player } onClick={ props.aceBtnClick } disabled={ !hasAce }>
        Make Ace 11
      </button>
    </div>
  )
}

// const SplitButton = ( props: any ) => {

// }

const PlayerArea = ( props: any ): any => {
  const player: any = players[ props.player ];
  const playerScore = playerTotal( player._hand );
  const [score, setScore] = useState( playerScore );
  const [scoreDealer, setScoreDealer] = useState( playerTotal( dealerHand ) );
  console.log(scoreDealer);

  const handleHitBtnClick = ( event: any ) => {
    const newCard = deck[deckIndex];
    const cardValue = playerTotal( [ newCard ] );
    player._hand.push( newCard );
    setScore( score + cardValue );
    deckIndex++;
  }

  const handleAceBtnClick = ( event: any ): void => {
    const id: string = '#aceBtn' + props.player;
    const button: any = document.querySelector( id );

    player._hasAce = true;
    setScore( score + 10 );
    player._score = score;
    button.disabled = player._hasAce;
  }

  const handleStayBtnClick = ( event: any ): void => {
    const hitBtnId: string = '#hitBtn' + props.player;
    const hitButton: any = document.querySelector( hitBtnId );
    hitButton.disabled = true;
    numberStays++;

    if(numberStays === numPlayers){
      const hiddenCard: any = document.querySelector('#handDealer div:first-child .left-corner');
      const dealerScore: any = document.querySelector('#scoreDealer');
      playersDone = true;
      hiddenCard.style.visibility = 'visible';
      dealerScore.style.visibility = 'visible';
      let newCard = deck[deckIndex];
      dealerHand.push( newCard );
      console.log(newCard, dealerHand);
      let cardValue = playerTotal( [newCard] );
      setScoreDealer( scoreDealer + cardValue );
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
        <Score player={ props.player } score={ score } />
        <Hand player={ props.player } cards={ props.cards } />
      </div>
    </div>
  )
}

const Table = ( props: any ): any => {
  const plyrAreas: any = [];
  numPlayers = parseInt( props.numberPlayers );

  deck = shuffleDeck( CardDeck( props.numberDecks ) );

  const createPlayers = (): void => {
    for( let i = 0; i < props.numberPlayers; i++ ) {
      const player = new Player();
      players.push( player )
    }
  }

  const createHands = (): void => {
    for( let i = 0; i < props.numberPlayers; i++ ) {
      playerHand.push( [] );
    }
  }

  const dealCards = (): void => {
    for( let i = 0; i < 2; i++ ) {
      for( let j = 0; j < props.numberPlayers; j++ ) {
        // if(deck[deckIndex].props.rank === 'A') players[j]._hasAce = true;
        playerHand[j].push( deck[deckIndex] );
        deckIndex++;
      }
      dealerHand.push( deck[deckIndex++] );
    }

    for( let k = 0; k < props.numberPlayers; k++ ) {
      const hand = playerHand[k];
      players[k]._hand = hand;
      players[k]._score = playerTotal( hand );
    }
  }

  const createPlayersArea = (): void => {
    for( let i = 0; i < props.numberPlayers; i++ ) {
      plyrAreas.push( <PlayerArea player={ i } cards={ players[i]._hand } /> );
    }
  }

  createPlayers();
  createHands();
  dealCards();
  createPlayersArea();
  
  return (
    <div className="bjTable">
      <DealerArea cards={ dealerHand } />
      <div className="playersRow">
        { plyrAreas }
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
