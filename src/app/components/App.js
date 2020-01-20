import React, { useState } from "react";
import StartPage from "./StartPage/StartPage.component";
import "../main.scss";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [gameStatus, setGameStatus] = useState(true);
  const toggleGameStatus = () => setGameStatus(!gameStatus);
  return gameStatus ? (
    <Dashboard />
  ) : (
    <StartPage toggleGameStatus={toggleGameStatus} />
  );
}

export default App;
