import React from 'react';
import './player-score.scss';

const PlayerScore = ( props:any ): any => {
    return (
        <div id={ 'score' + props.player } className="score">
          <span>
            score: 
          </span>
          <span>
            { props.score }
          </span>
        </div>
    )
}

export default PlayerScore;