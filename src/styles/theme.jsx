import { createTheme, responsiveFontSizes } from "@mui/material/styles/";
export let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(51, 65, 85, 0.5)",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "rgb(2245, 124, 0,0.6)",
    },

    text: {
      primary: "#fafafa",
      secondary: "#f57c00",
      neutral: "#37474f",
      fontSize: 12,
    },
    background: {
      default: "#37474f",
    },
  },
  typography: {
    allVariants: {
      color: "#fafafa",
      fontFamily: "Charis SIL, serif !important",
    },
  },
});

theme = responsiveFontSizes(theme);
