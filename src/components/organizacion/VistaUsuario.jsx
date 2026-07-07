/**
 * ==========================================================
 * Componente: VistaUsuario
 * Módulo: Organización
 *
 * Responsabilidad:
 * Mostrar la información de un usuario
 * en modo solo lectura.
 * ==========================================================
 */

const VistaUsuario = ({ usuario }) => {

    if (!usuario) return null;

    return (

        <div className="vista-grupo">

            <div className="campo-vista">

                <strong>Nombre</strong>

                <p>{usuario.nombre}</p>

            </div>

            <div className="campo-vista">

                <strong>Correo electrónico</strong>

                <p>{usuario.correo}</p>

            </div>

            <div className="campo-vista">

                <strong>Rol</strong>

                <p>{usuario.rol}</p>

            </div>

            <div className="campo-vista">

                <strong>Estado</strong>

                <p>{usuario.estado}</p>

            </div>

        </div>

    );

};

export default VistaUsuario;