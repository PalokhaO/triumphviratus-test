import React from "react";
import styles from './StartPage.module.css';

const StartPage = ({ toggleGameStatus }) => {
  return (
    <section className={styles.wrapper}>
      <h1>Music Akinator</h1>    
      <p>
        Forgot the song but know lyrics or can sing it?
        The music akinator will guess the song!
      </p>
      <button onClick={toggleGameStatus}>Let`s Play</button>
    </section>
  );
};

export default StartPage;
