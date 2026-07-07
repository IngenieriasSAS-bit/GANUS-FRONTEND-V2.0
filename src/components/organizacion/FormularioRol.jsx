import { useEffect, useState } from "react";

import "./FormularioGrupo.css";

/**
 * ==========================================================
 * Componente: FormularioRol
 * Módulo: Organización
 *
 * Responsabilidad:
 * Formulario reutilizable para:
 * - Crear Rol
 * - Editar Rol
 * ==========================================================
 */

const FormularioRol = ({
    rol = null,
    onGuardar,
    onCancelar,
}) => {

    // ======================================================
    // Estado inicial
    // ======================================================

    const [formulario, setFormulario] = useState({

        nombre: "",

        descripcion: "",

        estado: "Activo",

    });

    // ======================================================
    // Cargar datos cuando se edita
    // ======================================================

    useEffect(() => {

        if (rol) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormulario({

                nombre: rol.nombre,

                descripcion: rol.descripcion,

                estado: rol.estado,

            });

        }

    }, [rol]);

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
    // Guardar información
    // ======================================================

    const manejarSubmit = (e) => {

        e.preventDefault();

        onGuardar(formulario);

    };

    return (

        <div className="formulario-grupo">

            <form onSubmit={manejarSubmit}>

                <div className="campo">

                    <label>Nombre del Rol</label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Descripción</label>

                    <textarea
                        name="descripcion"
                        rows="4"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
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

export default FormularioRol;