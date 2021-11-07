import type { InternalAlphabet } from './internal'
import type { TranscriptionLanguage } from './alphabet'

type Transcription = { [language in TranscriptionLanguage]: { displayed: string[], accepted?: string[] } }

const lastVowelSort = (transcriptions: Transcription) => {
    switch (transcriptions.english.displayed[0].slice(-1)) {
        case 'a': return 0
        case 'i': return 1
        case 'u': return 2
        case 'e': return 3
        case 'o': return 4
        default: return 2
    }
}

export const KATAKANA: InternalAlphabet = Object.fromEntries([{
        'ア': { english: { displayed: ['a'] } },
        'イ': { english: { displayed: ['i'] } },
        'ウ': { english: { displayed: ['u'] } },
        'エ': { english: { displayed: ['e'] } },
        'オ': { english: { displayed: ['o'] } },
    },
    {
        'カ': { english: { displayed: ['ka'] } },
        'キ': { english: { displayed: ['ki'] } },
        'ク': { english: { displayed: ['ku'] } },
        'ケ': { english: { displayed: ['ke'] } },
        'コ': { english: { displayed: ['ko'] } },
    },
    {
        'ガ': { english: { displayed: ['ga'] } },
        'ギ': { english: { displayed: ['gi'] } },
        'グ': { english: { displayed: ['gu'] } },
        'ゲ': { english: { displayed: ['ge'] } },
        'ゴ': { english: { displayed: ['go'] } },
    },
    {
        'サ': { english: { displayed: ['sa'] } },
        'シ': { english: { displayed: ['shi'], accepted: ['si'] } },
        'ス': { english: { displayed: ['su'] } },
        'セ': { english: { displayed: ['se'] } },
        'ソ': { english: { displayed: ['so'] } },
    },
    {
        'ザ': { english: { displayed: ['za'] } },
        'ジ': { english: { displayed: ['ji'], accepted: ['zi'] } },
        'ズ': { english: { displayed: ['zu'] } },
        'ゼ': { english: { displayed: ['ze'] } },
        'ゾ': { english: { displayed: ['zo'] } },
    },
    {
        'タ': { english: { displayed: ['ta'] } },
        'チ': { english: { displayed: ['chi'], accepted: ['ti', 'tsi'] } },
        'ツ': { english: { displayed: ['tsu'], accepted: ['tu'] } },
        'テ': { english: { displayed: ['te'] } },
        'ト': { english: { displayed: ['to'] } },
    },
    {
        'ダ': { english: { displayed: ['da'] } },
        'ヂ': { english: { displayed: ['ji'], accepted: ['dji'] } },
        'ヅ': { english: { displayed: ['dzu'], acceepted: ['du', 'zu'] } },
        'デ': { english: { displayed: ['de'] } },
        'ド': { english: { displayed: ['do'] } },
    },
    {
        'ナ': { english: { displayed: ['na'] } },
        'ニ': { english: { displayed: ['ni'] } },
        'ヌ': { english: { displayed: ['nu'] } },
        'ネ': { english: { displayed: ['ne'] } },
        'ノ': { english: { displayed: ['no'] } },
    },
    {
        'ハ': { english: { displayed: ['ha'] } },
        'ヒ': { english: { displayed: ['hi'] } },
        'フ': { english: { displayed: ['fu'], accepted: ['hu'] } },
        'ヘ': { english: { displayed: ['he'] } },
        'ホ': { english: { displayed: ['ho'] } },
    },
    {
        'バ': { english: { displayed: ['ba'] } },
        'ビ': { english: { displayed: ['bi'] } },
        'ブ': { english: { displayed: ['bu'] } },
        'ベ': { english: { displayed: ['be'] } },
        'ボ': { english: { displayed: ['bo'] } },
    },
    {
        'パ': { english: { displayed: ['pa'] } },
        'ピ': { english: { displayed: ['pi'] } },
        'プ': { english: { displayed: ['pu'] } },
        'ペ': { english: { displayed: ['pe'] } },
        'ポ': { english: { displayed: ['po'] } },
    },
    {
        'マ': { english: { displayed: ['ma'] } },
        'ミ': { english: { displayed: ['mi'] } },
        'ム': { english: { displayed: ['mu'] } },
        'メ': { english: { displayed: ['me'] } },
        'モ': { english: { displayed: ['mo'] } },
    },
    {
        'ヤ': { english: { displayed: ['ya'] } },
        'ユ': { english: { displayed: ['yu'] } },
        'ヨ': { english: { displayed: ['yo'] } },
    },
    {
        'ラ': { english: { displayed: ['ra'] } },
        'リ': { english: { displayed: ['ri'] } },
        'ル': { english: { displayed: ['ru'] } },
        'レ': { english: { displayed: ['re'] } },
        'ロ': { english: { displayed: ['ro'] } },
    },
    {
        'ワ': { english: { displayed: ['wa'] } },
    },
    {
        'ン': { english: { displayed: ['n'], accepted: ['m'] } },
    }
].flatMap((kana, i) => Object.entries(kana).map(([symbol, transcriptions]: [string, Transcription]) => {
    return [symbol, {
        ...transcriptions,
        displayPositioning: {
            x: lastVowelSort(transcriptions),
            y: i,
        },
    }]
})))
