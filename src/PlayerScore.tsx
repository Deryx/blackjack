import React, { useState } from 'react';
import playerTotal from '../src/playerTotal';

const PlayerScore = ( props:any ): any => {
    const [score, setScore] = useState( playerTotal( props.cards ) );

    setScore( (score) => playerTotal( props.cards ) );
    
    return (
        <div id={ 'score' + props.player } className="score">
          <span>
            score: 
          </span>
          { score }
        </div>
    )
}

export default PlayerScore;