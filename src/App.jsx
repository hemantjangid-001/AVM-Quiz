import React, { useState } from "react";
import "./app.css";
import Main from "./components/main/Main";
import Pyramid from "./components/pyramid/Pyramid";
import Start from "./components/start/Start";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [username, setUsername] = useState(null);

  return (
    <div className="app-container">
      {username ? (
        <>
          <Main
            setQuestionNumber={setQuestionNumber}
            questionNumber={questionNumber}
            username={username}
          />
          <Pyramid
            setQuestionNumber={setQuestionNumber}
            questionNumber={questionNumber}
          />
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
