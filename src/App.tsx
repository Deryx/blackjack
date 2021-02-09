import React, { useState } from 'react';
import Table from '../src/Table';
import Player from '../src/Player';
import Dealer from '../src/Dealer';
import './App.css';
import PlayerPanel from './PlayerPanel';

const players: Player[] = [];
const dealer: Dealer;

let numDecks: number = 8;
let numPlayers: number = 5;

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

const createHands = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
        players[i].hand.push( [] );
    }
}

const createPlayers = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
      players.push( <PlayerPanel player={ i } cards={ players[i].hand } /> );
    }
}

const dealCards = (): void => {
  for( let i = 0; i < 2; i++ ) {
      for( let j = 0; j < numPlayers; j++ ) {
        // if(deck[deckIndex].props.rank === 'A') players[j]._hasAce = true;
        players[j].hand.push( deck[deckIndex] );
        deckIndex++;
      }
      dealer.hand.push( deck[deckIndex++] );
  }
}

function App(){

  return (
    <div className="game">
      <Table dealer={ dealer } players={ players } />
    </div>
  )
}

export default App;
