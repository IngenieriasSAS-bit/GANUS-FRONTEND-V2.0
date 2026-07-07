import { useContext } from "react";

import {
  AlertasContext,
} from "../context/AlertasContext";

export function useAlertas() {
  return useContext(
    AlertasContext
  );
}