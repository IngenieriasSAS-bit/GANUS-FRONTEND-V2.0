import {
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function EstadoAlerta({
  estado,
}) {

  const configuracion = {

    Pendiente: {

      clase: "badge-alerta pendiente",

      icono: (
        <Clock3
          size={15}
        />
      ),

    },

    Atendida: {

      clase: "badge-alerta atendida",

      icono: (
        <CheckCircle2
          size={15}
        />
      ),

    },

  };

  const estadoActual =
    configuracion[estado];

  return (

    <span
      className={
        estadoActual.clase
      }
    >

      {estadoActual.icono}

      {estado}

    </span>

  );

}