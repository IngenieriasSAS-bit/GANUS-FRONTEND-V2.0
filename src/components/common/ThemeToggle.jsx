import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import "../../styles/theme/ThemeToggle.css";

export default function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            className="themeToggle"
            onClick={toggleTheme}
            title={
                theme === "light"
                    ? "Cambiar a modo oscuro"
                    : "Cambiar a modo claro"
            }
        >

            {
                theme === "light"
                    ? <Moon size={18}/>
                    : <Sun size={18}/>
            }

        </button>

    );

}