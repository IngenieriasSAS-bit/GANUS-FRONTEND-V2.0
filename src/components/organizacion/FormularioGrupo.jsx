import { useState } from "react";
import "./FormularioGrupo.css";

export default function FormularioProceso({
    proceso = null,
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

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const manejarSubmit = (e) => {

        e.preventDefault();

        onGuardar(formulario);

    };

    return (

        <div className="formulario-grupo">

            <form onSubmit={manejarSubmit}>

                <div className="campo">

                    <label>Código</label>

                    <input
                        type="text"
                        name="codigo"
                        value={formulario.codigo}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Nombre</label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                    />

                </div>

                <div className="campo">

                    <label>Descripción</label>

                    <textarea
                        rows="4"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                    />

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

}