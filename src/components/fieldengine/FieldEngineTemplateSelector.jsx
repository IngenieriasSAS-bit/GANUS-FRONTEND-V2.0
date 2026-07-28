import { useMemo, useState } from "react";

import {
    ClipboardList,
    CheckCircle2,
} from "lucide-react";

import Modal from "../common/Modal";

import {
    getPublishedFieldEngineTemplates,
} from "../../services/fieldEngineService";

import "../../styles/fieldengine/fieldEngineTemplateSelector.css";

export default function FieldEngineTemplateSelector({

    isOpen,

    onClose,

    onSelect,

}) {

    const templates = useMemo(

        () => getPublishedFieldEngineTemplates(),

        []

    );

    const [selectedId, setSelectedId] = useState("");

    function handleContinue() {

        if (!selectedId) return;

        onSelect(selectedId);

    }

    return (

        <Modal

            isOpen={isOpen}

            titulo="Seleccionar plantilla"

            onClose={onClose}

        >

            <div className="fe-template-selector">

                {

                    templates.length === 0 && (

                        <p>

                            No existen plantillas publicadas.

                        </p>

                    )

                }

                <div className="fe-template-selector__list">

                    {

                        templates.map((template) => {

                            const selected =

                                selectedId === template.id;

                            return (

                                <div

                                    key={template.id}

                                    className={`

                                        fe-template-option

                                        ${

                                            selected

                                                ? "fe-template-option--selected"

                                                : ""

                                        }

                                    `}

                                    onClick={() =>

                                        setSelectedId(

                                            template.id

                                        )

                                    }

                                >

                                    <div className="fe-template-option__icon">

                                        <ClipboardList size={26} />

                                    </div>

                                    <div className="fe-template-option__content">

                                        <strong>

                                            {template.name}

                                        </strong>

                                        <p>

                                            Versión {template.version}

                                        </p>

                                        <span className="fe-template-option__badge">

                                            Publicada

                                        </span>

                                    </div>

                                    <div className="fe-template-option__check">

                                        {

                                            selected && (

                                                <CheckCircle2

                                                    size={20}

                                                    color="white"

                                                />

                                            )

                                        }

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

                <div className="fe-template-selector__actions">

                    <button

                        type="button"

                        className="fe-button"

                        onClick={onClose}

                    >

                        Cancelar

                    </button>

                    <button

                        type="button"

                        className="fe-button fe-button--primary"

                        disabled={!selectedId}

                        onClick={handleContinue}

                    >

                        Continuar

                    </button>

                </div>

            </div>

        </Modal>

    );

}