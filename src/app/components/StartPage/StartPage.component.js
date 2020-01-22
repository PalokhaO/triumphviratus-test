import React from "react";
import styles from './StartPage.module.css';

const StartPage = ({ toggleGameStatus }) => {
  return (
    <section className={styles.wrapper}>
      <img className={styles.logo} src="/images/ai.gif"></img>
      <h1>Music Akinator</h1>    
      <span>
        Forgot the song but know lyrics or can sing it?
      </span>
      <span>
        The music akinator will guess the song!
      </span>
      <button className={styles.button} onClick={toggleGameStatus}>Let`s Play</button>
    </section>
  );
};

export default StartPage;
