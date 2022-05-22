import React from "react";
import "./styles.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

export default function App() {
  const [started, setStarted] = React.useState(false);

  function handleStart() {
    setStarted(true);
  }

  return (
    <div className="container">
      {started ? <Quiz /> : <Start handleStart={handleStart} />}
    </div>
  );
}

