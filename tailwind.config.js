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
        },
        fontSize: {
            symbol: '15rem',
            input: '1.3rem',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
