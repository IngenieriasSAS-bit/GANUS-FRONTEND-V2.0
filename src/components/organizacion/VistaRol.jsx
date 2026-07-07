/**
 * ==========================================================
 * Componente: VistaRol
 * Módulo: Organización
 *
 * Responsabilidad:
 * Mostrar la información de un rol
 * en modo solo lectura.
 * ==========================================================
 */

const VistaRol = ({ rol }) => {

    if (!rol) return null;

    return (

        <div className="vista-grupo">

            <div className="campo-vista">

                <strong>Nombre</strong>

                <p>{rol.nombre}</p>

            </div>

            <div className="campo-vista">

                <strong>Descripción</strong>

                <p>{rol.descripcion}</p>

            </div>

            <div className="campo-vista">

                <strong>Estado</strong>

                <p>{rol.estado}</p>

            </div>

            <div className="campo-vista">

                <strong>Cantidad de permisos</strong>

                <p>{rol.permisos}</p>

            </div>

        </div>

    );

};

export default VistaRol;