import React, { useState } from 'react';
import './App.css';

const suitsObj: any = {
  Clubs : '\u2663',
  Diamonds : '\u2666',
  Hearts : '\u2665',
  Spades : '\u2660'
}

const ranksObj: any = {
  A : 1,
  2 : 2,
  3 : 3,
  4 : 4,
  5 : 5,
  6 : 6,
  7 : 7,
  8 : 8,
  9 : 9,
  10 : 10,
  J : 10,
  Q : 10,
  K : 10
}

let deckIndex: number = 0;
let deck: any = [];
const stayStatus: any = [];
// const splitStatus: any = [];
const players: any = [];
const dealerHand: any = [];
const playerHand: any = [];

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

const Card = ( props: any ) => {  
  let cardClass: any = [ 'card' ];
  cardClass.push( ( props.suit === suitsObj[ 'Diamonds' ] || props.suit === suitsObj[ 'Hearts' ] ) ? 'red' : 'black' );
  cardClass = cardClass.join( ' ' );

  return (
    <div className={ cardClass }>
      <div className="left-corner">
        <div>{ props.rank }</div>
        <div>{ props.suit }</div>
      </div>
      <div className="right-corner">
        <div className="invert">{ props.suit }</div>
        <div className="invert">{ props.rank }</div>
      </div>
    </div>
  )
}

const CardDeck = ( numberDecks: number ): any => {
  const suits: any = Object.values( suitsObj );
  const ranks: any = Object.keys( ranksObj );
  const deck: any = [];

  for( let i = 0; i < numberDecks; i++ ) {
    for( let suit of suits ) {
      for( let rank of ranks ){
        deck.push( <Card suit={ suit } rank={ rank } /> )
      }
    }
  }

  return deck
}

let playerTotal = ( cards: any ): number => {
  let total: number = 0;

  for( let i = 0; i < cards.length; i++ ) {
    let card: any = cards[ i ].props.rank;
    total += ranksObj[ card ];
  }

  return total;
}

const Score = ( props: any ) => {
  return (
    <div id={ 'score' + props.player } className="score">
      <span>
        score: 
      </span>
      { props.score }
  </div>
)
}

const Hand = ( props: any ) => {
  return (
    <div id={ 'hand' + props.player } className="cards">
      { props.cards }
    </div>
  )
}

const DealerArea = ( props: any ) => {
  return (
    <div className="dealerRow">
      <div className="dealerArea">
        <Hand cards={ props.cards } />
      </div>
    </div>
  )
}

const HitButton = ( props: any ) => {
  return (
    <div>
      <button id={ 'hitBtn' + props.player } onClick={ props.hitBtnClick } disabled={ stayStatus[ props.player ]}>
        hit
      </button>
    </div>
  )
}

const StayButton = ( props: any ) => {
  const handleStayBtnClick = ( event: any ) => {
    const id: string = '#hitBtn' + props.player;
    const button: any = document.querySelector( id );
    button.disabled = true;
  }

  return (
    <div>
      <button id={ 'stayBtn' + props.player } onClick={ handleStayBtnClick }>
        stay
      </button>
    </div>
  )
}

const AceButton = ( props: any ) => {
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

const PlayerArea = ( props: any ) => {
  const player: any = players[ props.player ];
  let playerScore = playerTotal( player._hand );
  const [score, setScore] = useState( playerScore );

  const handleHitBtnClick = ( event: any ) => {
    const newCard = deck[deckIndex];
    const cardValue = playerTotal( [ newCard ] );
    player._hand.push( newCard );
    setScore( score + cardValue );
    deckIndex++;
  }

  const handleAceBtnClick = ( event: any ) => {
    const id: string = '#aceBtn' + props.player;
    const button: any = document.querySelector( id );

    player._hasAce = true;
    setScore( score + 10 );
    player._score = score;
    button.disabled = player._hasAce;
  }

  return (
    <div id={ 'player' + props.player }>
      <div className="buttons">
        <HitButton player={ props.player } hitBtnClick={ handleHitBtnClick } />
        <StayButton player={ props.player } />
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

const Table = ( props: any ) => {
  const plyrAreas: any = [];

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
