import { useEffect, useState } from "react";

import { obtenerDatosOrganizacion } from "../../services/organizationService";

import "./FormularioGrupo.css";

/**
 * ==========================================================
 * Componente: FormularioFinca
 * Módulo: Organización
 *
 * Responsabilidad:
 * Formulario reutilizable para:
 * - Crear Finca
 * - Editar Finca
 * ==========================================================
 */

const FormularioFinca = ({
    finca = null,
    onGuardar,
    onCancelar,
}) => {

    // ======================================================
    // Estado del formulario
    // ======================================================

    const [formulario, setFormulario] = useState({

    nombre: "",

    grupoEmpresarial: "",

    direccion: "",

    municipio: "",

    departamento: "",

    latitud: "",

    longitud: "",

    negocio: "",

    sector: "",

    industria: "",

    estado: "Activo",

});

    // ======================================================
    // Lista de grupos empresariales
    // ======================================================

    const [grupos, setGrupos] = useState([]);

    // ======================================================
    // Cargar grupos registrados
    // ======================================================

    useEffect(() => {

    const gruposDisponibles =
        obtenerDatosOrganizacion();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGrupos(gruposDisponibles);

}, []);

    // ======================================================
    // Cargar datos cuando se edita
    // ======================================================

    useEffect(() => {

    if (!finca) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormulario({

    nombre: finca.nombre ?? "",

    grupoEmpresarial: finca.grupoEmpresarial ?? "",

    direccion: finca.direccion ?? "",

    municipio: finca.municipio ?? "",

    departamento: finca.departamento ?? "",

    latitud: finca.latitud ?? "",

    longitud: finca.longitud ?? "",

    negocio: finca.negocio ?? "",

    sector: finca.sector ?? "",

    industria: finca.industria ?? "",

    estado: finca.estado ?? "Activo",

});

}, [finca]);

    // ======================================================
    // Actualizar formulario
    // ======================================================

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ======================================================
    // Guardar
    // ======================================================

    const manejarSubmit = (e) => {

        e.preventDefault();

        onGuardar(formulario);

    };

    return (

        <div className="formulario-grupo">

            <form onSubmit={manejarSubmit}>

                <div className="campo">

                    <label>Nombre de la finca</label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Grupo Empresarial</label>

                    <select
                        name="grupoEmpresarial"
                        value={formulario.grupoEmpresarial}
                        onChange={manejarCambio}
                        required
                    >

                        <option value="">

                            Seleccione un Grupo Empresarial

                        </option>

                        {grupos.map((grupo) => (

                            <option
                                key={grupo.id}
                                value={grupo.nombre}
                            >

                                {grupo.nombre}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="campo">

                    <label>Municipio</label>

                    <input
                        type="text"
                        name="municipio"
                        value={formulario.municipio}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Departamento</label>

                    <input
                        type="text"
                        name="departamento"
                        value={formulario.departamento}
                        onChange={manejarCambio}
                        required
                    />

                    <div className="campo">

    <label>Dirección</label>

    <input
        type="text"
        name="direccion"
        value={formulario.direccion}
        onChange={manejarCambio}
        placeholder="Dirección principal de la finca"
    />

</div>

<div className="campo">

    <label>Latitud</label>

    <input
        type="text"
        name="latitud"
        value={formulario.latitud}
        onChange={manejarCambio}
        placeholder="Ej: 4.7110"
    />

</div>

<div className="campo">

    <label>Longitud</label>

    <input
        type="text"
        name="longitud"
        value={formulario.longitud}
        onChange={manejarCambio}
        placeholder="Ej: -74.0721"
    />

</div>

<div className="campo">

    <label>Negocio</label>

    <input
        type="text"
        name="negocio"
        value={formulario.negocio}
        onChange={manejarCambio}
        placeholder="Ej: Ganadería de carne"
    />

</div>

<div className="campo">

    <label>Sector</label>

    <input
        type="text"
        name="sector"
        value={formulario.sector}
        onChange={manejarCambio}
        placeholder="Ej: Agropecuario"
    />

</div>

<div className="campo">

    <label>Industria</label>

    <input
        type="text"
        name="industria"
        value={formulario.industria}
        onChange={manejarCambio}
        placeholder="Ej: Producción bovina"
    />

</div>

                </div>

                <div className="campo">

                    <label>Estado</label>

                    <select
                        name="estado"
                        value={formulario.estado}
                        onChange={manejarCambio}
                    >

                        <option value="Activo">

                            Activo

                        </option>

                        <option value="Inactivo">

                            Inactivo

                        </option>

                    </select>

                </div>

                <div className="acciones">

                    <button
                        type="button"
                        className="btn-cancelar"
                        onClick={onCancelar}
                    >

                        Cancelar

                    </button>

                    <button
                        type="submit"
                        className="btn-guardar"
                    >

                        Guardar

                    </button>

                </div>

            </form>

        </div>

    );

};

export default FormularioFinca;