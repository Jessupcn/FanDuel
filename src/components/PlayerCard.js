import React from 'react';

const PlayerCard = ({ player, submitGuess, guessSubmitted }) => {
  return (
    <div className="playerCard flex-col">
      <div className="playerImageBorder">
        <img src={player.images.default.url} className="playerImage" />
      </div>
      <button
        onClick={() => {
          submitGuess(player.id);
        }}
        className="playerButton"
        disabled={guessSubmitted}
      >{`${player.first_name} ${player.last_name}`}</button>
      {guessSubmitted && (
        // Cover edge case for a player without fppg
        <h1>{`FPPG: ${player.fppg ? player.fppg.toFixed(2) : '0.00'}`}</h1>
      )}
    </div>
  );
};

export default PlayerCard;
