/**
 * ==========================================================
 * Componente: FincasCard
 * Módulo: Organización
 *
 * Responsabilidad:
 * Administrar las fincas registradas en GANUS.
 *
 * Desde aquí se podrá:
 * - Buscar fincas.
 * - Crear fincas.
 * - Ver fincas.
 * - Editar fincas.
 * - Desactivar fincas.
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

import FormularioFinca from "./FormularioFinca";
import VistaFinca from "./VistaFinca";

import fincasIniciales from "../../data/fincas";

import "./GrupoEmpresarialCard.css";

    export default function FincasCard() {

    // ======================================================
    // Estado principal
    // ======================================================

    const [fincas, setFincas] = useState(fincasIniciales);

    // ======================================================
    // Buscador
    // ======================================================

    const [busqueda, setBusqueda] = useState("");

    // ======================================================
    // Formularios
    // ======================================================

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [fincaEditando, setFincaEditando] = useState(null);

    // ======================================================
    // Vista
    // ======================================================

    const [mostrarVista, setMostrarVista] = useState(false);

    const [fincaSeleccionada, setFincaSeleccionada] = useState(null);

    // ======================================================
    // Confirmación
    // ======================================================

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const [fincaEliminar, setFincaEliminar] = useState(null);

    // ======================================================
// Abrir formulario para crear
// ======================================================

const abrirNuevaFinca = () => {

    setFincaEditando(null);

    setMostrarFormulario(true);

};

// ======================================================
// Cerrar formulario
// ======================================================

const cerrarFormulario = () => {

    setMostrarFormulario(false);

    setFincaEditando(null);

};

// ======================================================
// Cerrar vista
// ======================================================

const cerrarVista = () => {

    setMostrarVista(false);

    setFincaSeleccionada(null);

};

// ======================================================
// Guardar finca
// ======================================================

const guardarFinca = (finca) => {

    if (fincaEditando) {

        const nuevasFincas = fincas.map((item) =>

            item.id === fincaEditando.id

                ? {

                    ...finca,

                    id: fincaEditando.id

                }

                : item

        );

        setFincas(nuevasFincas);

    }

    else {

        const nuevaFinca = {

            id: Date.now(),

            ...finca

        };

        setFincas([

            ...fincas,

            nuevaFinca

        ]);

    }

    cerrarFormulario();

};

// ======================================================
// Editar finca
// ======================================================

const editarFinca = (finca) => {

    setFincaEditando(finca);

    setMostrarFormulario(true);

};

// ======================================================
// Ver finca
// ======================================================

const verFinca = (finca) => {

    setFincaSeleccionada(finca);

    setMostrarVista(true);

};

// ======================================================
// Solicitar desactivación
// ======================================================

const desactivarFinca = (finca) => {

    setFincaEliminar(finca);

    setMostrarConfirmacion(true);

};

// ======================================================
// Confirmar desactivación
// ======================================================

const confirmarDesactivacion = () => {

    const nuevasFincas = fincas.map((item) => {

        if (item.id === fincaEliminar.id) {

            return {

                ...item,

                estado: "Inactivo"

            };

        }

        return item;

    });

    setFincas(nuevasFincas);

    setMostrarConfirmacion(false);

    setFincaEliminar(null);

};

// ======================================================
// Buscar fincas
// ======================================================

const fincasFiltradas = fincas.filter((finca) => {

    const texto = busqueda.toLowerCase().trim();

    return (

        finca.nombre.toLowerCase().includes(texto) ||

        finca.grupoEmpresarial.toLowerCase().includes(texto) ||

        finca.municipio.toLowerCase().includes(texto) ||

        finca.departamento.toLowerCase().includes(texto) ||

        finca.estado.toLowerCase().includes(texto)

    );

});

    // ======================================================
    // Render
    // ======================================================

        return (

    <section className="grupo-card">

        <div className="grupo-header">

            <div>

                <h2>Fincas</h2>

                <p>

                    Administre las fincas registradas dentro de GANUS.

                </p>

            </div>

        </div>

        {/* =======================================
            Barra superior
        ======================================= */}

        <div className="grupo-toolbar">

            <SearchInput
                placeholder="Buscar finca..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <PrimaryButton
                onClick={abrirNuevaFinca}
            >

                Nueva Finca

            </PrimaryButton>

        </div>

        {/* =======================================
    Tabla de Fincas
======================================= */}

<DataTable
    columns={[
        "Nombre",
        "Grupo Empresarial",
        "Municipio",
        "Departamento",
        "Estado",
        "Acciones"
    ]}
    rows={
        fincasFiltradas.map((finca) => ({
            nombre: finca.nombre,
            grupoEmpresarial: finca.grupoEmpresarial,
            municipio: finca.municipio,
            departamento: finca.departamento,
            estado: finca.estado,
            acciones: (
                <ActionButtons
                    onView={() => verFinca(finca)}
                    onEdit={() => editarFinca(finca)}
                    onDelete={() => desactivarFinca(finca)}
                />
            )
        }))
    }
/>

{
    fincasFiltradas.length === 0 && (
        <div className="sin-resultados">

            <h3>No se encontraron fincas.</h3>

            <p>
                Intente realizar otra búsqueda o registre una nueva finca.
            </p>

        </div>
    )
}

<Modal
    isOpen={mostrarFormulario}
    titulo={
        fincaEditando
            ? "Editar Finca"
            : "Nueva Finca"
    }
    onClose={cerrarFormulario}
>

    <FormularioFinca
        finca={fincaEditando}
        onGuardar={guardarFinca}
        onCancelar={cerrarFormulario}
    />

</Modal>

<Modal
    isOpen={mostrarVista}
    titulo="Información de la Finca"
    onClose={cerrarVista}
>

    <VistaFinca
        finca={fincaSeleccionada}
    />

</Modal>

<ConfirmModal
    isOpen={mostrarConfirmacion}
    titulo="Confirmar desactivación"
    mensaje={
        fincaEliminar
            ? `¿Está seguro de desactivar la finca "${fincaEliminar.nombre}"?`
            : ""
    }
    textoBoton="Desactivar"
    onConfirm={confirmarDesactivacion}
    onCancel={() => {

        setMostrarConfirmacion(false);

        setFincaEliminar(null);

    }}
/>

</section>

);

} 