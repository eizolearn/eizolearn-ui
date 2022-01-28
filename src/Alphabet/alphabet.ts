import type { InternalAlphabet } from './internal'
import { TEST } from './test'
import { KATAKANA } from './katakana'


export type TranscriptionLanguage = 'english' | 'russian'

export type Transcription = {
    readonly value: string
    readonly isDisplayed: boolean
}

export type TranscriptionValidationResult = 'correct' | 'noncanonical' | 'incorrect'

export class TranscribedSymbol {
    constructor(
        readonly symbol: string,
        readonly transcriptions: Transcription[],
        readonly displayPositioning: {
            x: number, 
            y: number,
        },
    ) {
        this.displayedCanonicalTranscription = transcriptions
            .find(transcription => transcription.isDisplayed)
            ?? (() => { 
                console.error('No canonical transcription found for symbol'); 
                return { value: '', isDisplayed: false } 
            })()
        this.displayedTranscription = transcriptions
            .filter(transcription => transcription.isDisplayed)
            .map(transcription => transcription.value.toLocaleUpperCase())
            .join('/')
    }

    readonly displayedCanonicalTranscription: Transcription
    readonly displayedTranscription: string
    validateTranscription(transcriptionToCheck: string): TranscriptionValidationResult {
        const trimmedLowercaseToCheck = transcriptionToCheck.trim().toLocaleLowerCase()
        switch (this.transcriptions.find(transcription => transcription.value === trimmedLowercaseToCheck)?.isDisplayed) {
            case true: return 'correct'
            case false: return 'noncanonical'
            case undefined: return 'incorrect'
        }
    }

    get randomTranscription(): Transcription {
        return this.transcriptions[Math.floor(Math.random() * this.transcriptions.length)]
    }
}

export class TranscribedAlphabet {
    constructor(readonly letters: TranscribedSymbol[]) {}

    get random(): TranscribedSymbol {
        return this.letters[Math.floor(Math.random() * this.letters.length)]
    }

    get length(): number {
        return this.letters.length
    }
}

export type Alphabet = {
    readonly [language in TranscriptionLanguage]: TranscribedAlphabet
}

const constructAlphabet = (alphabet: InternalAlphabet): Alphabet => {
    return new Proxy({}, { get: (target: Record<string, unknown>, language: TranscriptionLanguage) => {
        if (!(language in target)) {
            target[language] = new TranscribedAlphabet(
                Object.entries(alphabet).map(([symbol, transcriptionByLanguage]) => {
                    return new TranscribedSymbol(
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
}).map(([key, value]) => [key, constructAlphabet(value)])) as Exported
