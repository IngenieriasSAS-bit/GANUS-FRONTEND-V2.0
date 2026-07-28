import {

    ClipboardList,

    Plus,

} from "lucide-react";

export default function WorkOrdersHero({

    totalOrders = 0,

    onCreate,

}) {

    return (

        <section className="workorders-hero">

            <div>

                <span className="hero-badge">

                    MAKE

                </span>

                <h1>

                    Centro de Órdenes de Trabajo

                </h1>

                <p>

                    Administre, supervise y controle todas las órdenes
                    operativas generadas por las rutinas de MAKE.

                </p>

            </div>

            <div className="hero-actions">

                <div className="hero-counter">

                    <ClipboardList size={20} />

                    <div>

                        <strong>

                            {totalOrders}

                        </strong>

                        <span>

                            Órdenes registradas

                        </span>

                    </div>

                </div>

                <button

                    className="primary-button"

                    onClick={onCreate}

                >

                    <Plus size={18} />

                    Nueva Orden

                </button>

            </div>

        </section>

    );

}