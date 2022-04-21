import { EnumGameStatus } from './enum'
import { IRound } from './Round'

/**
 * 定义游戏
 */
export interface IGame {
  /**
   * 当前轮次
   */
  currentRound: number
  /**
   * 共有几轮
   */
  readonly roundNum: number
  /**
   * 游戏状态
   */
  status: EnumGameStatus
}
