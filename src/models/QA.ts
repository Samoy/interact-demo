/**
 * 定义问题
 */
export interface IQuestion {
  /**
   * 问题标题
   */
  title: string
  /**
   * 备选答案列表
   */
  answers: IAnswer[]
}

/**
 * 定义答案
 */
export interface IAnswer {
  /**
   * 答案标题
   */
  title: string
  /**
   * 是否正确
   */
  isCorrect: boolean
}
