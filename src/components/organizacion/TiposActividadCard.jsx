import { useState } from "react";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";
import Modal from "../common/Modal";
import DataTable from "../common/DataTable";
import ActionButtons from "../common/ActionButtons";
import ConfirmModal from "../common/ConfirmModal";

import FormularioTipoActividad from "./FormularioTipoActividad";

import {

    obtenerTiposActividad,

    crearTipoActividad,

    actualizarTipoActividad,

    desactivarTipoActividad,

    obtenerProcesos,

} from "../../services/organizationService";


export default function TiposActividadCard() {

    const [tiposActividad, setTiposActividad] = useState(() =>
    obtenerTiposActividad()
);

const [busqueda, setBusqueda] = useState("");

const [mostrarFormulario, setMostrarFormulario] = useState(false);

const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

const [modoFormulario, setModoFormulario] = useState("crear");

const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

const procesos = obtenerProcesos();

const tiposFiltrados = tiposActividad.filter((tipo) => {

    const texto = busqueda
        .toLowerCase()
        .trim();

    return (

        tipo.name
            .toLowerCase()
            .includes(texto)

        ||

        tipo.code
            .toLowerCase()
            .includes(texto)

    );

});

const guardarTipoActividad = (datosFormulario) => {

    try {

        if (modoFormulario === "editar") {

            actualizarTipoActividad(

                tipoSeleccionado.id,

                datosFormulario

            );

        }

        else {

            crearTipoActividad(

                datosFormulario

            );

        }

        setTiposActividad(

            obtenerTiposActividad()

        );

        cerrarFormulario();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

};

const filasTabla = tiposFiltrados.map((tipo) => {

    const proceso = procesos.find(

        (item) => item.id === tipo.processId

    );



    return {

        ...tipo,

        processName:

            proceso?.name ??

            "Sin proceso",

    };

});

const abrirFormulario = (

    tipo = null,

    modo = "crear"

) => {

    setTipoSeleccionado(tipo);

    setModoFormulario(modo);

    setMostrarFormulario(true);

};

const cerrarFormulario = () => {

    setTipoSeleccionado(null);

    setModoFormulario("crear");

    setMostrarFormulario(false);

};

const verTipoActividad = (tipo) => {

    abrirFormulario(

        tipo,

        "ver"

    );

};

const editarTipoActividad = (tipo) => {

    abrirFormulario(

        tipo,

        "editar"

    );

};

const solicitarDesactivacion = (tipo) => {

    setTipoSeleccionado(tipo);

    setMostrarConfirmacion(true);

};

const confirmarDesactivacion = () => {

    try {

        desactivarTipoActividad(

            tipoSeleccionado.id

        );

        setTiposActividad(

            obtenerTiposActividad()

        );

    }

    catch (error) {

        alert(error.message);

    }

    finally {

        setMostrarConfirmacion(false);

        setTipoSeleccionado(null);

    }

};

    return (

        <section className="organizacion-card">

            <div className="organizacion-card-header">

                <div>

                    <h2>

                        Tipos de Actividad

                    </h2>

                    <p>

                        Catálogo de actividades
                        asociado a cada proceso.

                    </p>

                </div>

            </div>

            <div className="grupo-toolbar">

    <SearchInput
        placeholder="Buscar tipo de actividad..."
        value={busqueda}
        onChange={(e) =>
            setBusqueda(e.target.value)
        }
    />

    <PrimaryButton
    onClick={() =>
        abrirFormulario()
    }
>

        Nuevo Tipo

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
            key: "processName",
            title: "Proceso",
        },
        {
    key: "active",
    title: "Estado",
},
        {
    key: "acciones",
    title: "Acciones",
    render: (row) => (

        <ActionButtons

            onView={() =>
                verTipoActividad(row)
            }

            onEdit={() =>
                editarTipoActividad(row)
            }

            onDelete={

    row.active

        ? () => solicitarDesactivacion(row)

        : undefined

}

        />

    ),
},
    ]}
    rows={filasTabla}
/>

<Modal
    isOpen={mostrarFormulario}
    titulo={
        modoFormulario === "crear"

            ? "Nuevo Tipo de Actividad"

            : modoFormulario === "editar"

                ? "Editar Tipo de Actividad"

                : "Detalle del Tipo de Actividad"
    }
    onClose={cerrarFormulario}
>

    <FormularioTipoActividad

    key={
        tipoSeleccionado
            ? `${modoFormulario}-${tipoSeleccionado.id}`
            : modoFormulario
    }

    tipoActividad={tipoSeleccionado}

    modo={modoFormulario}

    onGuardar={guardarTipoActividad}

    onCancelar={cerrarFormulario}

/>

</Modal>

<ConfirmModal

    isOpen={mostrarConfirmacion}

    titulo="Desactivar tipo de actividad"

    mensaje="¿Desea desactivar este tipo de actividad?"

    onConfirm={confirmarDesactivacion}

    onCancel={() => {

        setMostrarConfirmacion(false);

        setTipoSeleccionado(null);

    }}

    textoBoton="Desactivar"

/>

        </section>

    );

}