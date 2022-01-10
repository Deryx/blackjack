import React from 'react';
import './new-game-button.scss';

const NewGameButton = ( props: any ): any => {
    return (
        <div className='buttons'>
          <button id='newGameBtn' onClick={ props.newGameBtnClick }>
            New Game
          </button>
        </div>
      )
  }

  export default NewGameButton;