export const transformDate = (date, type='dotted') => {
    date = new Date(date)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    if (type === 'dotted') {
        return `${d < 10 ? "0" + d : d}.${m < 10 ? '0' + m : m}.${y}`
    }
    else {
        return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? "0" + d : d}`
    }
    
}