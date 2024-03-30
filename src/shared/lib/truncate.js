export const truncate = (string, max) => {
    if (string.length > max) {
        return string.substring(0, max-3) + '...'
    }
    return string
}