import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";
import Questions from "./pages/Questions";
import Results from "./pages/Results";
import { useState } from "react";
import React from "react";

export const AppContext: any = React.createContext([]);

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#e6c300",
    },
    secondary: {
      main: "#cc0066",
    },
    tertiary: {
      main: "#00e6e6",
    },
    text: {
      primary: "#fff",
      disabled: "#fff",
    },
    action: {
      disabled: "#e6c300",
    },
  },
});

function App() {
  const [answer, setAnswer] = useState({});
  
  return (
    <AppContext.Provider value={[answer, setAnswer]}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>Error 404 : page not found</h1>} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
