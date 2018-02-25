export function getRecipeDurationLabel (timeInMins) {
  let hours = Math.floor(timeInMins / 60)
  let minutes = timeInMins % 60
  if (hours > 0 && minutes > 0) {
    return hours + 'h ' + minutes + 'm'
  } else if (hours > 0) {
    return hours + 'h'
  }

  return minutes + 'm'
}

export function getDifficultyLabel (difficultyIndex) {
  const difficultyLevels = ['Easy', 'Easy/medium', 'Medium', 'Medium/Advanced', 'Advanced']
  return difficultyLevels[difficultyIndex]
}
