import React from "react";

const StartPage = ({ toggleGameStatus }) => {
  return (
    <section>
      <p> Start page</p>
      <p>run game</p>
      <button onClick={toggleGameStatus}>let`s play</button>
    </section>
  );
};

export default StartPage;
