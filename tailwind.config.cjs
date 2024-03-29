/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {},
        colors: {
            black: '#000',
            white: '#fff',

            bgH: '#f9f5d7',
            bg: '#fbf1c7',
            bgS: '#f2e5bc',
            bg1: '#ebdbb2',
            bg2: '#d5c4a1',
            bg3: '#bdae93',
            bg4: '#a89984',

            fg: '#282828',
            fg1: '#3c3836',
            fg2: '#504945',
            fg3: '#665c54',
            fg4: '#7c6f64',

            red: '#9d0006',
            green: '#79740e',
            yellow: '#b57614',
            blue: '#076678',
            purple: '#8f3f71',
            aqua: '#427b58',
            orange: '#af3a03',
            gray: '#928374',

            redDim: '#cc2412',
            greenDim: '#98971a',
            yellowDim: '#d79921',
            blueDim: '#458598',
            purpleDim: '#b16286',
            aquaDim: '#689d6a',
            orangeDim: '#d65d0e',
            grayDim: '#7c6f64',

            dbgH: '#1d2021',
            dbg: '#282828',
            dbgS: '#32302f',
            dbg1: '#3c3836',
            dbg2: '#504945',
            dbg3: '#665c54',
            dbg4: '#7c6f64',

            dfg: '#fbf1c7',
            dfg1: '#ebdbb2',
            dfg2: '#d5c4a1',
            dfg3: '#bdae93',
            dfg4: '#a89984',

            dred: '#fb4934',
            dgreen: '#b8bb26',
            dyellow: '#fabd2f',
            dblue: '#83a598',
            dpurple: '#d3869b',
            daqua: '#8ec07c',
            dgray: '#928374',
            dorange: '#fe8019',

            dredDim: '#cc2412',
            dgreenDim: '#98971a',
            dyellowDim: '#d79921',
            dblueDim: '#458588',
            dpurpleDim: '#b16286',
            daquaDim: '#689d6a',
            dgrayDim: '#a89984',
            dorangeDim: '#d65d0e'
        },
        plugins: []
    }
};
