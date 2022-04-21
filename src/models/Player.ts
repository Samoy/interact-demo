/**
 * 定义选手模型，包含一些属性
 */
export interface IPlayer {
  /**
   *名字，可当作唯一标识
   */
  readonly name: string
  /**
   * 累计分数
   */
  totalScore: number
  /**
   * 单局分数
   */
  roundScore: number
  /**
   * 是否是机器人
   */
  readonly isRobot?: boolean
}
