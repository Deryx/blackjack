import React, { useContext } from 'react';
import DeckContext from './DeckContext';
import Player from '../src/Player';
import Dealer from '../src/Dealer';
import PlayerPanel from './PlayerPanel';
import DealerPanel from './DealerPanel'
import cardDeck from '../src/CardDeck';
import Table from '../src/Table';
import handTotal from '../src/handTotal';
import './App.css';

const App = () => {
  const deckContext = useContext( DeckContext );
  const numPlayers: number = 5;
  const numberDecks: number = 8;
  const players: any = [];
  const dealer: any = new Dealer();
  const minDealerScore: number = 17;

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

  const createPlayers = ( numPlayers: number ): void => {
    for( let i = 0; i < numPlayers; i++ ) {
      let player: any = new Player();
      players.push( player );
    }
  }
  
  const dealCards = (): void => {
    let index: number = 0;

    for( let i = 0; i < 2; i++ ) {
        for( let j = 0; j < numPlayers; j++ ) {
          if( deck[index].props.rank === 'A' ) players[j].hasAce = true;
          players[j].hand.push( deck[index] );
          index++;
        }
        if( deck[index].props.rank === 'A' ) dealer.hasAce = true;
        dealer.hand.push( deck[index++] );
    }
    let dealerScore: number = handTotal( dealer.hand );
    dealer.score = dealer.hasAce ? dealerScore + 10 : dealerScore;
    while( dealer.score < minDealerScore ){
      index++;
      let card: any = deck[index];
      let cardValue: number = handTotal( [card] );
      dealer.hand.push( card );
      dealer.score += cardValue;
    }
    deckContext.index = index;
  }

  const dealerPanel: any = [];
  const playerPanels: any = [];

  createPlayers( numPlayers );
  dealCards();

  dealerPanel.push( <DealerPanel data={ dealer } deck={ deck } /> );
  for(let i = 0; i < numPlayers; i++){
    playerPanels.push( <PlayerPanel player={ i } data={ players[i] } deck={ deck } />);
  }

  return (
    <div className="game">
      <Table dealer={ dealerPanel } players={ playerPanels } cardDeck={ deck } />
    </div>
  )
}

export default App;
