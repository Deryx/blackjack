import React from 'react';
import Suits from './Suits';
import Ranks from './Ranks';
import Card from './Card';

const deck: any = [];

const CardDeck = ( numberDecks: number ): any => {
    const suits: any = Object.values( Suits );
    const ranks: any = Object.keys( Ranks );
  
    for( let i = 0; i < numberDecks; i++ ) {
      for( let suit of suits ) {
        for( let rank of ranks ){
          deck.push( <Card suit={ suit } rank={ rank } /> )
        }
      }
    }
  
    return deck
}
  
export default CardDeck; 