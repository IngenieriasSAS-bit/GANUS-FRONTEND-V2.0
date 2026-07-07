import { useContext } from "react";

import ThemeContext from "../context/Theme";

export default function useTheme(){

    return useContext(ThemeContext);

}