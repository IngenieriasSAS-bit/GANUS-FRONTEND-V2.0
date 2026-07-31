import { useMemo, useState } from "react";

import "./FormularioProceso.css";
import { obtenerProcesos } from "../../services/organizationService";

export default function FormularioTipoActividad({

    tipoActividad = null,

    modo = "crear",

    onGuardar,

    onCancelar,

}) {

    const [formulario, setFormulario] = useState(() => ({

    codigo: tipoActividad?.code ?? "",

    nombre: tipoActividad?.name ?? "",

    procesoId: tipoActividad?.processId ?? "",

    descripcion: tipoActividad?.description ?? "",

    estado:

        tipoActividad

            ? (

                tipoActividad.active

                    ? "Activo"

                    : "Inactivo"

            )

            : "Activo",

}));

    const procesos = useMemo(
    () => obtenerProcesos(),
    []
);

    const actualizar = ({ target }) => {

        setFormulario((prev) => ({

            ...prev,

            [target.name]: target.value,

        }));

    };

    const enviar = (e) => {

    e.preventDefault();

    onGuardar({

        codigo: formulario.codigo,

        nombre: formulario.nombre,

        procesoId: formulario.procesoId,

        descripcion: formulario.descripcion,

        estado: formulario.estado,

    });

};

    return (

        <form
            className="formulario-proceso"
            onSubmit={enviar}
        >

            <div className="formulario-grid">

                <div className="campo">

                    <label>Código</label>

                    <input
    name="codigo"
    value={formulario.codigo}
    onChange={actualizar}
    disabled={modo === "ver"}
    required
/>

                </div>

                <div className="campo">

                    <label>Nombre</label>

                    <input
                        name="nombre"
                        value={formulario.nombre}
                        onChange={actualizar}
                        disabled={modo === "ver"}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Proceso Empresarial</label>

                    <select
    name="procesoId"
    value={formulario.procesoId}
    disabled={modo === "ver"}
    onChange={actualizar}
>

    <option value="">

        Seleccione un proceso...

    </option>

    {

        procesos.map((proceso) => (

            <option
                key={proceso.id}
                value={proceso.id}
            >

                {proceso.code} - {proceso.name}

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
                        disabled={modo === "ver"}
                        onChange={actualizar}
                    >

                        <option value="Activo">

                            Activo

                        </option>

                        <option value="Inactivo">

                            Inactivo

                        </option>

                    </select>

                </div>

                <div className="campo campo-completo">

                    <label>Descripción</label>

                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        disabled={modo === "ver"}
                        onChange={actualizar}
                    />

                </div>

            </div>

            <div className="acciones-formulario">

                <button
    type="button"
    className="btn-cancelar"
    onClick={onCancelar}
>

    {

        modo === "ver"

            ? "Cerrar"

            : "Cancelar"

    }

</button>

                {

    modo !== "ver" && (

        <button
            type="submit"
            className="btn-guardar"
        >

            {

                modo === "editar"

                    ? "Actualizar"

                    : "Guardar"

            }

        </button>

    )

}

            </div>

        </form>

    );

}