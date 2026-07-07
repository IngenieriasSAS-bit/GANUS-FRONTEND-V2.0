/**
 * ---------------------------------------------------------
 * Componente: ActionButtons
 * Descripción:
 * Botones reutilizables para acciones de un registro.
 * ---------------------------------------------------------
 */

import { Eye, SquarePen, CircleOff } from "lucide-react";

import "./ActionButtons.css";

export default function ActionButtons({

    onView,

    onEdit,

    onDelete

}) {

    return (

        <div className="action-buttons">

            <button
                className="btn-action view"
                onClick={onView}
                title="Ver información"
            >
                <Eye size={18}/>
            </button>

            <button
                className="btn-action edit"
                onClick={onEdit}
                title="Editar"
            >
                <SquarePen size={18}/>
            </button>

            <button
                className="btn-action delete"
                onClick={onDelete}
                title="Desactivar"
            >
                <CircleOff size={18}/>
            </button>

        </div>

    );

}