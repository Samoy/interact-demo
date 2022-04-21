import { EnumGameStatus } from './enum'
import { IQuestion } from './QA'

/**
 * 对局
 */
export interface IRound {
  /**
   * 问题列表
   */
  questions: IQuestion[]
  /**
   * 对局状态
   */
  status: EnumGameStatus
  /**
   * 当前问题索引
   */
  currentQuestionIndex: number
}
