import {
  Wrench,
  Activity,
 ShieldAlert,
  BellRing,
} from "lucide-react";

export default function TipoAlerta({
  tipo,
}) {

  const tipos = {

    MANTENIMIENTO: {
      icono: <Wrench size={15} />,
      clase: "badge-tipo mantenimiento",
      texto: "Mantenimiento",
    },

    SEGUIMIENTO: {
      icono: <Activity size={15} />,
      clase: "badge-tipo seguimiento",
      texto: "Seguimiento",
    },

    INSPECCION: {
      icono: <ShieldAlert size={15} />,
      clase: "badge-tipo inspeccion",
      texto: "Inspección",
    },

  };

  const actual =
    tipos[tipo] ?? {

      icono: <BellRing size={15} />,

      clase: "badge-tipo",

      texto: tipo,

    };

  return (

    <span className={actual.clase}>

      {actual.icono}

      {actual.texto}

    </span>

  );

}