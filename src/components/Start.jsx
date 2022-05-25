import React from "react";
import Blob1 from "../images/blob-1.png";
import Blob2 from "../images/blob-2.png";
import "../styles.css";

export default function Start(props) {
  return (
    <div className="start">
      <img src={Blob1} alt="" className="blob-1" />
      <h1>Quizzical</h1>
      <p>Answer some questions to learn how good you are.</p>
      <button className="start-quiz" onClick={props.handleStart}>
        <h3>Start quiz</h3>
      </button>
      <img src={Blob2} alt="" className="blob-2" />
    </div> 
  );
}
