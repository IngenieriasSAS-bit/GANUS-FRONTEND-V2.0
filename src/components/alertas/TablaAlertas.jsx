import { Eye } from "lucide-react";

import EstadoAlerta from "./Badges/EstadoAlerta";
import PrioridadAlerta from "./Badges/PrioridadAlerta";
import TipoAlerta from "./Badges/TipoAlerta";

export default function TablaAlertas({
  alertas,
  activos,
  onVerDetalle,
}) {

  const obtenerActivo = (activoId) => {

    return activos.find(
      (activo) =>
        activo.id === activoId
    );

  };

  const formatearFecha = (fecha) => {

  return new Date(fecha).toLocaleDateString(
    "es-CO",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};

  if (alertas.length === 0) {

    return (

      <div className="alertas-vacio">

        <h3>

          No se encontraron alertas

        </h3>

        <p>

          Modifique los filtros para visualizar más registros.

        </p>

      </div>

    );

  }

  return (

<div className="tabla-alertas-contenedor">

<table className="tabla-alertas">

<thead>

<tr>

<th>Fecha</th>

<th>Activo</th>

<th>Tipo</th>

<th>Prioridad</th>

<th>Estado</th>

<th>Acciones</th>

</tr>

</thead>

<tbody>

{

alertas.map((alerta)=>{

const activo=

obtenerActivo(

alerta.activoId

);

return(

<tr key={alerta.id}>

<td>

<div className="fecha-alerta">

    {formatearFecha(
        alerta.fechaGeneracion
    )}

</div>

</td>

<td>

<div className="activo-alerta">

<strong>

{activo?.nombre}

</strong>

<span>

{activo?.codigo}

</span>

</div>

</td>

<td>

<TipoAlerta

tipo={

alerta.tipoAlerta

}

/>

</td>

<td>

<PrioridadAlerta

prioridad={

alerta.prioridad

}

/>

</td>

<td>

<EstadoAlerta

estado={

alerta.estado

}

/>

</td>

<td>

<button
  className="btn-ver-alerta"
  title="Ver detalle de la alerta"
  onClick={() =>
    onVerDetalle(alerta)
  }
>

  <Eye
    size={18}
    strokeWidth={2}
  />

</button>

</td>

</tr>

);

})

}

</tbody>

</table>

</div>

);

}