import handTotal from './handTotal';

const dealCards = ( players: any, dealer: any, deck: any, index: number ): void => {
    const numPlayers: number = players.length;
    const minDealerScore: number = 17;

    for( let i = 0; i < 2; i++ ) {
        for( let j = 0; j < numPlayers; j++ ) {
          if( deck[index].props.rank === 'A' ) players[j].hasAce = true;
          players[j].hand.push( deck.shift() );
          index++;
        }
        if( deck[index].props.rank === 'A' ) dealer.hasAce = true;
        dealer.hand.push( deck.shift() );
    }
    // let dealerScore: number = handTotal( dealer.hand );
    // dealer.score = dealer.hasAce ? dealerScore + 10 : dealerScore;
    // while( dealer.score < minDealerScore ){
    //   index++;
    //   let card: any = deck[index];
    //   let cardValue: number = handTotal( [card] );
    //   dealer.hand.push( card );
    //   dealer.score += cardValue;
    // }
}

export default dealCards;  