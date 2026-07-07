/**
 * ==========================================================
 * Componente: Modal
 * Carpeta: components/common
 *
 * Responsabilidad:
 * Mostrar contenido sobre la pantalla sin cambiar
 * la estructura de la página.
 *
 * Será reutilizado en todos los módulos de GANUS.
 * ==========================================================
 */

import "./Modal.css";

export default function Modal({

    isOpen,

    titulo,

    children,

    onClose

}) {

    // ===========================================
    // Si está cerrado no renderiza nada
    // ===========================================

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-container">

                {/* ===========================
                    Cabecera
                =========================== */}

                <div className="modal-header">

                    <h2>{titulo}</h2>

                    <button

                        className="modal-close"

                        onClick={onClose}

                    >

                        ×

                    </button>

                </div>

                {/* ===========================
                    Contenido
                =========================== */}

                <div className="modal-body">

                    {children}

                </div>

            </div>

        </div>

    );

}