import {

    Database,

    ClipboardList,

    Activity,

    CheckCircle2,

} from "lucide-react";

import {

    getAvailableTemplates,

} from "../../../services/makeService";

export default function TemplateStep({

    routine,

    setRoutine,

    isEditing = false,

}) {

    const templates = getAvailableTemplates();

    const availableTemplates = isEditing
    ? templates.filter(
        template => template.id === routine.template?.id
    )
    : templates;

    return (

        <section className="make-step">

            <div className="step-section-header">

                <div className="step-section-icon">

                    <Database size={22} />

                </div>

                <div>

                    <h3>

                        Plantilla operativa

                    </h3>

                    <p>

                        Seleccione una plantilla publicada desde Field Engine.

                    </p>

                    {
    isEditing && (

        <small className="make-help">

            La plantilla no puede modificarse porque la rutina ya fue creada.

        </small>

    )
}

                </div>

            </div>

            <div className="template-grid">

                {

                    availableTemplates.map(template => (

                        <div

                            key={template.id}

                            className={`template-card ${

                                routine.template?.id === template.id

                                    ? "selected"

                                    : ""

                            }`}

                           onClick={() => {

    if (isEditing) {

        return;

    }

    setRoutine({

        ...routine,

        template,

    });

}}

                        >

                            <h4>

                                {template.name}

                            </h4>

                            <p>

                                {template.description}

                            </p>

                            <small>

                                {template.consumerModule}

                            </small>

                        </div>

                    ))

                }

            </div>

            {

                routine.template && (

                    <section className="template-context-card">

                        <div className="template-context-header">

                            <CheckCircle2 size={20} />

                            <h4>

                                Contexto heredado

                            </h4>

                        </div>

                        <div className="template-context-grid">

                            <div>

                                <ClipboardList size={18} />

                                <strong>

                                    Plantilla

                                </strong>

                                <span>

                                    {routine.template.name}

                                </span>

                            </div>

                            <div>

                                <Database size={18} />

                                <strong>

                                    Módulo consumidor

                                </strong>

                                <span>

                                    {

                                        routine.template.consumerModule ||

                                        "No definido"

                                    }

                                </span>

                            </div>

                            <div>

                                <Activity size={18} />

                                <strong>

                                    Estado

                                </strong>

                                <span>

                                    Publicada

                                </span>

                            </div>

                            <div>

                                <CheckCircle2 size={18} />

                                <strong>

                                    Disponible para MAKE

                                </strong>

                                <span>

                                    Sí

                                </span>

                            </div>

                        </div>

                    </section>

                )

            }

        </section>

    );

}