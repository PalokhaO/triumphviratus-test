import React, { PureComponent } from "react";
import LyricsPage from "../LyricsPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import TriesCounter from "./TriesCounter/TriesCounter";
import { AMOUNT_OF_TRIES } from "../../configs/constants";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successSong: "",
      wrongSongs: [],
      tries: AMOUNT_OF_TRIES,
      resultsCount: {
        machine: 0,
        human: 0
      }
    };
  }

  handleNewAnswer = (winner, song) => {
    const { tries, resultsCount, wrongSongs } = this.state;

    if (winner === "machine") {
      return this.setState({
        resultsCount: {
          ...resultsCount,
          machine: resultsCount.machine + 1
        },
        successSong: song
      });
    } else if (tries === 1){
      return this.setState({
        resultsCount: {
          ...resultsCount,
          human: resultsCount.human + 1
        },
        tries: tries - 1,
        wrongSongs: [...wrongSongs, song]
      });
    } else {
      return this.setState({
        tries: tries - 1,
        wrongSongs: [...wrongSongs, song]
      });
    }
  };

  startNewRound = () => this.setState({
    successSong: "",
    wrongSongs: [],
    tries: AMOUNT_OF_TRIES,
  });

  render() {
    const { resultsCount, tries, successSong, wrongSongs } = this.state;
    const { machine, human } = resultsCount;
    const { toggleGameStatus } = this.props;
    const { handleNewAnswer, startNewRound } = this;
    return (
      <main>
        <header>
          <div>
            <div>
              <p>human:</p>
              <p>{human} points</p>
            </div>
            <div>
              <p>machine:</p>
              <p>{machine} points</p>
            </div>
            <TriesCounter tries={tries}/>
          </div>
        </header>
        {tries === 0 || successSong ? (
          <ResultsPage
            toggleGameStatus={toggleGameStatus}
            successSong={successSong}
            wrongSongs={wrongSongs}
            startNewRound={startNewRound}
          />
        ) : (
          <LyricsPage
            handleNewAnswer={handleNewAnswer}
          />
        )}
      </main>
    );
  }
}

export default Dashboard;
