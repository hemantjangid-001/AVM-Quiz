import React, { useState } from "react";
import "./ques_ans.css";
import { useEffect } from "react";
import { Howl, Howler } from "howler";
import clock from "../../../assets/clock.mp3";
import correctAnswer from "../../../assets/correct_answer.mp3";
import incorrectAnswer from "../../../assets/incorrect_answer.mp3";
import letsPlay from "../../../assets/lets_play.mp3";
import quest from "../Ques";

const audioClips = [{ sound: clock, label: "clock" }];

const SoundPlay = (src) => {
  const sound = new Howl({
    src,
  });
  sound.play();
};

// const ques_data = [
//   {
//     id: 1,
//     question: "Rolex is Company ",
//     answer: [
//       {
//         text: "photo",
//         correct: false,
//       },
//       {
//         text: "laptop",
//         correct: false,
//       },
//       {
//         text: "watch",
//         correct: true,
//       },
//       {
//         text: "earphone",
//         correct: false,
//       },
//     ],
//   },
// ];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const quesp = quest.map((item) => {
  let arr;

  arr = [];

  for (let i = 0; i < item.incorrect_answers.length; i++) {
    arr.push({ text: item.incorrect_answers[i], correct: false });
  }

  arr.push({ text: item.correct_answer, correct: true });
  shuffle(arr);

  return (item = { ...item, answer: arr });
});

let quest_answer = [quesp[0]];

for (let i = 0; i < 14; i++) {
  let elem = Math.floor(Math.random() * 49) + 1;
  quest_answer.push(quesp[elem]);
}

const Ques_ans = ({
  setStop,
  setQuestionNumber,
  questionNumber,
  QuestionShuffler,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("option");

  useEffect(() => {
    SoundPlay(letsPlay);
  }, []);

  useEffect(() => {
    setQuestion(quest_answer[questionNumber - 1]);

    return () => {};
  }, [quest_answer, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("option active");
    delay(2000, () =>
      setClassName(a.correct ? "option correct" : "option incorrect")
    );
    delay(5000, () => {
      if (a.correct) {
        SoundPlay(correctAnswer);
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          if (questionNumber === 16) {
            setStop(true);
          }
          setSelectedAnswer(null);
        });
      } else {
        SoundPlay(incorrectAnswer);
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="ques_ans_container">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answer.map((a) => {
          return (
            <div
              className={selectedAnswer === a ? className : "option"}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ques_ans;
