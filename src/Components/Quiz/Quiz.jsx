import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [curQuestion, setCurQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState();
  const [isCorrect, setIsCorrect] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/quizData.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleOptionClick = (option, correctAnswer) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setCurQuestion(curQuestion + 1);
    setSelectedOption(undefined);
    setIsCorrect(undefined);
  };

  const handleResetQuiz = () => {
    setCurQuestion(1);
    setScore(0);
    setSelectedOption(undefined);
    setIsCorrect(undefined);
  };

  return (
    <>
      <div className={styles.quizContainer}>
        <div className={styles.quiz}>
          <h1 className={styles.quizHeader}>Quiz App</h1>
          {questions.length > 0 && curQuestion <= questions.length ? (
            questions
              .filter((ele) => ele.id === curQuestion)
              .map((question) => (
                <div key={question.id}>
                  <h2 className={styles.questionTitle}>
                    {`[ ${question.id} ] `} {question.question}
                  </h2>
                  <ul>
                    {question.options.map((option, index) => {
                      const isOptionCorrect = option === question.answer;
                      return (
                        <li
                          key={index}
                          className={`${styles.option} ${
                            selectedOption
                              ? isOptionCorrect
                                ? styles.correctOption
                                : selectedOption === option
                                ? styles.incorrectOption
                                : ""
                              : ""
                          }`}
                          onClick={() =>
                            handleOptionClick(option, question.answer)
                          }
                        >
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                  <div className={styles.btnContainer}>
                    <button onClick={handleNextQuestion} className={styles.btn}>
                      Next
                    </button>
                  </div>
                  <div className={styles.index}>
                    {question.id} of {questions.length}
                  </div>
                </div>
              ))
          ) : (
            <div className={styles.finish}>
              <p>
                You scored {score} out of {questions.length}!
              </p>
              <div className={styles.btnContainer}>
                <button onClick={handleResetQuiz} className={styles.btn}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mountains}></div>
    </>
  );
};

export default Quiz;
