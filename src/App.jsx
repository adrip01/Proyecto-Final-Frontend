import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes.jsx";
import Header from "./components/header/Header";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./customTheme";

function App() {
  const customTheme = lightTheme;

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
