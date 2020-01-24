import React, { PureComponent } from "react";
import LyricsPage from "../LyricsPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import TriesCounter from "./TriesCounter/TriesCounter";
import { AMOUNT_OF_TRIES } from "../../configs/constants";
import "./styles.scss";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successSong: null,
      wrongSongs: [],
      tries: AMOUNT_OF_TRIES,
      resultsCount: {
        machine: 0,
        human: 0
      }
    };
  }

  handleNewAnswer = (winner, guess) => {
    const { tries, resultsCount, wrongSongs } = this.state;

    if (winner === "machine") {
      return this.setState({
        resultsCount: {
          ...resultsCount,
          machine: resultsCount.machine + 1
        },
        successSong: guess
      });
    } else if (tries === 1) {
      return this.setState({
        resultsCount: {
          ...resultsCount,
          human: resultsCount.human + 1
        },
        tries: tries - 1,
        wrongSongs: [...wrongSongs, guess]
      });
    } else {
      return this.setState({
        tries: tries - 1,
        wrongSongs: [...wrongSongs, guess]
      });
    }
  };

  startNewRound = () =>
    this.setState({
      successSong: "",
      wrongSongs: [],
      tries: AMOUNT_OF_TRIES
    });

  render() {
    const { resultsCount, tries, successSong, wrongSongs } = this.state;
    const { machine, human } = resultsCount;
    const { toggleGameStatus } = this.props;
    const { handleNewAnswer, startNewRound } = this;
    return (
      <main className="Dashboard">
        <header className="Dashboard__header">
          <div className="Dashboard__header--exitBtn" onClick={toggleGameStatus}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5466 9.88L18.6666 8L10.6666 16L18.6666 24L20.5466 22.12L14.44 16L20.5466 9.88Z"
                fill="black"
              />
              <mask
                id="mask0"
                maskUnits="userSpaceOnUse"
                x="10"
                y="8"
                width="11"
                height="16"
              >
                <path
                  d="M20.5466 9.88L18.6666 8L10.6666 16L18.6666 24L20.5466 22.12L14.44 16L20.5466 9.88Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0)">
                <rect x="-24" y="-24" width="80" height="80" fill="#AEBCD2" />
              </g>
            </svg>
          </div>
          <div className="Dashboard__header__pointsCounter">
            <div>
              <span>Human:</span>
              <span>{human} POINTS</span>
            </div>
            <div className="Dashboard__header__pointsCounter--dash"/>
            <div>
              <span>Machine:</span>
              <span>{machine} POINTS</span>
            </div>
          </div>
          <TriesCounter tries={tries} />
        </header>
        {tries === 0 || successSong ? (
          <ResultsPage
            toggleGameStatus={toggleGameStatus}
            successSong={successSong}
            wrongSongs={wrongSongs}
            startNewRound={startNewRound}
          />
        ) : (
          <LyricsPage handleNewAnswer={handleNewAnswer} />
        )}
      </main>
    );
  }
}

export default Dashboard;
