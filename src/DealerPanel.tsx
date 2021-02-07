import React from 'react';
import PlayerScore from '../src/PlayerScore';
import Hand from '../src/Hand';

const DealerPanel = ( props: any ): any => {
    return (
        <div className="dealerRow">
          <div className="dealerArea">
            <PlayerScore player="Dealer" score={ props.score } />
            <Hand player="Dealer" cards={ props.cards } />
          </div>
        </div>
    )
}

export default DealerPanel;