module.exports = {content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                background: "url('./assets/img/background.png')",
            },
            screens: {
                sm: '480px',
                md: '768px',
                lg: '976px',
                'mlg': '1024px',
                'xlg': '1280px',
                '1xl': '1440px',
                '1.5xl': '1536px',
                '3xl': '1600px',
                '3.5xl': '1680px',
                '3.75xl': '1900px',
                '4xl': '1920px',
                '5xl': '2560px',
                '6xl': '2880px',
            }, fontFamily: {body: ["Inter"],}, width: {body: "28.5rem",}, spacing: {icon: "21rem", logo: "6.75rem",},
        },
    },
    plugins: [],
};

