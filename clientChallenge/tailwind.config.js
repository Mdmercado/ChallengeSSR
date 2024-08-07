import flowbite from "flowbite-react/tailwind";

const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};

export default tailwindConfig;
