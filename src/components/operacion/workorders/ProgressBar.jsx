import { CheckCircle2 } from "lucide-react";

export default function ProgressBar({

    totalFields = 0,

    completedFields = 0,

}) {

    const percentage =

        totalFields === 0

            ? 0

            : Math.round(

                (completedFields / totalFields) * 100

            );

    return (

    <section className="wo-progress">

        <div className="wo-progress-header">

            <div>

                <span className="wo-label">

                    PROGRESO

                </span>

                <h3>

                    Avance de la ejecución

                </h3>

                <p>

                    {completedFields}

                    {" de "}

                    {totalFields}

                    {" campos diligenciados"}

                </p>

            </div>

            <div className="wo-progress-percent">

                <CheckCircle2 size={22}/>

                <strong>

                    {percentage}%

                </strong>

            </div>

        </div>

        <div className="wo-progress-bar">

            <div

                className="wo-progress-fill"

                style={{

                    width:`${percentage}%`

                }}

            />

        </div>

    </section>

);

}