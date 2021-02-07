import React from 'react';

const StayButton = ( props: any ): any => {
    return (
      <div>
        <button id={ 'stayBtn' + props.player } onClick={ props.stayBtnClick }>
          stay
        </button>
      </div>
    )
  }
  
  export default StayButton;