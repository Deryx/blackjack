import React from 'react';

const HitButton = ( props: any ): any => {
    return (
      <div>
        <button id={ 'hitBtn' + props.player } onClick={ props.hitBtnClick } disabled={ props.stayedStatus }>
          hit
        </button>
      </div>
    )
  }
  
export default HitButton; 