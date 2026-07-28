import useMake from "../../../hooks/useMake";

export default function MakeHero() {

    const dashboard =
        useMake();

    return (

        <div className="make-hero">

            <div>

                <h2>

                    MAKE

                </h2>

                <p>

                    Planeación operativa y generación de rutinas.

                </p>

            </div>

            <div>

                <h1>

                    {

                        dashboard.totalRoutines

                    }

                </h1>

                <small>

                    Rutinas

                </small>

            </div>

        </div>

    );

}