import React from 'react';
import './hand.scss';

const Hand = ( props: any ): any => {
    return (
      <div id={ 'hand' + props.player } className="cards">
        { props.cards }
      </div>
    )
  }
  
  export default Hand;