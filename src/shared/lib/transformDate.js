export const transformDate = (date) => {
    date = new Date(date)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${d < 10 ? "0" + d : d}.${m < 10 ? '0' + m : m}.${y}`
}