import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";

import "./ConfirmModal.css";

export default function ConfirmModal({

    isOpen,
    titulo,
    mensaje,
    onConfirm,
    onCancel,
    textoBoton = "Aceptar"

}) {

    return (

        <Modal
            isOpen={isOpen}
            titulo={titulo}
            onClose={onCancel}
        >

            <div className="confirm-modal">

                <p>

                    {mensaje}

                </p>

                <div className="confirm-modal-buttons">

                    <button
                        className="btn-cancelar"
                        onClick={onCancel}
                    >

                        Cancelar

                    </button>

                    <PrimaryButton
                        onClick={onConfirm}
                    >

                        {textoBoton}

                    </PrimaryButton>

                </div>

            </div>

        </Modal>

    );

}