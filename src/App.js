import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Header, Matchup } from './components';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [matchupMap, setMatchupMap] = useState({});
  const [currentMatchup, setCurrentMatchup] = useState([]);
  const [guessSubmitted, setGuessSubmitted] = useState(false);
  const [activeGame, setActiveGame] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      'https://gist.githubusercontent.com/liamjdouglas/bb40ee8721f1a9313c22c6ea0851a105/raw/6b6fc89d55ebe4d9b05c1469349af33651d7e7f1/Player.json'
    );
    setPlayers(response.data.players);
  };

  /**
   * @param {*} indexArray: array of indices of 2 players
   *
   * A helper function to check if this matchup has been
   * played already.
   */
  const isDuplicateMatchup = indexArray => {
    const lowerIndex =
      indexArray[0] < indexArray[1] ? indexArray[0] : indexArray[1];
    const higherIndex =
      indexArray[0] > indexArray[1] ? indexArray[0] : indexArray[1];

    if (matchupMap[lowerIndex] && matchupMap[lowerIndex][higherIndex]) {
      return true;
    }
    return false;
  };

  /**
   * Retrieve 2 random numbers in an array
   */
  const getRandomMatchup = () => {
    let firstIndex = Math.floor(Math.random() * players.length);
    let secondIndex = Math.floor(Math.random() * players.length);

    /**
     * If matchup has been played already, the indices
     * are identical, or the players have identical fppg
     * scores get a new matchup
     */
    while (
      secondIndex === firstIndex ||
      isDuplicateMatchup([firstIndex, secondIndex]) ||
      players[firstIndex].fppg === players[secondIndex].fppg
    ) {
      secondIndex = Math.floor(Math.random() * players.length);
    }

    return [firstIndex, secondIndex];
  };

  const addMatchupToMap = indexArray => {
    const lowerIndex =
      indexArray[0] < indexArray[1] ? indexArray[0] : indexArray[1];
    const higherIndex =
      indexArray[0] > indexArray[1] ? indexArray[0] : indexArray[1];
    const mapCopy = { ...matchupMap };
    if (mapCopy[lowerIndex]) {
      mapCopy[lowerIndex][higherIndex] = true;
    } else {
      mapCopy[lowerIndex] = { [higherIndex]: true };
    }
    setMatchupMap(mapCopy);
  };

  const submitGuess = id => {
    const winningId =
      currentMatchup[0].fppg > currentMatchup[1].fppg
        ? currentMatchup[0].id
        : currentMatchup[1].id;

    if (id === winningId) {
      setCorrectGuess(true);
      setCorrectCount(correctCount + 1);
    }
    setGuessCount(guessCount + 1);
    setGuessSubmitted(true);
  };

  const nextMatchup = () => {
    const newMatchup = getRandomMatchup();
    const playerMatchup = newMatchup.map(index => players[index]);

    if (!activeGame) {
      setActiveGame(true);
    }
    if (correctGuess) {
      setCorrectGuess(false);
    }
    addMatchupToMap(newMatchup);
    setGuessSubmitted(false);
    setCurrentMatchup(playerMatchup);
  };

  const resetGame = () => {
    setGuessCount(0);
    setCorrectCount(0);
    setMatchupMap({});
    nextMatchup();
  };

  /**
   * useEffect calls initial fetch once on App component mount.
   */
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="app">
      <Header />
      <p id="instructions">
        Guess which player has the higher FPPG (Fantasy Points Per Game)!
      </p>
      <Matchup
        getRandomMatchup={getRandomMatchup}
        players={players}
        setCurrentMatchup={setCurrentMatchup}
        currentMatchup={currentMatchup}
        submitGuess={submitGuess}
        guessSubmitted={guessSubmitted}
        nextMatchup={nextMatchup}
        guessCount={guessCount}
        correctCount={correctCount}
        resetGame={resetGame}
        activeGame={activeGame}
        correctGuess={correctGuess}
      />
    </div>
  );
};

export default App;
