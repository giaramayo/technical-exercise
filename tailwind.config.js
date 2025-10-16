module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        sunset: {
          ...require("daisyui/src/colors/themes")["[data-theme=sunset]"],
        },
      },
    ],
  },
};
