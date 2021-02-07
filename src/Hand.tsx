import React from 'react';

const Hand = ( props: any ): any => {
    return (
      <div id={ 'hand' + props.player } className="cards">
        { props.cards }
      </div>
    )
  }
  
  export default Hand;