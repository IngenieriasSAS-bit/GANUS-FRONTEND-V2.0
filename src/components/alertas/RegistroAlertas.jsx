import { useMemo, useState } from "react";

import {
  Bell,
} from "lucide-react";

import FiltrosAlertas from "./FiltrosAlertas";
import TablaAlertas from "./TablaAlertas";

export default function RegistroAlertas({
  alertas,
  activos,
  onVerDetalle,
}) {

  const [busqueda, setBusqueda] =
    useState("");

  const [estado, setEstado] =
    useState("");

  const [prioridad, setPrioridad] =
    useState("");

  const alertasFiltradas =
    useMemo(() => {

      const termino =
        busqueda
          .toLowerCase()
          .trim();

      return alertas.filter(
        (alerta) => {

          const activo =
            activos.find(
              (activo) =>
                activo.id ===
                alerta.activoId
            );

          const coincideBusqueda =

            !termino ||

            activo?.nombre
              ?.toLowerCase()
              .includes(termino)

            ||

            activo?.codigo
              ?.toLowerCase()
              .includes(termino)

            ||

            alerta.tipo
              ?.toLowerCase()
              .includes(termino)

            ||

            alerta.descripcion
              ?.toLowerCase()
              .includes(termino);

          const coincideEstado =

            !estado ||

            alerta.estado === estado;

          const coincidePrioridad =

            !prioridad ||

            alerta.prioridad === prioridad;

          return (

            coincideBusqueda &&

            coincideEstado &&

            coincidePrioridad

          );

        }

      );

    },[
      alertas,
      activos,
      busqueda,
      estado,
      prioridad,
    ]);

  return (

<section className="registro-alertas">

<header className="registro-alertas-header">

<div>

<h2>

Centro Operativo de Alertas

</h2>

<p>

Supervise las alertas operativas generadas por el sistema GANUS.

</p>

</div>

<div className="registro-alertas-total">

<Bell
size={18}
/>

<span>

{alertasFiltradas.length}

registros

</span>

</div>

</header>

<FiltrosAlertas

busqueda={busqueda}

setBusqueda={setBusqueda}

estado={estado}

setEstado={setEstado}

prioridad={prioridad}

setPrioridad={setPrioridad}

/>

<TablaAlertas

alertas={
alertasFiltradas
}

activos={activos}

onVerDetalle={
onVerDetalle
}

/>

</section>

  );

}