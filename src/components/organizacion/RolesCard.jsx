/**
 * ==========================================================
 * Componente: RolesCard
 * Módulo: Organización
 *
 * Responsabilidad:
 * Administrar los roles registrados en GANUS.
 *
 * Desde aquí se podrá:
 * - Buscar roles.
 * - Crear roles.
 * - Ver roles.
 * - Editar roles.
 * - Desactivar roles.
 *
 * Por ahora todo funciona con datos locales.
 * ==========================================================
 */

import { useState } from "react";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";
import DataTable from "../common/DataTable";
import ActionButtons from "../common/ActionButtons";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";

import FormularioRol from "./FormularioRol";
import VistaRol from "./VistaRol";

import rolesIniciales from "../../data/roles";

import "./GrupoEmpresarialCard.css";

export default function RolesCard() {

    // ======================================================
    // Estado principal
    // ======================================================

    const [roles, setRoles] = useState(rolesIniciales);

    // ======================================================
    // Buscador
    // ======================================================

    const [busqueda, setBusqueda] = useState("");

    // ======================================================
    // Formularios
    // ======================================================

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [rolEditando, setRolEditando] = useState(null);

    // ======================================================
    // Vista
    // ======================================================

    const [mostrarVista, setMostrarVista] = useState(false);

    const [rolSeleccionado, setRolSeleccionado] = useState(null);

    // ======================================================
    // Confirmación
    // ======================================================

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const [rolEliminar, setRolEliminar] = useState(null);

    // ======================================================
    // Abrir formulario
    // ======================================================

    const abrirNuevoRol = () => {

        setRolEditando(null);

        setMostrarFormulario(true);

    };

    // ======================================================
    // Cerrar formulario
    // ======================================================

    const cerrarFormulario = () => {

        setMostrarFormulario(false);

        setRolEditando(null);

    };

    // ======================================================
    // Cerrar vista
    // ======================================================

    const cerrarVista = () => {

        setMostrarVista(false);

        setRolSeleccionado(null);

    };

    // ======================================================
    // Guardar rol
    // ======================================================

    const guardarRol = (rol) => {

        if (rolEditando) {

            const nuevosRoles = roles.map((item) =>

                item.id === rolEditando.id

                    ? {
                        ...item,
                        ...rol,
                    }

                    : item

            );

            setRoles(nuevosRoles);

        } else {

            const nuevoRol = {

                id: Date.now(),

                permisos: 0,

                ...rol,

            };

            setRoles([

                ...roles,

                nuevoRol,

            ]);

        }

        cerrarFormulario();

    };

    // ======================================================
    // Editar rol
    // ======================================================

    const editarRol = (rol) => {

        setRolEditando(rol);

        setMostrarFormulario(true);

    };

    // ======================================================
    // Ver rol
    // ======================================================

    const verRol = (rol) => {

        setRolSeleccionado(rol);

        setMostrarVista(true);

    };

    // ======================================================
    // Solicitar desactivación
    // ======================================================

    const desactivarRol = (rol) => {

        setRolEliminar(rol);

        setMostrarConfirmacion(true);

    };

    // ======================================================
    // Confirmar desactivación
    // ======================================================

    const confirmarDesactivacion = () => {

        const nuevosRoles = roles.map((item) => {

            if (item.id === rolEliminar.id) {

                return {

                    ...item,

                    estado: "Inactivo",

                };

            }

            return item;

        });

        setRoles(nuevosRoles);

        setMostrarConfirmacion(false);

        setRolEliminar(null);

    };

    // ======================================================
    // Buscar roles
    // ======================================================

    const rolesFiltrados = roles.filter((rol) => {

        const texto = busqueda.toLowerCase().trim();

        return (

            rol.nombre.toLowerCase().includes(texto) ||

            rol.descripcion.toLowerCase().includes(texto) ||

            rol.estado.toLowerCase().includes(texto)

        );

    });

       // ======================================================
    // Render
    // ======================================================

    return (

        <section className="grupo-card">

            <div className="grupo-header">

                <div>

                    <h2>Roles</h2>

                    <p>

                        Administre los roles registrados dentro de GANUS.

                    </p>

                </div>

            </div>

            {/* =======================================
                Barra superior
            ======================================= */}

            <div className="grupo-toolbar">

                <SearchInput
                    placeholder="Buscar rol..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <PrimaryButton
                    onClick={abrirNuevoRol}
                >

                    Nuevo Rol

                </PrimaryButton>

            </div>

            {

                rolesFiltrados.length > 0 ? (

                    <DataTable

                        columns={[

                            "Nombre",

                            "Descripción",

                            "Permisos",

                            "Estado",

                            "Acciones"

                        ]}

                        rows={

                            rolesFiltrados.map((rol) => ({

                                nombre: rol.nombre,

                                descripcion: rol.descripcion,

                                permisos: rol.permisos,

                                estado: rol.estado,

                                acciones: (

                                    <ActionButtons

                                        onView={() =>
                                            verRol(rol)
                                        }

                                        onEdit={() =>
                                            editarRol(rol)
                                        }

                                        onDelete={() =>
                                            desactivarRol(rol)
                                        }

                                    />

                                )

                            }))

                        }

                    />

                ) : (

                    <div className="sin-resultados">

                        <h3>No se encontraron roles.</h3>

                        <p>

                            Intente realizar otra búsqueda o registre un nuevo rol.

                        </p>

                    </div>

                )

            }

            {/* =======================================
                Formulario
            ======================================= */}

            <Modal
                isOpen={mostrarFormulario}
                titulo={
                    rolEditando
                        ? "Editar Rol"
                        : "Nuevo Rol"
                }
                onClose={cerrarFormulario}
            >

                <FormularioRol
                    rol={rolEditando}
                    onGuardar={guardarRol}
                    onCancelar={cerrarFormulario}
                />

            </Modal>

            {/* =======================================
                Vista
            ======================================= */}

            <Modal
                isOpen={mostrarVista}
                titulo="Información del Rol"
                onClose={cerrarVista}
            >

                <VistaRol
                    rol={rolSeleccionado}
                />

            </Modal>

            {/* =======================================
                Confirmación
            ======================================= */}

            <ConfirmModal

                isOpen={mostrarConfirmacion}

                titulo="Confirmar desactivación"

                mensaje={
                    rolEliminar
                        ? `¿Está seguro de desactivar el rol "${rolEliminar.nombre}"?`
                        : ""
                }

                textoBoton="Desactivar"

                onConfirm={confirmarDesactivacion}

                onCancel={() => {

                    setMostrarConfirmacion(false);

                    setRolEliminar(null);

                }}

            />

        </section>

    );

}