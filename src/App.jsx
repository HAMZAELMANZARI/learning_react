import { useEffect, useState } from 'react'
import './App.css'

const roomOptions = ['نعم', 'لا']

function App() {
  const [countdown, setCountdown] = useState(5)
  const [showQuestion, setShowQuestion] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  useEffect(() => {
    if (showQuestion) {
      return undefined
    }

    if (countdown === 0) {
      setShowQuestion(true)
      return undefined
    }

    const timer = setTimeout(() => {
      setCountdown((current) => current - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, showQuestion])

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
  }

  return (
    <div className="app-shell">
      <div className="challenge-panel">
        {!showQuestion ? (
          <div className="countdown-state">
            <p className="room-label">الغرفة الأولى</p>
            <h2>سيبدأ التحدي خلال</h2>
            <div className="countdown-number">{countdown}</div>
            <p className="countdown-text">ثانية</p>
          </div>
        ) : (
          <div className="question-state">
            <div className="exercise-header">
              <h1>Exercise</h1>
              <span className="help-badge">?</span>
            </div>

            <div className="prompt-box">
              <p className="question">هل تقبل التحدي؟</p>
            </div>

            <div className="options" role="listbox" aria-label="Choose yes or no">
              {roomOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option)}
                >
                  <span className="radio" aria-hidden="true">
                    <span className="radio-dot" />
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <button type="button" className="next-room-btn">
                الانتقال إلى الغرفة التالية
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
