import { useState } from "react";
import "./FormularioProceso.css";

export default function FormularioProceso({

    proceso = null,

    modo = "crear",

    onGuardar,

    onCancelar,

}) {

    

   const [formulario, setFormulario] = useState(() => ({

    codigo: proceso?.code ?? "",

    nombre: proceso?.name ?? "",

    descripcion: proceso?.description ?? "",

    estado: proceso
        ? (proceso.active ? "Activo" : "Inactivo")
        : "Activo",

}));



    const actualizar = (e) => {

        const { name, value } = e.target;

        setFormulario((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const enviar = (e) => {

    e.preventDefault();

    onGuardar({

        codigo: formulario.codigo,

        nombre: formulario.nombre,

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

    <div className="campo campo-completo">

        <label>Descripción</label>

        <textarea
    name="descripcion"
    value={formulario.descripcion}
    onChange={actualizar}
    disabled={modo === "ver"}
/>

    </div>

    <div className="campo">

        <label>Estado</label>

       {
    modo === "ver"

        ?

        <input
            value={formulario.estado}
            disabled
        />

        :

        <select
            name="estado"
            value={formulario.estado}
            onChange={actualizar}
        >

            <option value="Activo">Activo</option>

            <option value="Inactivo">Inactivo</option>

        </select>
}

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