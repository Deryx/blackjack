import React from 'react';

const PlayerScore = ( props:any ): any => {
    return (
        <div id={ 'score' + props.player } className="score">
          <span>
            score: 
          </span>
          { props.score }
        </div>
    )
}

export default PlayerScore;