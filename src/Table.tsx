import React from 'react';

const Table = ( props: any ): any => {
  return (
    <div id="dealerSection" className="bjTable">
      { props.dealer }
      <div id="playerSection" className="playersRow">
        { props.players }
      </div>
    </div>
  )
}
  
export default Table;