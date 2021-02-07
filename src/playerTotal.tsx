import Ranks from '../src/Ranks';

const playerTotal = ( cards: any ): number => {
    let total: number = 0;
  
    for( let i = 0; i < cards.length; i++ ) {
      let card: any = cards[ i ].props.rank;
      total += Ranks[ card ];
    }
  
    return total;
}
  
export default playerTotal;