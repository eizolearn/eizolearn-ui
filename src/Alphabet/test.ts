import type { InternalAlphabet } from './internal'

export const TEST: InternalAlphabet = {
    'a': {
        'english': {
            displayed: ['a'], accepted: ['b'],
        },
        'russian': {
            displayed: ['а'], accepted: ['б'],
        },
        displayPositioning: {
            x: 0, y: 0
        }
    }
}
