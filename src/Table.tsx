import React from 'react';
import Player from '../src/Player';
import CardDeck from '../src/CardDeck';

const players: any = [];
const playerHand: any = [];
const dealerHand: any = [];

let deck: any = [];
let deckIndex: number = 0;
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

const createPlayers = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
      const player = new Player();
      players.push( player )
    }
  }

const createHands = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
        playerHand.push( [] );
    }
}

const createPlayersArea = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
      plyrAreas.push( <PlayerArea player={ i } cards={ players[i]._hand } /> );
    }
}

const dealCards = (): void => {
for( let i = 0; i < 2; i++ ) {
    for( let j = 0; j < numPlayers; j++ ) {
    // if(deck[deckIndex].props.rank === 'A') players[j]._hasAce = true;
    playerHand[j].push( deck[deckIndex] );
    deckIndex++;
    }
    dealerHand.push( deck[deckIndex++] );
}

const Table = ( props: any ): any => {
    const plyrAreas: any = [];
    const numPlayers = parseInt( props.numberPlayers );
  
    deck = shuffleDeck( CardDeck( props.numberDecks ) );
  
  
      for( let k = 0; k < numPlayers; k++ ) {
        const hand = playerHand[k];
        players[k]._hand = hand;
        players[k]._score = playerTotal( hand );
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
  
export default Table;