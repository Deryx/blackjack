import React from 'react';
import Suits from './Suits';

const Card = ( props: any ): any => {  
    let cardClass: any = [ 'card' ];
    cardClass.push( ( props.suit === Suits[ 'Diamonds' ] || props.suit === Suits[ 'Hearts' ] ) ? 'red' : 'black' );
    cardClass = cardClass.join( ' ' );
  
    return (
      <div className={ cardClass }>
        <div className="left-corner">
          <div>{ props.rank }</div>
          <div>{ props.suit }</div>
        </div>
        <div className="right-corner">
          <div className="invert">{ props.suit }</div>
          <div className="invert">{ props.rank }</div>
        </div>
      </div>
    )
}

export default Card;