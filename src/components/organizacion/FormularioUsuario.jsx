/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import roles from "../../data/roles";
import {
    obtenerGrupos,
    obtenerFincas,
} from "../../services/organizationService";

import "./FormularioGrupo.css";

/**
 * ==========================================================
 * Componente: FormularioUsuario
 * Módulo: Organización
 *
 * Responsabilidad:
 * Formulario reutilizable para:
 * - Crear Usuario
 * - Editar Usuario
 * ==========================================================
 */

const FormularioUsuario = ({
    usuario = null,
    onGuardar,
    onCancelar,
}) => {

    // ======================================================
    // Estado inicial
    // ======================================================

    const [formulario, setFormulario] = useState({

    nombre: "",

    correo: "",

    grupoEmpresarial: "",

    finca: "",

    rol: "",

    estado: "Activo",

});

const gruposEmpresariales = obtenerGrupos();

const fincas = obtenerFincas();
  // ======================================================
// Cargar datos cuando se edita
// ======================================================

useEffect(() => {

    if (usuario) {

        setFormulario({

            nombre: usuario.nombre,
            correo: usuario.correo,
            grupoEmpresarial: usuario.grupoEmpresarial ?? "",
            finca: usuario.finca ?? "",
            rol: usuario.rol,
            estado: usuario.estado,

        });

    }

}, [usuario]);



    // ======================================================
    // Actualizar formulario
    // ======================================================

   const manejarCambio = (e) => {

    const { name, value } = e.target;

    setFormulario((prev) => {

        if (name === "grupoEmpresarial") {

            return {

                ...prev,

                grupoEmpresarial: value,

                finca: "",

            };

        }

        return {

            ...prev,

            [name]: value,

        };

    });

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

                    <label>Nombre completo</label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Correo electrónico</label>

                    <input
                        type="email"
                        name="correo"
                        value={formulario.correo}
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
            Seleccione un grupo
        </option>

        {

            gruposEmpresariales.map((grupo) => (

                <option
                    key={grupo.id}
                    value={grupo.nombre}
                >

                    {grupo.nombre}

                </option>

            ))

        }

    </select>

</div>

<div className="campo">

    <label>Finca</label>

    <select
        name="finca"
        value={formulario.finca}
        onChange={manejarCambio}
        required
    >

        <option value="">
            Seleccione una finca
        </option>

        {

            fincas
                .filter(

                    (finca) =>

                        !formulario.grupoEmpresarial ||

                        finca.grupoEmpresarial ===
                        formulario.grupoEmpresarial

                )
                .map((finca) => (

                    <option
                        key={finca.id}
                        value={finca.nombre}
                    >

                        {finca.nombre}

                    </option>

                ))

        }

    </select>

</div>

                <div className="campo">

    <label>Rol</label>

    <select
        name="rol"
        value={formulario.rol}
        onChange={manejarCambio}
        required
    >

        <option value="">

            Seleccione un rol

        </option>

        {

            roles.map((rol) => (

                <option
                    key={rol.id}
                    value={rol.nombre}
                >

                    {rol.nombre}

                </option>

            ))

        }

    </select>

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

export default FormularioUsuario;