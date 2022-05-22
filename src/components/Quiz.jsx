import React from "react";
import Blob1 from "../images/blob-1.png";
import Blob2 from "../images/blob-2.png";
import "../styles.css";
import Question from "./Question";
import { nanoid } from "nanoid";

// https://opentdb.com/api.php?amount=10

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(error);

  React.useEffect(() => {
    const getPermutation = (incorrectCount) => {
      const inArray = [-1];
      const outArray = [];

      for (let i = 0; i < incorrectCount; i++) {
        inArray.push(i);
      }

      while (inArray.length > 1) {
        const ind = Math.floor(Math.random() * inArray.length);
        outArray.push(inArray.splice(ind, 1)[0]);
      }

      outArray.push(inArray[0]);
      return outArray;
    };

    const htmlDecode = (input) => {
      if (htmlDecode) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      } else {
        return input;
      }
    };

    const setQuizFromData = (data) => {
      /*
          permutation - array of indices where -1 means correct answer and index >= 0 is and index in incorrect answers array; 
                        it's only used for type === "multiple"

          selected - index of selected option in 'permutation' array; for type === boolean -1 means correct answer and 0 means incorrdect answer;
                     -2 means no selected option
          */

      setQuiz(
        data.results.map((q) => {
          let permutation;

          if (q.type === "boolean") {
            permutation = q.correct_answer === "True" ? [-1, 0] : [0, -1];
          } else {
            permutation = getPermutation(q.incorrect_answers.length);
          }

          return {
            ...q,
            question: htmlDecode(q.question),
            correct_answer: htmlDecode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((incAnsw) =>
              htmlDecode(incAnsw)
            ),
            permutation,
            selected:
              -2 /* -2 means none is selected, -1 means correct is selected, >= 0 means incorrect is selected */,
            id: nanoid(),
          };
        })
      );
    };

    console.log("checked changed");

    if (!checked) {
      console.log("checked === false");
      setQuiz([]);

      (async () => {
        try {
          const resp = await fetch("https://opentdb.com/api.php?amount=10");
          const data = await resp.json();
          console.log(data);

          if (data.response_code === 0) {
            setQuizFromData(data);
          } else {
            setError(true);
          }
        } catch (e) {
          setError(true);
        }
      })();
    }
  }, [checked]);

  const getCorrectCount = () => {
    let count = 0;

    quiz.forEach((q) => {
      if (q.selected === -1) count++;
    });

    return count;
  };

  const toggleOption = (id, index) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((q) => {
        const newSelected = q.selected === index ? -2 : index;

        return q.id === id ? { ...q, selected: newSelected } : q;
      })
    );
  };

  const handleCheckAnswers = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const qList = quiz.map((q) => (
    <Question
      key={q.id}
      q={q}
      checked={checked}
      toggleOption={(index) => {
        toggleOption(q.id, index);
      }}
    />
  ));

  console.log(qList);

  return (
    <div className="quiz">
      <img
        src={Blob1}
        alt=""
        className="blob-1"
        onMouseDown={(event) => {
          event.preventDefault();
        }}
      />
      {error ? (
        <h1 className="error">Error. Refresh the page, please.</h1>
      ) : quiz.length > 0 ? (
        <>
          <div className="quiz-area">{qList}</div>
          <div className="ctrl-area">
            {checked && (
              <h3>{`You scored ${getCorrectCount()}/${
                quiz.length
              } correct answers`}</h3>
            )}
            <button onClick={handleCheckAnswers}>
              {checked ? <h3>Play again</h3> : <h3>Check answers</h3>}
            </button>
          </div>
        </>
      ) : (
        <h1 className="loading-info">Loading quiz...</h1>
      )}
      <img
        src={Blob2}
        alt=""
        className="blob-2"
        onMouseDown={(event) => {
          event.preventDefault();
        }}
      />
    </div>
  );
}
