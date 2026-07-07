/**
 * ==========================================================
 * Componente: PermisosCard
 * Módulo: Organización
 *
 * Responsabilidad:
 * Administrar los permisos asociados
 * a cada rol de la plataforma.
 *
 * Por ahora trabaja únicamente
 * con datos locales.
 * ==========================================================
 */

import { useState } from "react";

import permisosIniciales from "../../data/permisos";
import rolesIniciales from "../../data/roles";

import "./GrupoEmpresarialCard.css";

export default function PermisosCard() {

    // ======================================================
    // Estado de la matriz
    // ======================================================

    const [permisos, setPermisos] = useState(permisosIniciales);

    const [permisosOriginales] = useState(
    structuredClone(permisosIniciales)
);

    // ======================================================
    // Rol seleccionado
    // ======================================================

    const [rolSeleccionado, setRolSeleccionado] = useState(
        rolesIniciales[0]?.nombre || ""
    );

    // ======================================================
// Información del rol seleccionado
// ======================================================

const rolActual = rolesIniciales.find(

    (rol) => rol.nombre === rolSeleccionado

);

    // ======================================================
    // Cambiar permiso
    // ======================================================

    const cambiarPermiso = (fila, propiedad) => {

        const nuevaMatriz = [...permisos];

        nuevaMatriz[fila][propiedad] =
            !nuevaMatriz[fila][propiedad];

        setPermisos(nuevaMatriz);

    };

    // ======================================================
// Restablecer permisos
// ======================================================

const restablecerPermisos = () => {

    setPermisos(structuredClone(permisosOriginales));

};

// ======================================================
// Guardar permisos
// ======================================================

const guardarPermisos = () => {

    console.log("Permisos guardados:", permisos);

};

    // ======================================================
    // Render
    // ======================================================

    return (

        <section className="grupo-card">

            <div className="grupo-header">

                <div>

                    <h2>Permisos</h2>

                    <p>

                        Configure los permisos asociados a cada rol.

                    </p>

                </div>

            </div>

            {/* =======================================
                Selección del Rol
            ======================================= */}

            <div className="grupo-toolbar">

                <label>

                    <strong>Rol</strong>

                </label>

                <select

                    value={rolSeleccionado}

                    onChange={(e) =>
                        setRolSeleccionado(e.target.value)
                    }

                >

                    {

                        rolesIniciales.map((rol) => (

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

            {/* =======================================
    Información del Rol
======================================= */}

<div className="card-informacion-rol">

    <div className="info-item">

        <span>Nombre</span>

        <strong>

            {rolActual?.nombre}

        </strong>

    </div>

    <div className="info-item">

        <span>Descripción</span>

        <strong>

            {rolActual?.descripcion}

        </strong>

    </div>

    <div className="info-item">

        <span>Estado</span>

        <strong>

            {rolActual?.estado}

        </strong>

    </div>

    <div className="info-item">

        <span>Permisos</span>

        <strong>

            {rolActual?.permisos}

        </strong>

    </div>

</div>

            {/* =======================================
                Matriz de Permisos
            ======================================= */}

            <div className="tabla-permisos">

                <table>

                    <thead>

                        <tr>

                            <th>Módulo</th>

                            <th>Ver</th>

                            <th>Crear</th>

                            <th>Editar</th>

                            <th>Desactivar</th>

                            <th>Exportar</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            permisos.map((permiso, index) => (

                                <tr key={permiso.modulo}>

                                    <td>

                                        {permiso.modulo}

                                    </td>

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={permiso.ver}
                                            onChange={() =>
                                                cambiarPermiso(index, "ver")
                                            }
                                        />

                                    </td>

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={permiso.crear}
                                            onChange={() =>
                                                cambiarPermiso(index, "crear")
                                            }
                                        />

                                    </td>

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={permiso.editar}
                                            onChange={() =>
                                                cambiarPermiso(index, "editar")
                                            }
                                        />

                                    </td>

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={permiso.desactivar}
                                            onChange={() =>
                                                cambiarPermiso(index, "desactivar")
                                            }
                                        />

                                    </td>

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={permiso.exportar}
                                            onChange={() =>
                                                cambiarPermiso(index, "exportar")
                                            }
                                        />

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <div className="acciones-permisos">

    <button
        className="btn-cancelar"
        onClick={restablecerPermisos}
    >

        Restablecer

    </button>

    <button
        className="btn-guardar"
        onClick={guardarPermisos}
    >

        Guardar Cambios

    </button>

</div>

        </section>

    );

}