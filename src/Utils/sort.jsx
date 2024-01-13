export const sortTaskArray = (tasksObject) => {
  const sortedTasks = Object.entries(tasksObject)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .reduce((result, [key, value]) => {
      result[key] = value
      return result
    }, {})
  return sortedTasks
}
