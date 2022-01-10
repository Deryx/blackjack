import React from 'react';
import cardDeck from './card-deck/card-deck';
import Table from './playing-table/playing-table';
import handTotal from './handTotal';
import './App.css';

const numPlayers: number = 5;
const dealerMinimum: number = 17;
let dealrHand: any = [];
let playrHands: any = [];
const numberDecks: number = 8;
let arrayIndex: number = 0;

const generateRandomNumber = ( maxNumber: number ): number => {
  return Math.floor( Math.random() * maxNumber );
}

const generateRandomNumberArray = ( arrayLength: number, maxNumber: number, numberArray: number[] ): number[] => {
  if( arrayIndex < arrayLength ) {
    let randomNumber: number = generateRandomNumber(maxNumber);
    numberArray.push(randomNumber);
    arrayIndex++;

    return generateRandomNumberArray(arrayLength, maxNumber, numberArray);
  } else {
    arrayIndex = 0;
    return numberArray;
  }
}

const shuffleDeck = ( cardDeck: any ): any => {
const deckLength: number = cardDeck.length;
let shuffledArray: number[] = [];
const shuffledDeck: any = [];    

generateRandomNumberArray(deckLength, deckLength, shuffledArray);

for ( let i = 0; i < deckLength; i++) {
  shuffledDeck.push( cardDeck[shuffledArray[ i ]] );
}

return shuffledDeck;
}

let deck: any = cardDeck( numberDecks );
deck = shuffleDeck( deck );

const dealCards = (): void => {
  const dealerCards: any = [];
  const playerHands: any = [];

  for( let i = 0; i < numPlayers; i++ ) {
    playerHands.push( [] );
  }

  for( let i = 0; i < 2; i++ ) {
      for( let j = 0; j < numPlayers; j++ ) {
        playerHands[j] = [...playerHands[j], deck.shift() ];
      }
      dealerCards.push( deck.shift() );
  }

  while( handTotal( dealerCards ) < dealerMinimum ) dealerCards.push( deck.shift() );

  dealrHand = [...dealerCards];
  playrHands = [...playerHands];  
}

const startGame = () => {
  dealCards();
}

startGame();

const App = () => {

  return (
    <div className='game'>
        <Table dealerCards={ dealrHand } playersCards={ playrHands } deck={ deck } />
    </div>
  )
}

export default App;
