import React, { useState, useContext } from 'react';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';
import handTotal from '../src/handTotal';

const DealerPanel = ( props: any ): any => {
  const dealerHand: any = props.cards;
  const score = handTotal( dealerHand );

  return (
      <div className="dealerRow">
        <div className="dealerArea">
          <PlayerScore player="Dealer" score={ score } />
          <Hand player="Dealer" cards={ props.cards } />
        </div>
      </div>
  )
}

export default DealerPanel;