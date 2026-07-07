import { useEffect, useState } from "react";

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
    // Estado inicial
    // ======================================================

    const [formulario, setFormulario] = useState({

        nombre: "",

        grupoEmpresarial: "",

        municipio: "",

        departamento: "",

        estado: "Activo",

    });

    // ======================================================
    // Cargar datos al editar
    // ======================================================

    useEffect(() => {

    if (finca) {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormulario({

            nombre: finca.nombre,

            grupoEmpresarial: finca.grupoEmpresarial,

            municipio: finca.municipio,

            departamento: finca.departamento,

            estado: finca.estado,

        });

    }

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

                    <input
                        type="text"
                        name="grupoEmpresarial"
                        value={formulario.grupoEmpresarial}
                        onChange={manejarCambio}
                        required
                    />

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