export const divideFileName = (fullFileName) => {
    const splitedFileName = fullFileName.split('.')
    const extension = splitedFileName[splitedFileName.length - 1]
    const fileName = splitedFileName.filter(substr => substr !== extension).join("")
    return [fileName, extension]
}