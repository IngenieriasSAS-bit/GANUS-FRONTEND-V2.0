export default function ContextStep({

    routine,

}) {

    if (!routine.template) {

        return (

            <p>

                Primero selecciona una plantilla.

            </p>

        );

    }

    return (

        <div>

            <h3>

                Contexto heredado

            </h3>

            <p>

                Módulo:

                {" "}

                {routine.template.consumerModule}

            </p>

            <p>

                Tipo:

                {" "}

                {routine.template.contextType}

            </p>

            <p>

                Contexto:

                {" "}

                {routine.template.contextValue}

            </p>

        </div>

    );

}