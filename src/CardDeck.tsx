import React from 'react';
import Suits from '../src/Suits';
import Ranks from '../src/Ranks';
import Card from '../src/Card';


const CardDeck = ( numberDecks: number ): any => {
    const suits: any = Object.values( Suits );
    const ranks: any = Object.keys( Ranks );
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
  
export default CardDeck; 