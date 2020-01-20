import React, { PureComponent } from "react";
import "./styles.scss";
import LyricsInputsComponent from "./LyricsInputs.component";
import Answers from "./Answers.component";

class LyricsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      seeVariants: false,
      loadingStatus: false,
    };
  }

  submitUserAnswer = () => {};

  render() {
    const { submitUserAnswer } = this;
    const { seeVariants } = this.state;
    return seeVariants ? (
      <Answers />
    ) : (
      <LyricsInputsComponent submitUserAnswer={submitUserAnswer} />
    );
  }
}

export default LyricsPage;
