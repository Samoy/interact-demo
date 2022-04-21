import { useEffect, useState } from 'react'
import { QuestionLibray } from '../lib/question_library'
import { IAnswer, IQuestion } from '../models/QA'
import { useDispatch, useGlobalState } from '../store'
import {
  CORRECT_QUESTION_BY_HUMAN,
  CORRECT_QUESTION_BY_ROBOT,
  INCORRECT_QUESTION_BY_HUMAN,
  START_GAME,
  START_ROUND,
} from '../store/actionTypes'
import { ProgressBar } from './ProgressBar'

export function Panel() {
  const state = useGlobalState()
  const dispatch = useDispatch()
  const [countDown, setCountDown] = useState(10)
  const [question, setQuestion] = useState<IQuestion>()
  const { game, round, human, robot } = state
  let timeout: NodeJS.Timeout

  useEffect(() => {
    nextQuestion(0)
  }, [round.questions])

  /**
   *开始对局
   */
  function startRound() {
    dispatch({
      type: START_ROUND,
      payload: QuestionLibray,
    })
  }

  /**
   * 结束对局
   */
  function endRound() {}

  /**
   * 开始下一问题
   */
  function nextQuestion(index: number) {
    setQuestion(round.questions[index])
  }

  /**
   * 选择问题
   */
  function pickerAnswer(answer: IAnswer) {
    // 选择正确
    if (answer.isCorrect) {
      dispatch({
        type: CORRECT_QUESTION_BY_HUMAN,
      })
    }
    // 选择错误，默认机器人选择正确
    if (!answer.isCorrect) {
      dispatch({
        type: INCORRECT_QUESTION_BY_HUMAN,
      })
    }
    timeout && clearTimeout(timeout)
    setCountDown(10)
  }

  return (
    <main className="panel">
      <header className="header">
        <span>
          累计得分：<span className="accent">{human.totalScore}</span>
        </span>
        <div className="countdown">{countDown}</div>
        <span>
          剩余局数：
          <span className="accent">{game.roundNum - game.currentRound}</span>
        </span>
      </header>
      <section className="section">
        <button className="button" onClick={startRound}>
          开始答题
        </button>
        <header className="header">
          <span>{human.name}</span>
          <span>VS</span>
          <span>{robot.name}</span>
        </header>
        <div className="content">
          <ProgressBar showValue value={human.roundScore}></ProgressBar>
          <div className="question">
            <div className="title">{question?.title}</div>
            <div className="answer">
              {question?.answers.map((o, index) => (
                <div
                  key={index}
                  className="answer-item"
                  onClick={() => pickerAnswer(o)}
                >
                  {o.title}
                </div>
              ))}
            </div>
          </div>
          <ProgressBar showValue value={robot.roundScore}></ProgressBar>
        </div>
      </section>
    </main>
  )
}
