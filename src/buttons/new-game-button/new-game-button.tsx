import React from 'react';
import './new-game-button.scss';

const NewGameButton = ( props: any ): any => {
    return (
        <div>
          <button id='newGameBtn' onClick={ props.newGameBtnClick }>
            New Game
          </button>
        </div>
      )
  }

  export default NewGameButton;