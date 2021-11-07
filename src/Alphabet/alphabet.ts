import type { InternalAlphabet } from './internal'
import { TEST } from './test'
import { KATAKANA } from './katakana'


// TODO: move with multiple languages support
export type TranscriptionLanguage = 'english'

export type Transcription = {
    readonly value: string
    readonly isDisplayed: boolean
}

export class TranscripedSymbol {
    constructor(
        readonly symbol: string,
        readonly transcriptions: Transcription[],
        readonly displayPositioning: {
            x: number, 
            y: number,
        },
    ) {
        this.displayedTranscription = transcriptions
            .filter(transcription => transcription.isDisplayed)
            .map(transcription => transcription.value.toLocaleUpperCase())
            .join('/')
    }

    readonly displayedTranscription: string
    validateTranscription(transcriptionToCheck: string): 'correct' | 'noncanonical' | 'incorrect' {
        const trimmedLowercaseToCheck = transcriptionToCheck.trim().toLocaleLowerCase()
        switch (this.transcriptions.find(transcription => transcription.value === trimmedLowercaseToCheck)?.isDisplayed) {
            case true: return 'correct'
            case false: return 'noncanonical'
            case undefined: return 'incorrect'
        }
    }
}

export class TranscripedAlphabet {
    constructor(readonly letters: TranscripedSymbol[]) {}

    get random(): TranscripedSymbol {
        return this.letters[Math.floor(Math.random() * this.letters.length)]
    }

    get length(): number {
        return this.letters.length
    }
}

export type Alphabet = {
    readonly [language in TranscriptionLanguage]: TranscripedAlphabet
}

const constructAlpabet = (alphabet: InternalAlphabet): Alphabet => {
    return new Proxy({}, { get: (target: Record<string, unknown>, language: TranscriptionLanguage) => {
        if (!(language in target)) {
            target[language] = new TranscripedAlphabet(
                Object.entries(alphabet).map(([symbol, transcriptionByLanguage]) => {
                    return new TranscripedSymbol(
                        symbol,
                        transcriptionByLanguage[language].displayed.map(transcription => {
                            return {
                                value: transcription, 
                                isDisplayed: true,
                            }
                        }).concat(transcriptionByLanguage[language].accepted?.map(transcription => {
                            return {
                                value: transcription, 
                                isDisplayed: false,
                            }
                        }) ?? []),
                        transcriptionByLanguage.displayPositioning,
                    )
                })
            )
        }
        return target[language]
    }}) as Alphabet
}

const toExport = {
    TEST,
    KATAKANA,
}
type Exported = {
    [alphabetName in keyof typeof toExport]: Alphabet
}

export default Object.fromEntries(Object.entries({
    TEST,
    KATAKANA,
}).map(([key, value]) => [key, constructAlpabet(value)])) as Exported
