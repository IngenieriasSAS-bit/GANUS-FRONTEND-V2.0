import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerAlertas,
  crearAlerta,
  atenderAlerta,
} from "../services/alertasService";

// eslint-disable-next-line react-refresh/only-export-components
export const AlertasContext = createContext(null);

export function AlertasProvider({
  children,
}) {
  const [alertas, setAlertas] = useState(
    () => obtenerAlertas()
  );

  const cargarAlertas = () => {
    setAlertas(
      obtenerAlertas()
    );
  };

  useEffect(() => {
    const actualizar = () => {
      cargarAlertas();
    };

    window.addEventListener(
      "storage",
      actualizar
    );

    return () => {
      window.removeEventListener(
        "storage",
        actualizar
      );
    };
  }, []);

  const registrarAlerta = (
    nuevaAlerta
  ) => {
    crearAlerta(
      nuevaAlerta
    );

    cargarAlertas();
  };

  const resolverAlerta = (
    alertaId
  ) => {
    atenderAlerta(
      alertaId
    );

    cargarAlertas();
  };

  return (
    <AlertasContext.Provider
      value={{
        alertas,
        registrarAlerta,
        resolverAlerta,
        cargarAlertas,
      }}
    >
      {children}
    </AlertasContext.Provider>
  );
}