/**
 * ==========================================================
 * Componente: VistaGrupo
 * Módulo: Organización
 *
 * Responsabilidad:
 * Mostrar la información de un Grupo Empresarial
 * en modo consulta.
 * ==========================================================
 */

export default function VistaGrupo({ grupo }) {

    if (!grupo) return null;

    return (

        <div className="vista-grupo">

            <div className="campo">

                <strong>Nombre</strong>

                <p>{grupo.nombre}</p>

            </div>

            <div className="campo">

                <strong>Descripción</strong>

                <p>{grupo.descripcion}</p>

            </div>

            <div className="campo">

                <strong>Estado</strong>

                <p>{grupo.estado}</p>

            </div>

            <div className="campo">

                <strong>Fincas</strong>

                <p>{grupo.fincas}</p>

            </div>

        </div>

    );

}