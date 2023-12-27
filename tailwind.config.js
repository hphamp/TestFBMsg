/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            width: {
                79: '19.5rem',
                200: '1107px',
            },
            height: {
                79: '19.5rem',
                200: '1107px',
            },

            colors: {
                'my-yellow': '#fbd947',
                'my-gray': '#6a6363',
                'my-red': '#DD0105',
                grayPrimary: '#F5F5F5',
                redPrimary: '#dd0105',
                yellowPrimary: '#fbd947',
                btnGreen: '#22942D',
                momocolor: '#A50063',
            },
            margin: {
                '-76': '-312px',
                0.5: '2.5px',
            },
            borderWidth: {
                1: '1px',
            },
            spacing: {
                46: '11.5rem',
                90: '22.5rem',
                120: '30rem',
                144: '36rem',
                180: '43.2rem',
                200: '48rem',
                250: '60rem',
                400: '96rem',
                4.5: '18px',
            },
            inset: {
                '2/5': '40%',
            },
        },
    },
    plugins: [],
};
