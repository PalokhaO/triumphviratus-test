import React, { PureComponent } from "react";
import "./styles.scss";
import LyricsInputs from "./SubPages/LyricsInputs.component";
import Answers from "./SubPages/Answers.component";
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
        return this.setState({ loadingStatus: true }, () => {
          return httpService.recognizeByHum(lyrics).then(answers => {
            this.setState({ answers, loadingStatus: false, seeAnswer: true });
          })
        });
      case "clip":
        return this.setState({ loadingStatus: true }, () => {
          return httpService.recognizeByClip(lyrics).then(answers => {
            this.setState({ answers, loadingStatus: false, seeAnswer: true });
          })
        });
      default:
        return undefined;
    }
  };

  toggleSeeAnswer = () =>
    this.setState(prevState => ({ seeAnswer: !prevState.seeAnswer }));

  handleUserAnswer = (winner, song) => {
    const {handleNewAnswer} = this.props;
    handleNewAnswer(winner, song);
    return this.toggleSeeAnswer();
  };

  render() {
    const { submitUserAnswer, handleUserAnswer } = this;
    const { seeAnswer, answers, loadingStatus } = this.state;
    const { toggleGameStatus } = this.props;
    return seeAnswer ? (
      <Answers
        answers={answers}
        handleUserAnswer={handleUserAnswer}
        toggleGameStatus={toggleGameStatus}
      />
    ) : (
      <LyricsInputs submitUserAnswer={submitUserAnswer} loadingStatus={loadingStatus} />
    );
  }
}

export default LyricsPage;
