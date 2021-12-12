import React from 'react';
import './hit-button.scss';

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