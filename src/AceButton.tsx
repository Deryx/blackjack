import React from 'react';

const AceButton = ( props: any ): any => {
    let hasAce = false;
  
    // for( let i = 0; i < hand.length; i++) {
    //   if(hand[i].props.rank === 'A') hasAce = true;
    // }
  
    return (
      <div>
        <button id={ 'aceBtn' + props.player } onClick={ props.aceBtnClick } disabled={ !hasAce }>
          Make Ace 11
        </button>
      </div>
    )
  }

export default AceButton;