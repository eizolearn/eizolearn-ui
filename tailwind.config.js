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
            symbol: '14rem',
            input: '1.3rem',
            score: '4rem',
        },
        extend: {
            height: {
                page: 'calc(100% - 3.5rem)',
                header: '70px'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
