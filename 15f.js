export function isWeekend(date) {
  const dayOfweek = date.format('dddd');
  return dayOfweek === 'Sunday' || dayOfweek === 'Saturday'

}

