module.exports = {
    mode: 'jit',
    purge: ['./public/index.html', './src/**/*.svelte'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            primary: '#063843',
            secondary: '#ADD8E6',
            white: '#FFFFFF',
            success: '#99F9BC',
            failure: '#F2A68E',
            skipped: '#C6CBCD',
        },
        gradientColorStops: theme => ({
            ...theme('colors'),
            'pine-green': '#027478'
        }),
        fontSize: {
            symbol: ['14rem', '14rem'],
            'symbol-fold': ['10rem', '10rem'],
            transcription: ['2rem', '2.5rem'],
            button: '1.6rem',
            input: '1.3rem',
            score: '4rem',
            'reference-symbol': '2rem',
            'reference-transcription': '1.2rem',
            settings: '1.5rem',
        },
        fontFamily: {
            nunito: 'Nunito',
        },
        backdropBlur: {
            '5': '5px',
        },
        extend: {
            transitionProperty: {
                'max-height': 'height',
            },
            height: {
                page: 'calc(100% - 70px)'
            },
            spacing: {
                header: '70px',
            },
            maxWidth: {
                '16': '16px',
            },
            flexShrink: {
                '2': 2,
            },
            screens: {
                'fold': { 'max': '320px' }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
