import React, { PureComponent } from "react";
import LyricsPage from "../LyricsPage";
import ResultsPage from "../ResultsPage/ResultsPage";

const AMOUNT_OF_TRIES = 5;

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successSongs: [],
      wrongSongs: [],
      tries: AMOUNT_OF_TRIES,
      resultsCount: {
        machineAns: 0,
        humanAns: 0
      },
      loading: false,
    };
  }


  substractTries = () =>
    this.setState(prevState => ({ tries: prevState.tries - 1 }));


  render() {
    const {
      resultsCount: { machineAns, humanAns },
      tries
    } = this.state;
    return (
      <main>
        <header>
          <div>
            <div>
              <p>human:</p>
              <p>{humanAns} points</p>
            </div>
            <div>
              <p>machine:</p>
              <p>{machineAns} points</p>
            </div>
          </div>
        </header>
        {tries === 0 ? (
          <ResultsPage />
        ) : (
          <LyricsPage/>
        )}
      </main>
    );
  }
}

export default Dashboard;
