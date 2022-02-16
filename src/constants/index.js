export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thur',
  'Fri',
  'Sat'
]

export const AVATAR = 'https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder-300x300.png'

export const getNumberWithOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 10
  return n + (s[(v-20) % 10] || s[v] || s[0])
}