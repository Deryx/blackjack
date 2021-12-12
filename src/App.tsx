import React from 'react';
import Player from './Player';
import Dealer from './Dealer';
import PlayerPanel from './panels/player/player-panel';
import DealerPanel from './panels/dealer/dealer-panel'
import cardDeck from './card-deck/card-deck';
import Table from './playing-table/playing-table';
import handTotal from './handTotal';

const App = () => {
  const dealer: Dealer = new Dealer();
  const players: Player[] = [];
  const numPlayers: number = 5;
  const numberDecks: number = 8;
  const dealerMinimum: number = 17;
  const dealerPanel: any = [];
  const playerPanels: any = [];

  let arrayIndex: number = 0;
  var index: number = 0;
    
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

  const createPlayerPanels = (): void => {
    dealerPanel.push( <DealerPanel data={ dealer } deck={ deck } /> );
    for(let i = 0; i < numPlayers; i++){
      playerPanels.push( <PlayerPanel player={ i } data={ players[i] } deck={ deck } />);
    }
  }

  const createPlayers = (): void => {
    for( let i = 0; i < numPlayers; i++ ) {
      let player: Player = new Player();
      players.push( player );
    }
  }

  const dealCards = ( players: any, dealer: any, deck: any, index: number ): void => {
    const numPlayers: number = players.length;

    for( let i = 0; i < 2; i++ ) {
        for( let j = 0; j < numPlayers; j++ ) {
          var currentCard = deck.shift();
          if( currentCard.props.rank === 'A' ) players[j].hasAce = true;
          players[j].hand.push( currentCard );
        }
        currentCard = deck.shift();
        if( currentCard.props.rank === 'A' ) dealer.hasAce = true;
        dealer.hand.push( currentCard );
    }
    let dealerScore = handTotal( dealer.hand );
    if ( dealer.hasAce ) dealerScore += 10;
    while ( dealerScore < dealerMinimum ) {
      const newCard = deck.shift();
      dealer.hand.push( newCard );
      dealerScore += handTotal( [ newCard ] );
    }
  }

  let deck: any = cardDeck( numberDecks );
  deck = shuffleDeck( deck );

  const startGame = () => {
    createPlayers();
    dealCards( players, dealer, deck, index );
    createPlayerPanels();
  }

  startGame();

  return (
    <div className="game">
      <Table dealer={ dealerPanel } players={ playerPanels } />
    </div>
  )
}

export default App;
