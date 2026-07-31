/**
 * ==========================================================
 * Componente: GrupoEmpresarialCard
 * Módulo: Organización
 *
 * Responsabilidad:
 * Administrar los Grupos Empresariales.
 *
 * Desde aquí se podrá:
 * - Buscar grupos.
 * - Crear grupos.
 * - Editar grupos.
 * - Eliminar grupos.
 *
 * Por ahora todo funciona con datos locales.
 * ==========================================================
 */

import { useState } from "react";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";
import DataTable from "../common/DataTable";
import ActionButtons from "../common/ActionButtons";
import FormularioGrupo from "./FormularioGrupo";
import VistaGrupo from "./VistaGrupo";
import {
    crearGrupoEmpresarial,
    obtenerDatosOrganizacion,
    actualizarGrupoEmpresarial,
    desactivarGrupoEmpresarial,
} from "../../services/organizationService";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";

import "./GrupoEmpresarialCard.css";

export default function GrupoEmpresarialCard() {

    // ======================================================
    // Estado principal del listado
    // ======================================================

    const [grupos, setGrupos] = useState(() => {

    return obtenerDatosOrganizacion();

});

    

    // ======================================================
    // Controla la apertura del formulario
    // ======================================================

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // ======================================
// Texto del buscador
// ======================================

const [busqueda, setBusqueda] = useState("");

    // ======================================================
    // Grupo seleccionado para editar
    // Si es null significa que estamos creando uno nuevo.
    // ======================================================

    const [grupoEditando, setGrupoEditando] = useState(null);

    // ======================================================
// Grupo seleccionado para visualizar
// ======================================================

const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

// ======================================================
// Controla el modal de visualización
// ======================================================

const [mostrarVista, setMostrarVista] = useState(false);

// ======================================================
// Confirmación de desactivación
// ======================================================

const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

const [grupoEliminar, setGrupoEliminar] = useState(null);



    // ======================================================
    // Abrir formulario para crear
    // ======================================================


    const abrirNuevoGrupo = () => {

        setGrupoEditando(null);

        setMostrarFormulario(true);

    };

    // ======================================================
    // Cerrar formulario
    // ======================================================

    const cerrarFormulario = () => {

        setMostrarFormulario(false);

        setGrupoEditando(null);

    };

    // ======================================================
// Cerrar Vista
// ======================================================

const cerrarVista = () => {

    setMostrarVista(false);

    setGrupoSeleccionado(null);

};

    // ======================================================
    // Guardar Grupo
    // ======================================================

    const guardarGrupo = (grupoFormulario) => {

    // ============================================
    // EDITAR
    // ============================================

    if (grupoEditando) {

    try {

        actualizarGrupoEmpresarial(

            grupoEditando.id,

            grupoFormulario

        );

        setGrupos(

            obtenerDatosOrganizacion()

        );

        cerrarFormulario();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    return;

}

    // ============================================
    // CREAR
    // ============================================

    try {

        const nuevoGrupo =
            crearGrupoEmpresarial(grupoFormulario);

        setGrupos((prev) => [

            ...prev,

            nuevoGrupo,

        ]);

        cerrarFormulario();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    // ======================================================
    // Editar Grupo
    // ======================================================

    const editarGrupo = (grupo) => {

        setGrupoEditando(grupo);

        setMostrarFormulario(true);

    };

// ======================================================
// Ver Grupo
// ======================================================

const verGrupo = (grupo) => {

    setGrupoSeleccionado(grupo);

    setMostrarVista(true);

};

// ======================================================
// Desactivar Grupo Empresarial
// ======================================================

// ======================================================
// Solicitar desactivación
// ======================================================

const eliminarGrupo = (grupo) => {

    setGrupoEliminar(grupo);

    setMostrarConfirmacion(true);

};

// ======================================================
// Confirmar desactivación
// ======================================================

const confirmarDesactivacion = () => {

    try {

        desactivarGrupoEmpresarial(

            grupoEliminar.id

        );

        setGrupos(

            obtenerDatosOrganizacion()

        );

        setMostrarConfirmacion(false);

        setGrupoEliminar(null);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    // ======================================================
// Filtrar grupos según la búsqueda
// ======================================================

const gruposFiltrados = grupos.filter((grupo) => {

    const textoBusqueda = busqueda.toLowerCase().trim();

    return (

        grupo.nombre.toLowerCase().includes(textoBusqueda) ||

        grupo.estado.toLowerCase().includes(textoBusqueda) ||

        grupo.descripcion.toLowerCase().includes(textoBusqueda)

    );

}); 

    // ======================================================
    // Render
    // ======================================================

    return (

        <section className="grupo-card">

            <div className="grupo-header">

                <div>

                    <h2>Grupo Empresarial</h2>

                    <p>

                        Administre los grupos empresariales
                        registrados dentro de GANUS.

                    </p>

                </div>

            </div>

            {/* =======================================
                Barra superior
            ======================================= */}

            <div className="grupo-toolbar">

                <SearchInput
    placeholder="Buscar grupo empresarial..."
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
/>

                <PrimaryButton
                    onClick={abrirNuevoGrupo}
                >

                    Nuevo Grupo

                </PrimaryButton>

            </div>

{

    gruposFiltrados.length > 0 ? (

        <DataTable

            columns={[

    "Nombre",

    "Sector",

    "Industria",

    "Estado",

    "Fincas",

    "Acciones"

]}

            rows={

                gruposFiltrados.map((grupo) => ({

    nombre: grupo.nombre,

    sector: grupo.sector || "-",

    industria: grupo.industria || "-",

    estado: grupo.estado,

    fincas: grupo.fincas,

    acciones: (

                        <ActionButtons

                            onView={() =>
                                verGrupo(grupo)
                            }

                            onEdit={() =>
                                editarGrupo(grupo)
                            }

                            onDelete={() =>
    eliminarGrupo(grupo)
}

                        />

                    )

                }))

            }

        />

    ) : (

        <div className="sin-resultados">

            <h3>No se encontraron grupos empresariales.</h3>

            <p>

                Intente realizar otra búsqueda o registre un nuevo grupo empresarial.

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
        grupoEditando
            ? "Editar Grupo Empresarial"
            : "Nuevo Grupo Empresarial"
    }
    onClose={cerrarFormulario}
>

    <FormularioGrupo
        grupo={grupoEditando}
        onGuardar={guardarGrupo}
        onCancelar={cerrarFormulario}
    />

</Modal>

<Modal
    isOpen={mostrarVista}
    titulo="Información del Grupo Empresarial"
    onClose={cerrarVista}
>

    <VistaGrupo
        grupo={grupoSeleccionado}
    /> 
</Modal>

<ConfirmModal

    isOpen={mostrarConfirmacion}

    titulo="Confirmar desactivación"

    mensaje={
        grupoEliminar
            ? `¿Está seguro de desactivar el grupo empresarial "${grupoEliminar.nombre}"?`
            : ""
    }

    textoBoton="Desactivar"

    onConfirm={confirmarDesactivacion}

    onCancel={() => {

        setMostrarConfirmacion(false);

        setGrupoEliminar(null);

    }}

/>

        </section>

    );

}

