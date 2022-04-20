/**
 * 定义人机模型，包含一些属性
 */

interface IPlayer {
  /**
   *名字
   */
  name: string
  /**
   * id，唯一标识
   */
  id: string
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
  isRobot?: boolean
  /**
   * 角色：红方或者蓝方
   */
}
