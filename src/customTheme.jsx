import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#FFC400",
    },
    background: {
      default: "#E0E0E0",
      paper: "#FFFFFF",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export { lightTheme, darkTheme };
