import React from 'react';
import Table from '../src/Table';
import cardDeck from '../src/CardDeck';
import Player from '../src/Player';
import Dealer from '../src/Dealer';
import PlayerPanel from './PlayerPanel';
import DealerPanel from './DealerPanel'
import './App.css';


function App(){
  const players: any = [];
  const dealer: any = new Dealer();
  
  let numDecks: number = 8;
  let numPlayers: number = 5;
  
  let deckIndex: number = 0;
  let index = 0;
    
  const generateRandomNumber = ( maxNumber: number ): number => {
      return Math.floor( Math.random() * maxNumber );
  }
  
  const generateRandomNumberArray = ( arrayLength: number, maxNumber: number, numberArray: number[] ): number[] => {
    if( index < arrayLength ) {
      let randomNumber: number = generateRandomNumber(maxNumber);
      numberArray.push(randomNumber);
      index++;
  
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
      let player: any = new Player();
      players.push( player );
    }
  }
  
  const dealCards = (): void => {
    for( let i = 0; i < 2; i++ ) {
        for( let j = 0; j < numPlayers; j++ ) {
          if( deck[deckIndex].props.rank === 'A' ) players[j].hasAce = true;
          players[j].hand.push( deck[deckIndex] );
          deckIndex++;
        }
        dealer.hand.push( deck[deckIndex++] );
    }
  }
    
  let deck: any = cardDeck( numDecks );
  deck = shuffleDeck( deck );

  const dealerPanel: any = [];
  const playerPanels: any = [];

  createPlayers( numPlayers );
  dealCards();

  dealerPanel.push( <DealerPanel cards={ dealer.hand } /> );
  for(let i = 0; i < numPlayers; i++){
    playerPanels.push( <PlayerPanel player={ i } data={ players[i] } />);
  }

  return (
    <div className="game">
      <Table dealer={ dealerPanel } players={ playerPanels } />
    </div>
  )
}

export default App;
