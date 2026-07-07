import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./styles/variables.css";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { AlertasProvider } from "./context/AlertasContext";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <ThemeProvider>

            <AlertasProvider>

                <App />

            </AlertasProvider>

        </ThemeProvider>

    </StrictMode>

);