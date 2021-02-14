import React from 'react';

const PlayerBank = ( props:any ): any => {
    return (
        <div id={ 'bank' + props.player } className="bank">
          <span>
            bank: $ 
          </span>
          { props.bank }
        </div>
    )
}

export default PlayerBank;