import { IGlobalState } from './state'
import { IAction } from './index'
import { EnumGameStatus } from '../models/enum'
import {
  CORRECT_QUESTION_BY_HUMAN,
  CORRECT_QUESTION_BY_ROBOT,
  END_GAME,
  END_ROUND,
  ESCAPE_BY_HUMAN,
  INCORRECT_QUESTION_BY_HUMAN,
  INCORRECT_QUESTION_BY_ROBOT,
  START_GAME,
  START_ROUND,
  TIMEOUT_BY_HUMAN,
} from './actionTypes'

/**
 * 每题分数
 */
const SCORE_PER_QUESTION = 20

export const reducer = (state: IGlobalState, action: IAction): IGlobalState => {
  const { human, robot, game, round } = state
  const { type, payload } = action
  switch (type) {
    // -----以下是人类有关的行为Start-----
    case CORRECT_QUESTION_BY_HUMAN:
      // 回答正确问题，加分20
      return {
        ...state,
        human: {
          ...human,
          roundScore: human.roundScore + SCORE_PER_QUESTION,
          totalScore: human.totalScore + SCORE_PER_QUESTION,
        },
      }
    // 人类回答错误问题或者回答超时，机器人加分20
    case INCORRECT_QUESTION_BY_HUMAN:
    case TIMEOUT_BY_HUMAN:
      return {
        ...state,
        robot: {
          ...robot,
          roundScore: robot.roundScore + SCORE_PER_QUESTION,
          totalScore: robot.totalScore + SCORE_PER_QUESTION,
        },
      }
    case ESCAPE_BY_HUMAN:
      // 人类逃跑，对局结束，游戏挂起，总轮次减1
      return {
        ...state,
        round: {
          ...round,
          status: EnumGameStatus.Finished,
        },
        game: {
          ...game,
          status: EnumGameStatus.Suspend,
        },
      }
    // -----以下是机器人有关的行为Start-----
    case CORRECT_QUESTION_BY_ROBOT:
      // 回答正确，加20分
      return {
        ...state,
        robot: {
          ...robot,
          roundScore: robot.roundScore + SCORE_PER_QUESTION,
          totalScore: robot.totalScore + SCORE_PER_QUESTION,
        },
      }
    case INCORRECT_QUESTION_BY_ROBOT:
      // 回答错误,不进行操作
      return state
    // -----以下是对局有关的行为Start-----
    case START_ROUND:
      // 开始对局，前期对局次数+1
      return {
        ...state,
        round: {
          status: EnumGameStatus.Doing,
          currentQuestionIndex: 0,
          questions: Object.assign([], payload || []),
        },
        game: {
          ...game,
          currentRound: game.currentRound + 1,
        },
        robot: {
          ...robot,
          roundScore: 0,
        },
        human: {
          ...human,
          roundScore: 0,
        },
      }
    case END_ROUND:
      return {
        ...state,
        round: {
          ...round,
          questions: [],
          status: EnumGameStatus.Finished,
        },
      }
    // -----以下是游戏有关的行为Start-----
    case START_GAME:
      return {
        ...state,
        game: {
          ...game,
          status: EnumGameStatus.Doing,
        },
      }
    case END_GAME:
      return {
        ...state,
        game: {
          ...game,
          status: EnumGameStatus.Finished,
        },
      }
    default:
      return state
  }
}
