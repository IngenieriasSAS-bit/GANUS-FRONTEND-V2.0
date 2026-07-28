import FormField from "./FormField";

export default function DynamicForm({

    template,

    values = {},

    onChange,

}) {

    if (!template?.sections?.length) {

        return (

            <div className="wo-empty-form">

                <p>

                    Esta orden no tiene una plantilla publicada.

                </p>

            </div>

        );

    }

    return (

    <div className="wo-dynamic-form">

        {

            template.sections.map((section,index)=>(

                <section

                    key={section.id}

                    className="wo-form-section"

                >

                    <div className="wo-form-section-header">

                        <div className="wo-form-section-number">

                            {String(index+1).padStart(2,"0")}

                        </div>

                        <div>

                            <span className="wo-label">

                                SECCIÓN

                            </span>

                            <h3>

                                {section.name}

                            </h3>

                            {

                                section.description && (

                                    <p>

                                        {section.description}

                                    </p>

                                )

                            }

                        </div>

                    </div>

                    <div className="wo-form-section-body">

                        {

                            section.fields.map(field=>(

                                <FormField

                                    key={field.id}

                                    field={field}

                                    value={values[field.id]}

                                    onChange={onChange}

                                />

                            ))

                        }

                    </div>

                </section>

            ))

        }

    </div>

);

}