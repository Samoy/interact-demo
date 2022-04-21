import { IQuestion } from '../models/QA'

/**
 * 题库
 */
export const QuestionLibray: IQuestion[] = [
  {
    title: '1+1等于几',
    answers: [
      {
        title: '1',
        isCorrect: false,
      },
      {
        title: '2',
        isCorrect: true,
      },
      {
        title: '3',
        isCorrect: false,
      },
      {
        title: '4',
        isCorrect: false,
      },
    ],
  },
  {
    title: '最小的正整数是',
    answers: [
      {
        title: '0',
        isCorrect: false,
      },
      {
        title: '1',
        isCorrect: true,
      },
      {
        title: '2',
        isCorrect: false,
      },
      {
        title: '3',
        isCorrect: false,
      },
    ],
  },
  {
    title: '小苏打的化学名称是',
    answers: [
      {
        title: '氧化钠',
        isCorrect: false,
      },
      {
        title: '碳酸钠',
        isCorrect: false,
      },
      {
        title: '碳酸氢钠',
        isCorrect: true,
      },
      {
        title: '氧化钙',
        isCorrect: false,
      },
    ],
  },
  {
    title: '以下哪项不属于社会主义核心价值观',
    answers: [
      {
        title: '富强',
        isCorrect: false,
      },
      {
        title: '敬业',
        isCorrect: false,
      },
      {
        title: '自由',
        isCorrect: false,
      },
      {
        title: '勤奋',
        isCorrect: true,
      },
    ],
  },
  {
    title: '在Java中以下哪项属于基本类型',
    answers: [
      {
        title: 'Object',
        isCorrect: false,
      },
      {
        title: 'Map',
        isCorrect: true,
      },
      {
        title: 'List',
        isCorrect: false,
      },
      {
        title: 'int',
        isCorrect: false,
      },
    ],
  },
]
