import React, { PureComponent } from "react";
import "./styles.scss";
import LyricsInputs from "./LyricsInputs.component";
import Answers from "./Answers.component";
import { httpService } from "../../services/http.service";

class LyricsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      seeAnswer: false,
      loadingStatus: false
    };
  }

  submitUserAnswer = (lyrics, type) => {
    switch (type) {
      case "lyrics":
        return this.setState({ loadingStatus: true }, () => {
          return httpService.recognizeByLyrics(lyrics).then(answers => {
            this.setState({ answers, loadingStatus: false, seeAnswer: true });
          });
        });
      case "hum":
        return this.setState({ loadingStatus: true });
      default:
        return undefined;
    }
  };

  toggleSeeAnswer = () =>
    this.setState(prevState => ({ seeAnswer: !prevState.seeAnswer }));

  render() {
    const { submitUserAnswer, toggleSeeAnswer } = this;
    const { seeAnswer, answers } = this.state;
    const { toggleGameStatus } = this.props;
    return seeAnswer ? (
      <Answers
        answers={answers}
        toggleSeeAnswer={toggleSeeAnswer}
        toggleGameStatus={toggleGameStatus}
      />
    ) : (
      <LyricsInputs submitUserAnswer={submitUserAnswer} />
    );
  }
}

export default LyricsPage;
