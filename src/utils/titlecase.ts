export const titlecase = (str: string) => {
    return str
        .split(' ')
        .map((word: string) => word[0].toUpperCase() + word.substr(1).toLowerCase())
        .join(' ')
}
