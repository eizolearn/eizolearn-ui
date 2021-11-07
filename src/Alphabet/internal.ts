import type { TranscriptionLanguage } from './alphabet'

export type InternalAlphabet = {
    [symbol: string]: {
        [language in TranscriptionLanguage]: {
            displayed: string[],
            accepted?: string[],
        }
    } & {
        displayPositioning: {
            x: number,
            y: number,
        }
    }
}
