import React from 'react';
import './playing-table.scss'

const Table = ( props: any ): any => {

  return (
    <div>
      <div id="dealerSection" className="bj-table">
        { props.dealer }
      </div>
      <div id="playerSection" className="playersRow">
        { props.players }
      </div>
    </div>
  )
}
  
export default Table;