import React, { PureComponent } from "react";
import "./styles.scss";
import LyricsInputs from "./SubPages/LyricsInputs.component";
import Answers from "./SubPages/Answers.component";
import { httpService } from "../../services/http.service";

const defaultState = {
  answers: [],
  seeAnswer: false,
  loadingStatus: false
};

class LyricsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  submitUserAnswer = (lyrics, type) => {
    return this.setState({ loadingStatus: true }, async () => {
      let answersPromise;
      switch (type) {
        case "lyrics":
          answersPromise = httpService.recognizeByLyrics(lyrics);
          break;
        case "hum":
          answersPromise = httpService.recognizeByHum(lyrics);
          break;
        case "clip":
          answersPromise = httpService.recognizeByClip(lyrics);
          break;
        default:
          answersPromise = Promise.resolve([]);
          break;
      }

      const newAnswers = await answersPromise;

      const commonAnswers = this.state.answers.filter(oldAnswer =>
        newAnswers.find(newAnswer => newAnswer.id === oldAnswer.id)
      );
      const oldAnswersFiltered = this.state.answers.filter(oldAnswer =>
        !newAnswers.find(newAnswer => newAnswer.id === oldAnswer.id)
      );
      const newAnswersFiltered = newAnswers.filter(oldAnswer =>
        !this.state.answers.find(newAnswer => newAnswer.id === oldAnswer.id)
      );

      this.setState({
        loadingStatus: false,
        seeAnswer: true,
        answers: [
          ...commonAnswers,
          ...newAnswersFiltered,
          ...oldAnswersFiltered,
        ]
      });
    });
  };

  toggleSeeAnswer = () =>
    this.setState(prevState => ({ seeAnswer: !prevState.seeAnswer }));

  handleUserAnswer = (winner, guess) => {
    const {handleNewAnswer} = this.props;
    this.setState({
      answers: this.state.answers.filter(answer => answer.title === guess.title)
    });
    handleNewAnswer(winner, guess);
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
