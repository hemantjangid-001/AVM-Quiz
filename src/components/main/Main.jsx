import React, { useState } from "react";
import { useEffect } from "react";
import "./main.css";
import Ques_ans from "./ques_ans/Ques_ans";
import moneyPyramid from "../Moneypyramid";
import Timer from "./Timer";
import Confetti from "react-confetti";
import quest from "./Ques";

const Main = ({ setQuestionNumber, questionNumber, username }) => {
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

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

  function QuestionShuffler() {
    shuffle(quest);
  }

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  function handleClick() {
    setStop(false);
    QuestionShuffler();
    setQuestionNumber(1);
    setEarned("$ 0");
  }

  return (
    <div className="main-container">
      {stop ? (
        <div className="end-txt">
          {earned != "$ 0" && <Confetti />}
          <h1>
            {earned === "$ 0"
              ? `Sorry ${username}! `
              : `Congratulations ${username}!`}
          </h1>
          <h2>You Earned : {earned}</h2>
          <div>
            <button className="startButton" onClick={handleClick}>
              New Game
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="main-top">
            <div className="timer">
              <Timer setStop={setStop} questionNumber={questionNumber} />
            </div>
          </div>
          <div className="main-bottom">
            <Ques_ans
              setStop={setStop}
              setQuestionNumber={setQuestionNumber}
              questionNumber={questionNumber}
              QuestionShuffler={QuestionShuffler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
