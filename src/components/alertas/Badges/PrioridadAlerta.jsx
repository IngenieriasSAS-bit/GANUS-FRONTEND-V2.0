import {
  ShieldAlert,
  TriangleAlert,
  Info,
} from "lucide-react";

export default function PrioridadAlerta({
  prioridad,
}) {

  const configuracion = {

    Alta: {

      clase: "badge-prioridad alta",

      icono: (
        <ShieldAlert
          size={15}
          strokeWidth={2}
        />
      ),

    },

    Media: {

      clase: "badge-prioridad media",

      icono: (
        <TriangleAlert
          size={15}
          strokeWidth={2}
        />
      ),

    },

    Baja: {

      clase: "badge-prioridad baja",

      icono: (
        <Info
          size={15}
          strokeWidth={2}
        />
      ),

    },

  };

  const prioridadActual =
    configuracion[prioridad];

  return (

    <span
      className={
        prioridadActual.clase
      }
    >

      {prioridadActual.icono}

      {prioridad}

    </span>

  );

}