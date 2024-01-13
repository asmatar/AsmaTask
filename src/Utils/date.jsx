import { format } from 'date-fns'

export const formatedDate = (date) => {
  const datee = new window.Date(date)
  const formattedDate = format(datee, "MM/dd/yyyy 'at' HH'h'mm'min'")
  return formattedDate
}
