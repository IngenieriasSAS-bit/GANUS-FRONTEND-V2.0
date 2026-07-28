import { useContext } from "react";

import { AuthContext } from "../core/context/AuthContext";

export default function useAuth() {
    return useContext(AuthContext);
}