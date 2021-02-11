import React from 'react';

const Table = ( props: any ): any => {
  return (
    <div className="bjTable">
      { props.dealer }
      <div className="playersRow">
        { props.players }
      </div>
    </div>
  )
}
  
export default Table;