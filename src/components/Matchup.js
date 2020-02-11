import React from 'react';
import PlayerCard from './PlayerCard';
import GuessCount from './GuessCount';

const Matchup = ({
  activeGame,
  currentMatchup,
  submitGuess,
  guessSubmitted,
  nextMatchup,
  guessCount,
  correctCount,
  resetGame,
  correctGuess
}) => {
  return (
    <div id="matchup">
      {!activeGame ? (
        <div className="playButtonContainer flex-center">
          <button className="playButton" onClick={() => nextMatchup()}>
            Play
          </button>
        </div>
      ) : (
        <div className="matchContainer flex-spread">
          {currentMatchup.map(player => {
            return (
              <PlayerCard
                key={player.id}
                player={player}
                submitGuess={submitGuess}
                guessSubmitted={guessSubmitted}
              />
            );
          })}
          <div className="divider" />
          <div className="vsCircle">
            <p>VS</p>
          </div>
          {guessSubmitted &&
            (correctCount === 10 ? (
              <p className="winnerMessage">You Won!</p>
            ) : (
              <p
                className={`winnerMessage ${!correctGuess && 'incorrectText'}`}
              >
                {correctGuess ? 'Correct' : 'Incorrect'}
              </p>
            ))}
          {guessSubmitted &&
            (correctCount < 10 ? (
              <button
                id="nextMatchupButton"
                onClick={() => nextMatchup()}
                className="nextMatchupButton playerButton"
              >
                Next Matchup
              </button>
            ) : (
              <button
                id="restartButton"
                onClick={() => resetGame()}
                className="nextMatchupButton playerButton"
              >
                Restart
              </button>
            ))}
          <GuessCount correctCount={correctCount} guessCount={guessCount} />
        </div>
      )}
    </div>
  );
};

export default Matchup;
