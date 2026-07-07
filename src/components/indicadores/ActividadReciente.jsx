import {
    CheckCircle2,
    Bell,
    Database,
    Activity,
} from "lucide-react";

const actividades = [

    {
        icono: <CheckCircle2 size={18}/>,
        titulo: "Inventario actualizado",
        descripcion: "15 activos sincronizados correctamente.",
        hora: "Hace 5 minutos",
        clase: "success",
    },

    {
        icono: <Bell size={18}/>,
        titulo: "Alerta atendida",
        descripcion: "Seguimiento operativo finalizado.",
        hora: "Hace 12 minutos",
        clase: "warning",
    },

    {
        icono: <Database size={18}/>,
        titulo: "Sincronización",
        descripcion: "Base de datos actualizada.",
        hora: "Hace 28 minutos",
        clase: "primary",
    },

    {
        icono: <Activity size={18}/>,
        titulo: "Actividad registrada",
        descripcion: "Nuevo pesaje registrado correctamente.",
        hora: "Hace 1 hora",
        clase: "success",
    },

];

export default function ActividadReciente(){

    return(

        <section className="actividad-reciente">

            <div className="indicadores-card-header">

                <div>

                    <h3>

                        Actividad reciente

                    </h3>

                    <span>

                        Últimos eventos del sistema

                    </span>

                </div>

            </div>

            <div className="actividad-lista">

                {

                    actividades.map((actividad,index)=>(

                        <article
                            key={index}
                            className="actividad-item"
                        >

                            <div className={`actividad-icono ${actividad.clase}`}>

                                {actividad.icono}

                            </div>

                            <div className="actividad-info">

                                <strong>

                                    {actividad.titulo}

                                </strong>

                                <span>

                                    {actividad.descripcion}

                                </span>

                            </div>

                            <small>

                                {actividad.hora}

                            </small>

                        </article>

                    ))

                }

            </div>

        </section>

    );

}