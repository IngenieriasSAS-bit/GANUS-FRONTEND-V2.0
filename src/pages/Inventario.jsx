import { useMemo, useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import FormularioActivo from "../components/inventario/FormularioActivo";
import ConfirmModal from "../components/common/ConfirmModal";
import RelacionesActivo from "../components/inventario/RelacionesActivo";
import ActividadesActivo from "../components/inventario/ActividadesActivo";
import FormulariosDinamicosActivo from "../components/inventario/FormulariosDinamicosActivo";


import {
  Boxes,
  Search,
  Plus,
  Eye,
  Pencil,
  Ban,
  Filter,
  Database,
} from "lucide-react";

import {
  obtenerActivos,
  desactivarActivo,
} from "../services/activosService";

import "../styles/inventario.css";


export default function Inventario() {

  const [activos, setActivos] = useState(() => obtenerActivos());

  const [busqueda, setBusqueda] = useState("");

  const [dominio, setDominio] = useState("Todos");

  const [estado, setEstado] = useState("Todos");

  const [activoSeleccionado, setActivoSeleccionado] =
    useState(null);

  const [modo, setModo] = useState("");

  const [mostrarFormulario, setMostrarFormulario] =
  useState(false);

  const [activoADesactivar, setActivoADesactivar] =
  useState(null);


const cargarActivos = () => {

  const datos = obtenerActivos();

  setActivos(datos);

};


  const dominios = useMemo(() => {

    const valores = activos
      .map((activo) => activo.dominio)
      .filter(Boolean);

    return [
      "Todos",
      ...new Set(valores),
    ];

  }, [activos]);


  const activosFiltrados = useMemo(() => {

    const termino = busqueda
      .toLowerCase()
      .trim();

    return activos.filter((activo) => {

      const coincideBusqueda =

        !termino

        ||

        activo.nombre
          ?.toLowerCase()
          .includes(termino)

        ||

        activo.codigo
          ?.toLowerCase()
          .includes(termino)

        ||

        activo.identificador
          ?.toLowerCase()
          .includes(termino)

        ||

        activo.categoria
          ?.toLowerCase()
          .includes(termino);


      const coincideDominio =

        dominio === "Todos"

        ||

        activo.dominio === dominio;


      const coincideEstado =

        estado === "Todos"

        ||

        activo.estado === estado;


      return (

        coincideBusqueda

        &&

        coincideDominio

        &&

        coincideEstado

      );

    });

  }, [
    activos,
    busqueda,
    dominio,
    estado,
  ]);


  const abrirDetalle = (activo) => {

    setActivoSeleccionado(activo);

    setModo("ver");

  };


const abrirEdicion = (activo) => {

  setActivoSeleccionado(activo);

  setModo("editar");

  setMostrarFormulario(true);

};


  const cerrarDetalle = () => {

    setActivoSeleccionado(null);

    setModo("");

  };

const cerrarFormulario = () => {

  setMostrarFormulario(false);

  setActivoSeleccionado(null);

  setModo("");

};  


  const solicitarDesactivacion = (activo) => {

  setActivoADesactivar(activo);

};


const confirmarDesactivacion = () => {

  if (!activoADesactivar) {

    return;

  }

  desactivarActivo(activoADesactivar.id);

  cargarActivos();

  setActivoADesactivar(null);

};


const cancelarDesactivacion = () => {

  setActivoADesactivar(null);

};


  return (

    <>

      <Sidebar />

      <Navbar />


      <main className="inventario">


        <header className="inventarioHeader">

          <div>

            <h1>Inventario</h1>

            <p>

              Inventario y fuente única
              de los activos de GANUS.

            </p>

          </div>


          <button
  className="btnNuevoActivo"
  type="button"
  onClick={() => {

    setActivoSeleccionado(null);

    setModo("crear");

    setMostrarFormulario(true);

  }}
>

            <Plus size={18} />

            Nuevo Activo

          </button>

        </header>


        <section className="inventarioResumen">


          <article className="inventarioResumenCard">

            <div className="inventarioResumenIcon">

              <Database size={22} />

            </div>

            <div>

              <span>Activos registrados</span>

              <strong>

                {activos.length}

              </strong>

            </div>

          </article>


          <article className="inventarioResumenCard">

            <div className="inventarioResumenIcon">

              <Boxes size={22} />

            </div>

            <div>

              <span>Activos operativos</span>

              <strong>

                {
                  activos.filter(
                    (activo) =>
                      activo.estado === "Activo"
                  ).length
                }

              </strong>

            </div>

          </article>


          <article className="inventarioResumenCard">

            <div className="inventarioResumenIcon">

              <Filter size={22} />

            </div>

            <div>

              <span>Dominios registrados</span>

              <strong>

                {
                  dominios.filter(
                    (item) =>
                      item !== "Todos"
                  ).length
                }

              </strong>

            </div>

          </article>


        </section>


        <section className="inventarioPanel">


          <div className="inventarioPanelHeader">

            <div>

              <h2>

                Inventario de Activos

              </h2>

              <p>

                Consulte, clasifique y administre
                los activos operativos registrados.

              </p>

            </div>

          </div>


          <div className="inventarioFiltros">


            <div className="inventarioBuscador">

              <Search size={18} />

              <input
                type="text"
                placeholder="Buscar por nombre, código, identificador o categoría"
                value={busqueda}
                onChange={(event) =>
                  setBusqueda(event.target.value)
                }
              />

            </div>


            <select
              value={dominio}
              onChange={(event) =>
                setDominio(event.target.value)
              }
            >

              {
                dominios.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                ))
              }

            </select>


            <select
              value={estado}
              onChange={(event) =>
                setEstado(event.target.value)
              }
            >

              <option value="Todos">

                Todos los estados

              </option>

              <option value="Activo">

                Activo

              </option>

              <option value="Inactivo">

                Inactivo

              </option>

            </select>


          </div>


          <div className="inventarioTablaContainer">


            <table className="inventarioTabla">


              <thead>

                <tr>

                  <th>Código</th>

                  <th>Activo</th>

                  <th>Dominio</th>

                  <th>Clasificación</th>

                  <th>Identificador</th>

                  <th>Finca</th>

                  <th>Ubicación</th>

                  <th>Estado</th>

                  <th>Acciones</th>

                </tr>

              </thead>


              <tbody>


                {
                  activosFiltrados.length > 0

                  ?

                  activosFiltrados.map(
                    (activo) => (

                      <tr key={activo.id}>


                        <td>

                          {activo.codigo}

                        </td>


                        <td>

                          <div className="activoNombre">

                            <strong>

                              {activo.nombre}

                            </strong>

                            <span>

                              {activo.tipo}

                            </span>

                          </div>

                        </td>


                        <td>

                          {activo.dominio}

                        </td>


                        <td>

                          <div className="activoClasificacion">

                            <span>

                              {activo.categoria}

                            </span>

                            <small>

                              {activo.subtipo}

                            </small>

                          </div>

                        </td>


                        <td>

                          <div className="activoIdentificador">

                            <strong>

                              {activo.identificador}

                            </strong>

                            <span>

                              {activo.tipoIdentificador}

                            </span>

                          </div>

                        </td>


                        <td>

                          {activo.finca}

                        </td>


                        <td>

                          {activo.ubicacion}

                        </td>


                        <td>

                          <span
                            className={
                              activo.estado === "Activo"

                              ?

                              "estadoActivo"

                              :

                              "estadoInactivo"
                            }
                          >

                            {activo.estado}

                          </span>

                        </td>


                        <td>


                          <div className="inventarioAcciones">


                            <button
                              type="button"
                              className="accionVer"
                              title="Consultar activo"
                              onClick={() =>
                                abrirDetalle(activo)
                              }
                            >

                              <Eye size={17} />

                            </button>


                            <button
                              type="button"
                              className="accionEditar"
                              title="Editar activo"
                              onClick={() =>
                                abrirEdicion(activo)
                              }
                            >

                              <Pencil size={17} />

                            </button>


                            <button
                              type="button"
                              className="accionDesactivar"
                              title="Desactivar activo"
                              disabled={
                                activo.estado === "Inactivo"
                              }
                              onClick={() =>
  solicitarDesactivacion(activo)
}
                            >

                              <Ban size={17} />

                            </button>


                          </div>


                        </td>


                      </tr>

                    )
                  )

                  :

                  (

                    <tr>

                      <td
                        colSpan="9"
                        className="inventarioVacio"
                      >

                        No se encontraron activos
                        con los filtros seleccionados.

                      </td>

                    </tr>

                  )
                }


              </tbody>


            </table>


          </div>


        </section>


        {
  activoSeleccionado && modo === "ver" && (

            <div className="detalleActivoOverlay">


              <section className="detalleActivo">


                <div className="detalleActivoHeader">


                  <div>

                    <span>

                      {
                        modo === "editar"

                        ?

                        "Actualización maestra"

                        :

                        "Ficha maestra de activo"
                      }

                    </span>

                    <h2>

                      {activoSeleccionado.nombre}

                    </h2>

                  </div>


                  <button
                    type="button"
                    onClick={cerrarDetalle}
                  >

                    ×

                  </button>


                </div>


                <div className="detalleActivoContenido">


                  <div>

                    <span>Código</span>

                    <strong>

                      {activoSeleccionado.codigo}

                    </strong>

                  </div>


                  <div>

                    <span>Dominio</span>

                    <strong>

                      {activoSeleccionado.dominio}

                    </strong>

                  </div>


                  <div>

                    <span>Categoría</span>

                    <strong>

                      {activoSeleccionado.categoria}

                    </strong>

                  </div>


                  <div>

                    <span>Tipo</span>

                    <strong>

                      {activoSeleccionado.tipo}

                    </strong>

                  </div>


                  <div>

                    <span>Subtipo</span>

                    <strong>

                      {activoSeleccionado.subtipo}

                    </strong>

                  </div>


                  <div>

                    <span>Identificador</span>

                    <strong>

                      {activoSeleccionado.identificador}

                    </strong>

                  </div>


                  <div>

                    <span>Tipo de identificador</span>

                    <strong>

                      {
                        activoSeleccionado
                          .tipoIdentificador
                      }

                    </strong>

                  </div>


                  <div>

                    <span>Finca</span>

                    <strong>

                      {activoSeleccionado.finca}

                    </strong>

                  </div>


                  <div>

                    <span>Ubicación</span>

                    <strong>

                      {activoSeleccionado.ubicacion}

                    </strong>

                  </div>


                  <div>

                    <span>Estado administrativo</span>

                    <strong>

                      {activoSeleccionado.estado}

                    </strong>

                  </div>
               

                </div>

                <RelacionesActivo
  activo={activoSeleccionado}
  activos={activos}
/>

<ActividadesActivo
  activo={activoSeleccionado}
/>

<FormulariosDinamicosActivo
  activo={activoSeleccionado}
/>

              </section>


            </div>

          )
        }

        {
          mostrarFormulario && (

            <FormularioActivo

              key={
                activoSeleccionado?.id
                || "nuevo-activo"
              }

              activo={
                modo === "editar"
                  ? activoSeleccionado
                  : null
              }

              cerrar={cerrarFormulario}

              actualizar={cargarActivos}

            />

          )
        }

        <ConfirmModal

          isOpen={Boolean(activoADesactivar)}

          titulo="Desactivar activo"

          mensaje={
            activoADesactivar
              ? `¿Desea desactivar el activo "${activoADesactivar.nombre}"?`
              : ""
          }

          onConfirm={confirmarDesactivacion}

          onCancel={cancelarDesactivacion}

          textoBoton="Desactivar"

        />

      </main>

    </>

  );

}
