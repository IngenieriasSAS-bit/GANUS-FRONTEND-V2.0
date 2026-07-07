import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/organizacion.css";

export default function Organizacion() {
  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="organizacion">

        <header className="page-header">

          <div>

            <h1>Organización</h1>

            <p>
              Administre la estructura organizacional de GANUS,
              incluyendo grupos empresariales, fincas, usuarios,
              roles y permisos.
            </p>

          </div>

        </header>

      </main>

    </>
  );
}