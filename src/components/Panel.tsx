import { useEffect, useState } from 'react'
import { QuestionLibray } from '../lib/question_library'
import { EnumGameStatus } from '../models/enum'
import { IAnswer, IQuestion } from '../models/QA'
import { useDispatch, useGlobalState } from '../store'
import {
  CORRECT_QUESTION_BY_HUMAN,
  CORRECT_QUESTION_BY_ROBOT,
  END_GAME,
  END_ROUND,
  ESCAPE_BY_HUMAN,
  INCORRECT_QUESTION_BY_HUMAN,
  START_GAME,
  START_ROUND,
} from '../store/actionTypes'
import { ProgressBar } from './ProgressBar'

const MAX_COUNT_DOWN = 10

export function Panel() {
  const state = useGlobalState()
  const dispatch = useDispatch()
  const [countDown, setCountDown] = useState(MAX_COUNT_DOWN)
  const [btnTitle, setBtnTitle] = useState('开始答题')
  const [question, setQuestion] = useState<IQuestion>()
  const [questionIndex, setQuestionIndex] = useState(-1)
  const [humanAnswerIndex, setHumanAnswerIndex] = useState(-1)
  const [robotAnswerIndex, setRobotAnswerIndex] = useState(-1)
  const [picked, setPicked] = useState(false)
  const { game, round, human, robot } = state

  useEffect(() => {
    if (round.questions.length > 0) {
      setQuestionIndex(0)
    }
  }, [round.questions])

  useEffect(() => {
    if (game.status === EnumGameStatus.Ready) {
      setBtnTitle('开始答题')
      dispatch({
        type: START_GAME,
      })
      return
    }
    if (round.status === EnumGameStatus.Doing) {
      setBtnTitle('逃跑')
      return
    }
    if (round.status === EnumGameStatus.Finished) {
      setBtnTitle('再来一局')
    }
  }, [round.status])

  useEffect(() => {
    if (round.questions.length && questionIndex >= round.questions.length) {
      endRound()
      return
    }
    setQuestion(round.questions[questionIndex])
  }, [round.questions, questionIndex])

  function onBtnClick() {
    if (game.roundNum - game.currentRound <= 0) {
      alert('您今天已经没有游戏次数了，请明天再来吧！')
      setBtnTitle('明天再来挑战吧！')
      dispatch({
        type: END_GAME,
      })
      return
    }
    if (btnTitle === '开始答题' || btnTitle === '再来一局') {
      startRound()
    }
    if (btnTitle === '逃跑') {
      if (
        window.confirm('确定逃跑吗？逃跑本轮将不在获得积分，且失去一次对局次数')
      ) {
        dispatch({
          type: ESCAPE_BY_HUMAN,
        })
        dispatch({
          type: END_ROUND,
        })
        setCountDown(MAX_COUNT_DOWN)
      }
    }
  }

  // 开始对局
  function startRound() {
    setQuestionIndex(-1)
    dispatch({
      type: START_ROUND,
      payload: QuestionLibray,
    })
  }

  useEffect(() => {
    let timer = setInterval(() => {
      // 当对局为挂起或者完成状态，停止倒计时
      if (
        round.status === EnumGameStatus.Finished ||
        round.status === EnumGameStatus.Suspend
      ) {
        clearTimer()
        return
      }
      if (questionIndex >= 0) {
        // 超时处理
        if (countDown <= 1) {
          clearTimer()
          setQuestionIndex((index) => index + 1)
          setCountDown(MAX_COUNT_DOWN)
          return
        }
        setCountDown((count) => count - 1)
      }
    }, 1000)

    function clearTimer() {
      timer && clearInterval(timer)
    }
    return clearTimer
  }, [countDown, questionIndex, round.status])

  // 结束对局
  function endRound() {
    dispatch({
      type: END_ROUND,
    })
  }

  // 选择答案
  function pickerAnswer(question: IQuestion, answer: IAnswer, index: number) {
    setHumanAnswerIndex(index)
    setPicked(true)
    // 选择正确
    if (answer.isCorrect) {
      dispatch({
        type: CORRECT_QUESTION_BY_HUMAN,
      })
      // 机器人随机选择一个选项
      const robotIndex = Math.round(Math.random() * 3)
      const robotAnswer = question.answers[robotIndex]
      setRobotAnswerIndex(robotIndex)
      // 机器人选择正确
      if (robotAnswer.isCorrect) {
        dispatch({
          type: CORRECT_QUESTION_BY_ROBOT,
        })
      }
    }
    // 选择错误，默认机器人选择正确
    if (!answer.isCorrect) {
      dispatch({
        type: INCORRECT_QUESTION_BY_HUMAN,
      })
    }
    setTimeout(() => {
      setPicked(false)
      setHumanAnswerIndex(-1)
      setRobotAnswerIndex(- 1)
      setCountDown(MAX_COUNT_DOWN)
      setQuestionIndex((index) => index + 1)
    }, 1000)
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
        <button
          disabled={game.roundNum - game.currentRound <= 0}
          className="button"
          onClick={onBtnClick}
          style={{
            backgroundColor:
              game.roundNum - game.currentRound <= 0 ? '#ccc' : '#1890ff',
          }}
        >
          {game.roundNum - game.currentRound <= 0
            ? '今天次数已用完，明天再来挑战吧'
            : btnTitle}
        </button>
        <header className="header">
          <span>{human.name}</span>
          <span>VS</span>
          <span>{robot.name}</span>
        </header>
        <div className="content">
          <ProgressBar showValue value={human.roundScore}></ProgressBar>
          {round.status === EnumGameStatus.Finished ? (
            <div className="result">
              <div>
                {human.roundScore}&nbsp;:&nbsp;{robot.roundScore}
              </div>
              <div>
                {human.roundScore > robot.roundScore
                  ? '你赢了!'
                  : human.roundScore == robot.roundScore
                  ? '平局'
                  : '你输了！'}
              </div>
            </div>
          ) : (
            <div className="question">
              <div className="title">{question?.title}</div>
              <div className="answer">
                {question?.answers.map((o, index) => (
                  <div key={index} className="answer-item-wrap">
                    <div
                      className={`${
                        humanAnswerIndex == index ? 'answer-picker' : ''
                      }`}
                    ></div>
                    <div
                      className="answer-item"
                      onClick={() => pickerAnswer(question, o, index)}
                      style={{
                        backgroundColor:
                          picked && o.isCorrect ? '#00ff00' : '#1890ff',
                      }}
                    >
                      {o.title}
                    </div>
                    <div
                      className={`${
                        robotAnswerIndex == index ? 'answer-picker' : ''
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ProgressBar showValue value={robot.roundScore}></ProgressBar>
        </div>
      </section>
    </main>
  )
}
