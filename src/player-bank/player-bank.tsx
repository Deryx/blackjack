import React from 'react';

const PlayerBank = ( props:any ): any => {
    return (
        <div id={ 'bank' + props.player } className="bank">
          <div>
            bank: 
          </div>
          <div>
            $ { props.bank }
          </div>
        </div>
    )
}

export default PlayerBank;