import React, { useState } from 'react';
import Dealer from '../src/Dealer';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';
import handTotal from '../src/handTotal';

const dealer: Dealer = new Dealer();

const DealerPanel = ( props: any ): any => {
  const [score, setScore] = useState( handTotal( dealer.hand ) );

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