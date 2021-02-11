import React from 'react';

const AceButton = ( props: any ): any => {  
    return (
      <div>
        <button id={ 'aceBtn' + props.player } onClick={ props.aceBtnClick } disabled={ !props.aceStatus }>
          Make Ace 11
        </button>
      </div>
    )
  }

export default AceButton;