/**
 * ==========================================================
 * Componente: VistaFinca
 * Módulo: Organización
 *
 * Responsabilidad:
 * Mostrar la información de una finca
 * en modo consulta.
 * ==========================================================
 */

export default function VistaFinca({ finca }) {

    if (!finca) return null;

    return (

        <div className="vista-grupo">

            <div className="campo">

                <strong>Nombre</strong>

                <p>{finca.nombre}</p>

            </div>

            <div className="campo">

                <strong>Grupo Empresarial</strong>

                <p>{finca.grupoEmpresarial}</p>

            </div>

            <div className="campo">

                <strong>Municipio</strong>

                <p>{finca.municipio}</p>

            </div>

            <div className="campo">

                <strong>Departamento</strong>

                <p>{finca.departamento}</p>

            </div>

            <div className="campo">

                <strong>Estado</strong>

                <p>{finca.estado}</p>

            </div>

        </div>

    );

}