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

            <h3>Perfil Empresarial</h3>

<div className="campo">

    <strong>Sector</strong>

    <p>{grupo.sector || "-"}</p>

</div>

<div className="campo">

    <strong>Industria</strong>

    <p>{grupo.industria || "-"}</p>

</div>

<div className="campo">

    <strong>Tipo de Negocio</strong>

    <p>{grupo.tipoNegocio || "-"}</p>

</div>

<div className="campo">

    <strong>Modelo de Producción</strong>

    <p>{grupo.modeloProduccion || "-"}</p>

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