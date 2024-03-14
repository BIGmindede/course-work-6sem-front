export const truncate = (string) => {
    const [filename, extension] = string.split('.')
    if (filename.length > 16) {
        return [filename.substring(0, 13) + '...', '.' + extension]
    }
    return [filename, '.' + extension]
}