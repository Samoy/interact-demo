# interact-demo
人机对战Demo

# 实现思路
1. 定义两位选手，自然人和机器人
2. 定义问题列表，目前设置5道题
3. 每道题设置倒计时，倒计时设为20秒，倒计时结束后，清空计时器，并且展示下一道问题。
4. 当问题展示完毕时，计算双方成绩
   
# 双方选手的实现逻辑
|选手|实现逻辑|胜利条件|失败条件|奖惩机制|
|----|----|----|----|----|----|
|人类|手动点击选项|答题正确|1.答题错误<br>2.倒计时结束|成功加10分，失败不得分
|机器人|1.当人类答题正确时,选择任意选项<br>2.当人类回答错误时，直接胜利|1.答题正确<br>2.人类答题失败|答题错误|同上|
