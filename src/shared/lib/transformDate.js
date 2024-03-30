export const transformDate = (date) => {
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDay()
    return `${m < 10 && '0' + d}.${m < 10 && '0' + m}.${y}`
}