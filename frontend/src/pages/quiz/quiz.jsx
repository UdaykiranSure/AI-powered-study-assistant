import { useState } from 'react'
import useGetQuestions from '../../hooks/useGetQuesions.js'
import '../../index.css'

const Quiz =   () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [performance,setPerformance] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const {loading,questions: questions} =   useGetQuestions() 
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0, 
    wrongAnswers: 0,
  })

  console.log(typeof questions)

  
  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    console.log(selectedAnswer)
   
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions?.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (index,answer) => {
    setSelectedAnswerIndex(index)
    console.log("selected",index)
    if (answer == index) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }
console.log(questions)
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  if(questions.length > 0){
    console.log(questions)
    const { question,  options, answer } = questions?.[activeQuestion]

  return (
     <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions?.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {options.map((option, index) => (
              
              <li
                onClick={() => onAnswerSelected(index,answer)}
                key={option}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {option}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext()} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions?.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions?.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  )}
}

export default Quiz