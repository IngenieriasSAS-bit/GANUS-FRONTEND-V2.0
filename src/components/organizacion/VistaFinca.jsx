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

        <h3>Información General</h3>

        <div className="campo">
            <strong>Nombre</strong>
            <p>{finca.nombre}</p>
        </div>

        <div className="campo">
            <strong>Grupo Empresarial</strong>
            <p>{finca.grupoEmpresarial}</p>
        </div>

        <div className="campo">
            <strong>Estado</strong>
            <p>{finca.estado}</p>
        </div>

        <hr />

        <h3>Ubicación</h3>

        <div className="campo">
            <strong>Dirección</strong>
            <p>{finca.direccion || "-"}</p>
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
            <strong>Latitud</strong>
            <p>{finca.latitud || "-"}</p>
        </div>

        <div className="campo">
            <strong>Longitud</strong>
            <p>{finca.longitud || "-"}</p>
        </div>

        <hr />

        <h3>Perfil Empresarial</h3>

        <div className="campo">
            <strong>Negocio</strong>
            <p>{finca.negocio || "-"}</p>
        </div>

        <div className="campo">
            <strong>Sector</strong>
            <p>{finca.sector || "-"}</p>
        </div>

        <div className="campo">
            <strong>Industria</strong>
            <p>{finca.industria || "-"}</p>
        </div>

    </div>

);

}