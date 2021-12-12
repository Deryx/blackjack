import React from 'react';
import PlayerScore from '../../player-score/player-score';
import Hand from '../../hand/hand';
import handTotal from '../../handTotal';

const DealerPanel = ( props: any ): any => {
  const hand: any = props.data.hand;
  let score: number = handTotal( hand );

  if( props.data.hand[0].props.rank === 'A' || props.data.hand[1].props.rank === 'A' ) score += 10;

  return (
      <div className="dealerRow">
        <div className="dealerArea">
          <div><PlayerScore player="Dealer" score={ score } /></div>
          <Hand player="Dealer" cards={ hand } />
        </div>
      </div>
  )
}

export default DealerPanel;