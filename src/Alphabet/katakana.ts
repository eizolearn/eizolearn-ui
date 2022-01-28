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
        'ア': { english: { displayed: ['a'] }, russian: { displayed: ['а'] } },
        'イ': { english: { displayed: ['i'] }, russian: { displayed: ['и'] } },
        'ウ': { english: { displayed: ['u'] }, russian: { displayed: ['у'] } },
        'エ': { english: { displayed: ['e'] }, russian: { displayed: ['э'] } },
        'オ': { english: { displayed: ['o'] }, russian: { displayed: ['о'] } },
    },
    {
        'カ': { english: { displayed: ['ka'] }, russian: { displayed: ['ка'] } },
        'キ': { english: { displayed: ['ki'] }, russian: { displayed: ['ки'] } },
        'ク': { english: { displayed: ['ku'] }, russian: { displayed: ['ку'] } },
        'ケ': { english: { displayed: ['ke'] }, russian: { displayed: ['кэ'], accepted: ['ке'] } },
        'コ': { english: { displayed: ['ko'] }, russian: { displayed: ['ко'] } },
    },
    {
        'ガ': { english: { displayed: ['ga'] }, russian: { displayed: ['га'] } },
        'ギ': { english: { displayed: ['gi'] }, russian: { displayed: ['ги'] } },
        'グ': { english: { displayed: ['gu'] }, russian: { displayed: ['гу'] } },
        'ゲ': { english: { displayed: ['ge'] }, russian: { displayed: ['гэ'], accepted: ['ге'] } },
        'ゴ': { english: { displayed: ['go'] }, russian: { displayed: ['го'] } },
    },
    {
        'サ': { english: { displayed: ['sa'] }, russian: { displayed: ['cа'] } },
        'シ': { english: { displayed: ['shi'], accepted: ['si'] }, russian: { displayed: ['cи'], accepted: ['ши', 'щи'] } },
        'ス': { english: { displayed: ['su'] }, russian: { displayed: ['су'] } },
        'セ': { english: { displayed: ['se'] }, russian: { displayed: ['сэ'], accepted: ['се'] } },
        'ソ': { english: { displayed: ['so'] }, russian: { displayed: ['со'] } },
    },
    {
        'ザ': { english: { displayed: ['za'] }, russian: { displayed: ['за'], accepted: ['дза'] } },
        'ジ': { english: { displayed: ['ji'], accepted: ['zi'] }, russian: { displayed: ['дзи'], accepted: ['зи'] } },
        'ズ': { english: { displayed: ['zu'] }, russian: { displayed: ['дзу'], accepted: ['зу'] } },
        'ゼ': { english: { displayed: ['ze'] }, russian: { displayed: ['дзэ'], accepted: ['зэ', 'зе', 'дзе'] } },
        'ゾ': { english: { displayed: ['zo'] }, russian: { displayed: ['дзо'], accepted: ['зо'] } },
    },
    {
        'タ': { english: { displayed: ['ta'] }, russian: { displayed: ['та'] } },
        'チ': { english: { displayed: ['chi'], accepted: ['ti', 'tsi'] }, russian: { displayed: ['ти'], accepted: ['чи'] } },
        'ツ': { english: { displayed: ['tsu'], accepted: ['tu'] }, russian: { displayed: ['цу'], accepted: ['тсу'] } },
        'テ': { english: { displayed: ['te'] }, russian: { displayed: ['тэ'], accepted: ['те'] } },
        'ト': { english: { displayed: ['to'] }, russian: { displayed: ['то'] } },
    },
    {
        'ダ': { english: { displayed: ['da'] }, russian: { displayed: ['да'] }  },
        'ヂ': { english: { displayed: ['ji'], accepted: ['dji'] }, russian: { displayed: ['дзи'] }  },
        'ヅ': { english: { displayed: ['dzu'], acceepted: ['du', 'zu'] }, russian: { displayed: ['дзу'] }  },
        'デ': { english: { displayed: ['de'] }, russian: { displayed: ['дэ'], accepted: ['де'] }  },
        'ド': { english: { displayed: ['do'] }, russian: { displayed: ['до'] }  },
    },
    {
        'ナ': { english: { displayed: ['na'] }, russian: { displayed: ['на'] }  },
        'ニ': { english: { displayed: ['ni'] }, russian: { displayed: ['ни'] }  },
        'ヌ': { english: { displayed: ['nu'] }, russian: { displayed: ['ну'] }  },
        'ネ': { english: { displayed: ['ne'] }, russian: { displayed: ['нэ'], accepted: ['не'] }  },
        'ノ': { english: { displayed: ['no'] }, russian: { displayed: ['но'] }  },
    },
    {
        'ハ': { english: { displayed: ['ha'] }, russian: { displayed: ['ха'] }  },
        'ヒ': { english: { displayed: ['hi'] }, russian: { displayed: ['хи'] }  },
        'フ': { english: { displayed: ['fu'], accepted: ['hu'] }, russian: { displayed: ['фу'] }  },
        'ヘ': { english: { displayed: ['he'] }, russian: { displayed: ['хэ'], accepted: ['хе'] }  },
        'ホ': { english: { displayed: ['ho'] }, russian: { displayed: ['хо'] }  },
    },
    {
        'バ': { english: { displayed: ['ba'] }, russian: { displayed: ['ба'] }  },
        'ビ': { english: { displayed: ['bi'] }, russian: { displayed: ['би'] }  },
        'ブ': { english: { displayed: ['bu'] }, russian: { displayed: ['бу'] }  },
        'ベ': { english: { displayed: ['be'] }, russian: { displayed: ['бэ'], accepted: ['бе'] }  },
        'ボ': { english: { displayed: ['bo'] }, russian: { displayed: ['бо'] }  },
    },
    {
        'パ': { english: { displayed: ['pa'] }, russian: { displayed: ['па'] }  },
        'ピ': { english: { displayed: ['pi'] }, russian: { displayed: ['пи'] }  },
        'プ': { english: { displayed: ['pu'] }, russian: { displayed: ['пу'] }  },
        'ペ': { english: { displayed: ['pe'] }, russian: { displayed: ['пэ'], accepted: ['пе'] }  },
        'ポ': { english: { displayed: ['po'] }, russian: { displayed: ['по'] }  },
    },
    {
        'マ': { english: { displayed: ['ma'] }, russian: { displayed: ['ма'] }  },
        'ミ': { english: { displayed: ['mi'] }, russian: { displayed: ['ми'] }  },
        'ム': { english: { displayed: ['mu'] }, russian: { displayed: ['му'] }  },
        'メ': { english: { displayed: ['me'] }, russian: { displayed: ['мэ'], accepted: ['ме'] }  },
        'モ': { english: { displayed: ['mo'] }, russian: { displayed: ['мо'] }  },
    },
    {
        'ヤ': { english: { displayed: ['ya'] }, russian: { displayed: ['я'] }  },
        'ユ': { english: { displayed: ['yu'] }, russian: { displayed: ['ю'] }  },
        'ヨ': { english: { displayed: ['yo'] }, russian: { displayed: ['ё'], accepted: ['е'] }  },
    },
    {
        'ラ': { english: { displayed: ['ra'] }, russian: { displayed: ['ра'] }  },
        'リ': { english: { displayed: ['ri'] }, russian: { displayed: ['ри'] }  },
        'ル': { english: { displayed: ['ru'] }, russian: { displayed: ['ру'] }  },
        'レ': { english: { displayed: ['re'] }, russian: { displayed: ['рэ'], accepted: ['ре'] }  },
        'ロ': { english: { displayed: ['ro'] }, russian: { displayed: ['ро'] }  },
    },
    {
        'ワ': { english: { displayed: ['wa'] }, russian: { displayed: ['ва'] }  },
    },
    {
        'ン': { english: { displayed: ['n'], accepted: ['m'] }, russian: { displayed: ['н'], accepted: ['м'] }  },
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
