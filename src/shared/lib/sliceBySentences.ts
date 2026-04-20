export const sliceBySentences = (text: string, maxSentences: number): string => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text]
    return sentences.slice(0, maxSentences).join(' ').trim()
}
