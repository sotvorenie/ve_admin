export const pluralize = (value: number | undefined = 0, words: [string, string, string]): string => {
    const mod10 = value % 10;
    const mod100 = value % 100;

    if (mod100 >= 11 && mod100 <= 14) return words[2]
    if (mod10 === 1) return words[0]
    if (mod10 >= 2 && mod10 <= 4) return words[1]
    return words[2]
}