import { useState } from "react";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";
import Modal from "../common/Modal";
import DataTable from "../common/DataTable";

import FormularioProceso from "./FormularioProceso";

import {
    obtenerProcesos,
    crearProceso,
} from "../../services/organizationService";

import ActionButtons from "../common/ActionButtons";
import ConfirmModal from "../common/ConfirmModal";

import {
    actualizarProceso,
    desactivarProceso,
} from "../../services/organizationService";

export default function ProcesosCard() {

    const [procesos, setProcesos] = useState(() =>
        obtenerProcesos()
    );

    const [busqueda, setBusqueda] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);

const [modoFormulario, setModoFormulario] = useState("crear");

const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const abrirFormulario = (
    proceso = null,
    modo = "crear"
) => {

    setProcesoSeleccionado(proceso);

    setModoFormulario(modo);

    setMostrarFormulario(true);

};

    const cerrarFormulario = () => {

    setProcesoSeleccionado(null);

    setModoFormulario("crear");

    setMostrarFormulario(false);

};

    const guardarProceso = (datosFormulario) => {

    try {

        if (modoFormulario === "editar") {

            actualizarProceso(
                procesoSeleccionado.id,
                datosFormulario
            );

        }

        else {

            crearProceso(datosFormulario);

        }

        setProcesos(
            obtenerProcesos()
        );

        setProcesoSeleccionado(null);

setModoFormulario("crear");

cerrarFormulario();

        cerrarFormulario();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

const editarProceso = (proceso) => {

    setProcesoSeleccionado(proceso);

    setModoFormulario("editar");

    setMostrarFormulario(true);

};

const verProceso = (proceso) => {

    setProcesoSeleccionado(proceso);

    setModoFormulario("ver");

    setMostrarFormulario(true);

};

const solicitarDesactivacion = (proceso) => {

    setProcesoSeleccionado(proceso);

    setMostrarConfirmacion(true);

};

const confirmarDesactivacion = () => {

    try {

        desactivarProceso(
            procesoSeleccionado.id
        );

        setProcesos(
            obtenerProcesos()
        );

    }

    catch (error) {

        alert(error.message);

    }

    finally {

        setMostrarConfirmacion(false);

        setProcesoSeleccionado(null);

    }

};

    const procesosFiltrados = procesos.filter((proceso) => {

        const texto = busqueda
            .toLowerCase()
            .trim();

        return (

            proceso.name
                .toLowerCase()
                .includes(texto)

            ||

            proceso.code
                .toLowerCase()
                .includes(texto)

        );

    });

    return (

        <section className="grupo-card">

            <div className="grupo-header">

                <div>

                    <h2>

                        Procesos Empresariales

                    </h2>

                    <p>

                        Administración de procesos empresariales utilizados por Organización y Field Engine.

                    </p>

                </div>

            </div>

            <div className="grupo-toolbar">

                <SearchInput
                    placeholder="Buscar proceso..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />

                <PrimaryButton
                    onClick={abrirFormulario}
                >

                    Nuevo Proceso

                </PrimaryButton>

            </div>

            <DataTable
    columns={[
        {
            key: "code",
            title: "Código",
        },
        {
            key: "name",
            title: "Nombre",
        },
        {
            key: "description",
            title: "Descripción",
        },
        {
    key: "active",
    title: "Estado",
    render: (row) => (

        <span
            className={
                row.active
                    ? "estado-activo"
                    : "estado-inactivo"
            }
        >
            {
                row.active
                    ? "Activo"
                    : "Inactivo"
            }
        </span>

    ),
},
        {
            key: "acciones",
            title: "Acciones",
            render: (row) => (
                <ActionButtons
    onView={() => verProceso(row)}
    onEdit={() => editarProceso(row)}
    onDelete={
        row.active
            ? () => solicitarDesactivacion(row)
            : undefined
    }
/>
            ),
        },
    ]}
    rows={procesosFiltrados}
/>

            <Modal
    isOpen={mostrarFormulario}
    titulo={
        modoFormulario === "crear"
            ? "Nuevo Proceso Empresarial"
            : modoFormulario === "editar"
                ? "Editar Proceso Empresarial"
                : "Detalle del Proceso Empresarial"
    }
    onClose={cerrarFormulario}
>

                <FormularioProceso
    proceso={procesoSeleccionado}
    modo={modoFormulario}
    onGuardar={guardarProceso}
    onCancelar={cerrarFormulario}
/>

            </Modal>

                     <ConfirmModal
                isOpen={mostrarConfirmacion}
                titulo="Desactivar proceso"
                mensaje="¿Desea desactivar este proceso empresarial?"
                onConfirm={confirmarDesactivacion}
                onCancel={() => {

                    setMostrarConfirmacion(false);

                    setProcesoSeleccionado(null);

                }}
                textoBoton="Desactivar"
            />

        </section>

    );

}