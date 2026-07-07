import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import PageHeader from "../components/common/PageHeader";
import ResumenOrganizacion from "../components/organizacion/ResumenOrganizacion";
import GrupoEmpresarialCard from "../components/organizacion/GrupoEmpresarialCard";
import FincasCard from "../components/organizacion/FincasCard";
import UsuariosCard from "../components/organizacion/UsuariosCard";
import RolesCard from "../components/organizacion/RolesCard";
import PermisosCard from "../components/organizacion/PermisosCard";

import "../styles/organizacion.css";

export default function Organizacion() {

    return (

        <>

            <Sidebar />

            <Navbar />

            <main className="organizacion">

                <PageHeader

                    title="Organización"

                    description="Administre la estructura organizacional de GANUS. Desde este módulo podrá gestionar grupos empresariales, fincas, usuarios, roles y permisos del sistema."

                />

                <ResumenOrganizacion />

<section className="seccion-organizacion">

    <GrupoEmpresarialCard />

</section>

<section className="seccion-organizacion">

    <FincasCard />

</section>

<section className="seccion-organizacion">

    <UsuariosCard /> 

</section>

<section className="seccion-organizacion">

    <RolesCard /> 

</section>

<section className="seccion-organizacion">

    <PermisosCard /> 

</section>


            </main>

        </>

    );

}