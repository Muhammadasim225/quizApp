import { useReducer, useState } from "react";
import sound from './assets/correct-6033.mp3'
import buzzer from './assets/buzzer.mp3'

const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    answers: ["Italy", "Paris", "Ukraine", "Malaysia"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    text: "What is 2 + 2?",
    answers: ["3", "4", "6", "2"],
    correctAnswer: "4",
  },
  {
    id: 3,
    text: "Which country is credited with inventing ice cream?",
    answers: ["China", "Palestine", "Israel", "Brazil"],
    correctAnswer: "China",
  },
  {
    id: 4,
    text: "What is the process of adding yeast to dough to create carbon dioxide bubbles?",
    answers: ["Fermentation", "Frying", "Mixing", "Boiling"],
    correctAnswer: "Fermentation",
  },
];

const quizReducer = (state, action) => {
  switch (action.type) {
    case "Start_THE_QUIZ":
      return { ...state, status: "Started", currentIndex: 0 };
    case "NXT_QUESTION":
      if (state.currentIndex < state.questions.length - 1) {
        return { ...state, currentIndex: state.currentIndex + 1 };
      } else {
        return { ...state, status: "COMPLETED" };
      }
    case "PREV_QUESTION":
      if (state.currentIndex > 0) {
        return { ...state, currentIndex: state.currentIndex - 1 };
      }
      return state;

      case "ANSWER_SELECTED":
       return { ...state, hasAnswered: true };
      case "RESET_ANSWER_STATUS":
        return { ...state, hasAnswered: false };
    
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(quizReducer, { status: "NOT_STARTED", currentIndex: 0, questions,hasAnswered:false });
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
const sound12=new Audio(sound);
const sound123=new Audio(buzzer);
  const checkAnswer = (selectedAnswer, index) => {
    if (state.hasAnswered) return;
    const correctAnswer = state.questions[state.currentIndex].correctAnswer;
    setSelectedAnswerIndex(index);
    dispatch({ type: "ANSWER_SELECTED" });

    

    if (selectedAnswer === correctAnswer) {
      console.log("Correct!!!!");
      sound12.play();
      
    } else {
      console.log("Incorrect!");
      sound123.play();
    }
  };

  const goToNextQuestion = () => {
    dispatch({ type: "NXT_QUESTION" });
    setSelectedAnswerIndex(null);
    dispatch({ type: "RESET_ANSWER_STATUS" }); // Reset hasAnswered for the next question
  };

  return (
    <div className="flex justify-center items-center min-h-screen lg:bg-gradient-to-r lg:from-indigo-500 lg:to-purple-600 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:bg-gradient-to-r sm:from-indigo-500 sm:to-purple-600 fixed w-full">
      {/* Start Quiz Button */}
      {state.status === "NOT_STARTED" && (
        <div className=" xl:p-12 p-8 rounded-xl shadow-xl w-full max-w-md text-center bg-white mt-10 ">
          <h1 className="lg:text-3xl md:text-4xl sm:text-4xl text-3xl font-bold text-blue-600 mb-6 xl:mb-6 xl:text-4xl">Welcome to the Quiz!</h1>
          <p className="lg:text-xl md:text-[22px] text-[19px] sm:text-[22px]  text-gray-600 lg:mb-10 md:mb-8 sm:mb-8 mb-8">Test your knowledge with this fun quiz!</p>
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white lg:px-8 lg:py-4 md:px-6 md:py-2 sm:px-8 cursor-pointer  sm:py-3 px-6 py-[12px] rounded-full text-xl font-semibold hover:from-green-500 hover:to-blue-600 transition-all"
            onClick={() => dispatch({ type: "Start_THE_QUIZ" })}
          >
            Start Quiz
          </button>
        </div>
      )}

      {/* Quiz Started */}
      {state.status === "Started" && (
        <div className=" bg-white lg:pt-10 md:pt-10 sm:pt-10  lg:px-8 md:px-6 sm:px-[24px] px-6 pt-10 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className=" lg:text-2xl md:text-2xl sm:text-2xl text-[24px] font-semibold text-gray-800">{state.questions[state.currentIndex].text}</h2>

          <div className="space-y-4">
            {state.questions[state.currentIndex].answers.map((answer, index) => (
              <div
                key={index}
                onClick={() => checkAnswer(answer, index)}
                className={`cursor-pointer p-4 rounded-xl text-xl transition-all ${
                  selectedAnswerIndex === index
                    ? answer === state.questions[state.currentIndex].correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } ${state.hasAnswered ? "pointer-events-none" : ""}`}
              >
                {answer}
              </div>
            ))}
          </div>

          <div className="flex justify-between lg:mt-6 md:mt-4  sm:mt-10 mt-10 mb-5 space-x-4">
            <button
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-400 transition-all cursor-pointer"
              onClick={() => dispatch({ type: "PREV_QUESTION" })}
              disabled={state.currentIndex === 0}
            >
              Previous
            </button>

            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-all cursor-pointer"
              onClick={goToNextQuestion}
              disabled={state.currentIndex === state.questions.length}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Quiz Completed */}
      {state.status === "COMPLETED" && (
        <div className=" xl:p-12 p-8 rounded-xl shadow-xl w-full max-w-md text-center bg-white mt-10 ">
          <h2 className="lg:text-3xl md:text-4xl sm:text-4xl text-3xl font-bold text-blue-600 mb-6 xl:mb-6 xl:text-4xl">Quiz Completed!</h2>
          <p className="lg:text-xl md:text-[22px] text-[19px] sm:text-[22px]  text-gray-600 lg:mb-10 md:mb-8 sm:mb-8 mb-8 ">You have completed the quiz. Thank you for playing!</p>
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white lg:px-8 lg:py-4 md:px-6 md:py-2 sm:px-8 sm:py-3 px-6 py-[12px] rounded-full text-xl font-semibold hover:from-green-500 cursor-pointer hover:to-blue-600 transition-all"
            onClick={() => location.reload()}
          >
            Play Again
          </button>

        </div>
      )}
    </div>
  );
}

export default App;
