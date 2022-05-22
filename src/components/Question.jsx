import React from "react";

export default function Question(props) {
  const q = props.q;
  const incorrect_answers = q.incorrect_answers;
  const selected = q.selected;
  const checked = props.checked;

  const optionsList = q.permutation.map((index) => {
    let clsName = "";

    if (checked) {
      if (index === -1) {
        clsName = "option-correct";
      } else {
        if (index === selected) {
          clsName = "option-incorrect";
        }
      }
    } else {
      if (index === selected) {
        clsName = "option-selected";
      }
    }

    return (
      <button
        key={index}
        className={clsName}
        onClick={() => !checked && props.toggleOption(index)}
      >
        {index === -1 ? q.correct_answer : incorrect_answers[index]}
      </button>
    );
  });

  return (
    <div className="question">
      <h4>{q.question}</h4>
      <div className="options">{optionsList}</div>
    </div>
  );
}
