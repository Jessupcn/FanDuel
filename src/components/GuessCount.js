import React from 'react';

const GuessCount = ({ correctCount, guessCount }) => {
  return (
    <div id="guessContainer">
      <p
        id="guessCount"
        className="scoreInfo"
      >{`Total Guesses: ${guessCount}`}</p>
      <p
        id="correctCount"
        className="scoreInfo"
      >{`Total Correct: ${correctCount}/10`}</p>
    </div>
  );
};

export default GuessCount;
