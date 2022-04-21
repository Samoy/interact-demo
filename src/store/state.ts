import { EnumGameStatus } from '../models/enum'
import { IGame } from '../models/Game'
import { IPlayer } from '../models/Player'
import { IRound } from '../models/Round'

/**
 * 定义人类初始状态
 */
export const initialHuman: IPlayer = {
  roundScore: 0,
  totalScore: 0,
  name: '挑战者',
}

/**
 * 定义机器人初始状态
 */
export const initialRobot: IPlayer = {
  roundScore: 0,
  totalScore: 0,
  name: '机器人',
}

/**
 * 定义对局初始状态
 */
export const initialRound: IRound = {
  questions: [],
  status: EnumGameStatus.Ready,
  currentQuestionIndex: 0,
}

/**
 * 定义游戏初始状态
 */
export const initialGame: IGame = {
  roundNum: 5,
  currentRound: 0,
  status: EnumGameStatus.Ready,
}

/**
 * 定义全局状态
 */
export interface IGlobalState {
  game: IGame
  round: IRound
  human: IPlayer
  robot: IPlayer
}

export const initialSate: IGlobalState = {
  game: initialGame,
  round: initialRound,
  human: initialHuman,
  robot: initialRobot,
}
