import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./styles/variables.css";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { AlertasProvider } from "./context/AlertasContext";
import { AuthProvider } from "./core/context/AuthContext.jsx";
import "./styles/make.css";

createRoot(document.getElementById("root")).render(

    <StrictMode>

    <ThemeProvider>

        <AlertasProvider>

            <AuthProvider>

                <App />

            </AuthProvider>

        </AlertasProvider>

    </ThemeProvider>

</StrictMode>

);