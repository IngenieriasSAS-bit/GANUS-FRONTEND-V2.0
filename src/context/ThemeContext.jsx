import { useEffect, useState } from "react";

import ThemeContext from "./Theme";

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(

        localStorage.getItem("theme") || "light"

    );

    useEffect(() => {

    // Sistema antiguo
    document.body.setAttribute(
        "data-ganus-theme",
        theme
    );

    // Sistema nuevo
    document.documentElement.setAttribute(
        "data-ganus-theme",
        theme === "dark"
            ? "oscuro"
            : "claro"
    );

    localStorage.setItem(
        "ganus-tema",
        theme
    );

}, [theme]);

    function toggleTheme() {

        setTheme((prev) =>

            prev === "claro"

                ? "Oscuro"

                : "claro"

        );

    }

    return (

        <ThemeContext.Provider

            value={{

                theme,

                toggleTheme

            }}

        >

            {children}

        </ThemeContext.Provider>

    );

}