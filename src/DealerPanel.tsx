import React from 'react';
import PlayerScore from './PlayerScore';
import Hand from './Hand';

const DealerPanel = ( props: any ): any => {
  return (
      <div className="dealerRow">
        <div className="dealerArea">
          <div><PlayerScore player="Dealer" score={ props.data.score } /></div>
          <Hand player="Dealer" cards={ props.data.hand } />
        </div>
      </div>
  )
}

export default DealerPanel;