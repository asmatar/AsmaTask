/* eslint-disable no-undef */
import { sortTaskArray } from './sort'
describe('sortTaskArray', () => {
  test('should sort tasks in descending order based on keys', () => {
    const tasksObject = {
      task2: 'Task 2',
      task1: 'Task 1',
      task3: 'Task 3',
    }

    const sortedTasks = sortTaskArray(tasksObject)

    const expectedSortedTasks = {
      task3: 'Task 3',
      task2: 'Task 2',
      task1: 'Task 1',
    }

    expect(sortedTasks).toEqual(expectedSortedTasks)
  })
})
