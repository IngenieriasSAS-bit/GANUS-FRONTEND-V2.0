/**
 * ==========================================================
 * Componente: UsuariosCard
 * Módulo: Organización
 *
 * Responsabilidad:
 * Administrar los usuarios registrados en GANUS.
 *
 * Desde aquí se podrá:
 * - Buscar usuarios.
 * - Crear usuarios.
 * - Ver usuarios.
 * - Editar usuarios.
 * - Desactivar usuarios.
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

import FormularioUsuario from "./FormularioUsuario";
import VistaUsuario from "./VistaUsuario";

import usuariosIniciales from "../../data/usuarios";

import "./GrupoEmpresarialCard.css";

export default function UsuariosCard() {

    // ======================================================
    // Estado principal
    // ======================================================

    const [usuarios, setUsuarios] = useState(usuariosIniciales);

    // ======================================================
    // Buscador
    // ======================================================

    const [busqueda, setBusqueda] = useState("");

    // ======================================================
    // Formulario
    // ======================================================

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [usuarioEditando, setUsuarioEditando] = useState(null);

    // ======================================================
    // Vista
    // ======================================================

    const [mostrarVista, setMostrarVista] = useState(false);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    // ======================================================
    // Confirmación
    // ======================================================

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const [usuarioEliminar, setUsuarioEliminar] = useState(null);

    // ======================================================
    // Abrir formulario
    // ======================================================

    const abrirNuevoUsuario = () => {

        setUsuarioEditando(null);

        setMostrarFormulario(true);

    };

    // ======================================================
    // Cerrar formulario
    // ======================================================

    const cerrarFormulario = () => {

        setMostrarFormulario(false);

        setUsuarioEditando(null);

    };

    // ======================================================
    // Cerrar vista
    // ======================================================

    const cerrarVista = () => {

        setMostrarVista(false);

        setUsuarioSeleccionado(null);

    };

    // ======================================================
    // Guardar usuario
    // ======================================================

    const guardarUsuario = (usuario) => {

        if (usuarioEditando) {

            const nuevosUsuarios = usuarios.map((item) =>

                item.id === usuarioEditando.id

                    ? {

                        ...usuario,

                        id: usuarioEditando.id,

                    }

                    : item

            );

            setUsuarios(nuevosUsuarios);

        }

        else {

            const nuevoUsuario = {

                id: Date.now(),

                ...usuario,

            };

            setUsuarios([

                ...usuarios,

                nuevoUsuario,

            ]);

        }

        cerrarFormulario();

    };

    // ======================================================
    // Editar usuario
    // ======================================================

    const editarUsuario = (usuario) => {

        setUsuarioEditando(usuario);

        setMostrarFormulario(true);

    };

    // ======================================================
    // Ver usuario
    // ======================================================

    const verUsuario = (usuario) => {

        setUsuarioSeleccionado(usuario);

        setMostrarVista(true);

    };

    // ======================================================
    // Solicitar desactivación
    // ======================================================

    const desactivarUsuario = (usuario) => {

        setUsuarioEliminar(usuario);

        setMostrarConfirmacion(true);

    };

    // ======================================================
    // Confirmar desactivación
    // ======================================================

    const confirmarDesactivacion = () => {

        const nuevosUsuarios = usuarios.map((item) => {

            if (item.id === usuarioEliminar.id) {

                return {

                    ...item,

                    estado: "Inactivo",

                };

            }

            return item;

        });

        setUsuarios(nuevosUsuarios);

        setMostrarConfirmacion(false);

        setUsuarioEliminar(null);

    };

    // ======================================================
    // Filtrar usuarios
    // ======================================================

    const usuariosFiltrados = usuarios.filter((usuario) => {

        const texto = busqueda.toLowerCase().trim();

        return (

            usuario.nombre.toLowerCase().includes(texto) ||

            usuario.correo.toLowerCase().includes(texto) ||

            usuario.rol.toLowerCase().includes(texto) ||

            usuario.estado.toLowerCase().includes(texto)

        );

    });

     // ======================================================
    // Render
    // ======================================================

    return (

        <section className="grupo-card">

            <div className="grupo-header">

                <div>

                    <h2>Usuarios</h2>

                    <p>

                        Administre los usuarios registrados dentro de GANUS.

                    </p>

                </div>

            </div>

            {/* =======================================
                Barra superior
            ======================================= */}

            <div className="grupo-toolbar">

                <SearchInput
                    placeholder="Buscar usuario..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <PrimaryButton
                    onClick={abrirNuevoUsuario}
                >

                    Nuevo Usuario

                </PrimaryButton>

            </div>

            {

                usuariosFiltrados.length > 0 ? (

                    <DataTable

                        columns={[

                            "Nombre",

                            "Correo",

                            "Rol",

                            "Estado",

                            "Acciones"

                        ]}

                        rows={

                            usuariosFiltrados.map((usuario) => ({

                                nombre: usuario.nombre,

                                correo: usuario.correo,

                                rol: usuario.rol,

                                estado: usuario.estado,

                                acciones: (

                                    <ActionButtons

                                        onView={() =>
                                            verUsuario(usuario)
                                        }

                                        onEdit={() =>
                                            editarUsuario(usuario)
                                        }

                                        onDelete={() =>
                                            desactivarUsuario(usuario)
                                        }

                                    />

                                )

                            }))

                        }

                    />

                ) : (

                    <div className="sin-resultados">

                        <h3>No se encontraron usuarios.</h3>

                        <p>

                            Intente realizar otra búsqueda o registre un nuevo usuario.

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
                    usuarioEditando
                        ? "Editar Usuario"
                        : "Nuevo Usuario"
                }
                onClose={cerrarFormulario}
            >

                <FormularioUsuario
                    usuario={usuarioEditando}
                    onGuardar={guardarUsuario}
                    onCancelar={cerrarFormulario}
                />

            </Modal>

            {/* =======================================
                Vista
            ======================================= */}

            <Modal
                isOpen={mostrarVista}
                titulo="Información del Usuario"
                onClose={cerrarVista}
            >

                <VistaUsuario
                    usuario={usuarioSeleccionado}
                />

            </Modal>

            {/* =======================================
                Confirmación
            ======================================= */}

            <ConfirmModal

                isOpen={mostrarConfirmacion}

                titulo="Confirmar desactivación"

                mensaje={
                    usuarioEliminar
                        ? `¿Está seguro de desactivar el usuario "${usuarioEliminar.nombre}"?`
                        : ""
                }

                textoBoton="Desactivar"

                onConfirm={confirmarDesactivacion}

                onCancel={() => {

                    setMostrarConfirmacion(false);

                    setUsuarioEliminar(null);

                }}

            />

        </section>

    );

}
    