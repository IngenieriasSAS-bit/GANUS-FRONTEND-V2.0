import { useState } from "react";

import {
  X,
  Save,
  Boxes,
} from "lucide-react";

import {
  crearActivo,
  actualizarActivo,
} from "../../services/activosService";


const dominiosGANUS = [
  "Biológico",
  "Territorial",
  "Infraestructura",
  "Equipamiento",
  "Transporte",
  "Inventarios",
  "Humano",
  "Digital",
];


const clasificacionesPorDominio = {

  Biológico: [
    "Animal",
    "Lote Biológico",
    "Hato",
  ],

  Territorial: [
    "Finca",
    "Potrero",
    "División",
    "Sector",
  ],

  Infraestructura: [
    "Corral",
    "Manga",
    "Brete",
    "Sala de Ordeño",
  ],

  Equipamiento: [
    "Báscula",
    "Ordeñadora",
    "Tanque",
    "Motobomba",
  ],

  Transporte: [
    "Camión",
    "Camioneta",
    "Moto",
    "Remolque",
  ],

  Inventarios: [
    "Medicamento",
    "Concentrado",
    "Vacuna",
    "Sal Mineralizada",
  ],

  Humano: [
    "Operario",
    "Veterinario",
    "Mayordomo",
    "Contratista",
  ],

  Digital: [
    "RFID",
    "LoRa",
    "Sensor",
    "Gateway",
  ],

};


const tiposIdentificador = [
  "Código interno",
  "RFID",
  "LoRa",
  "Serial",
  "Documento",
];


const formularioInicial = {

  codigo: "",

  nombre: "",

  dominio: "Biológico",

  categoria: "Animal",

  tipo: "",

  subtipo: "",

  identificador: "",

  tipoIdentificador: "Código interno",

  finca: "",

  ubicacion: "",

  estado: "Activo",

};


export default function FormularioActivo({

  activo,

  cerrar,

  actualizar,

}) {

  const esEdicion = Boolean(activo);


  const [formulario, setFormulario] = useState(() => {

  if (activo) {

    return {

      ...formularioInicial,

      ...activo,

    };

  }

  return {

    ...formularioInicial,

  };

});


const [error, setError] = useState("");


  const manejarCambio = (event) => {

    const {
      name,
      value,
    } = event.target;


    if (name === "dominio") {

      const clasificaciones =

        clasificacionesPorDominio[value]

        || [];


      setFormulario((estadoActual) => ({

        ...estadoActual,

        dominio: value,

        categoria:

          clasificaciones[0]

          || "",

      }));


      return;

    }


    setFormulario((estadoActual) => ({

      ...estadoActual,

      [name]: value,

    }));

  };


  const guardar = (event) => {

    event.preventDefault();


    if (

      !formulario.codigo.trim()

      ||

      !formulario.nombre.trim()

      ||

      !formulario.dominio

      ||

      !formulario.categoria

      ||

      !formulario.identificador.trim()

      ||

      !formulario.finca.trim()

    ) {

      setError(

        "Complete los campos obligatorios del activo."

      );

      return;

    }


    if (esEdicion) {

      actualizarActivo(

        activo.id,

        formulario

      );

    }

    else {

      crearActivo(formulario);

    }


    actualizar();

    cerrar();

  };


  const clasificacionesActuales =

    clasificacionesPorDominio[

      formulario.dominio

    ]

    || [];


  return (

    <div className="formularioActivoOverlay">


      <section className="formularioActivo">


        <header className="formularioActivoHeader">


          <div className="formularioActivoTitulo">


            <div className="formularioActivoIcono">

              <Boxes size={22} />

            </div>


            <div>

              <span>

                {
                  esEdicion

                  ?

                  "Actualización maestra"

                  :

                  "Inventario maestro"
                }

              </span>


              <h2>

                {
                  esEdicion

                  ?

                  "Editar Activo"

                  :

                  "Nuevo Activo"
                }

              </h2>

            </div>


          </div>


          <button
            type="button"
            className="cerrarFormularioActivo"
            onClick={cerrar}
            title="Cerrar"
          >

            <X size={22} />

          </button>


        </header>


        <form
          className="formularioActivoContenido"
          onSubmit={guardar}
        >


          <div className="formularioActivoSeccion">


            <div className="formularioActivoSeccionTitulo">

              <span>01</span>

              <div>

                <h3>

                  Identidad del activo

                </h3>

                <p>

                  Información principal para identificar
                  el activo dentro de GANUS.

                </p>

              </div>

            </div>


            <div className="formularioActivoGrid">


              <label>

                Código *

                <input
                  type="text"
                  name="codigo"
                  value={formulario.codigo}
                  onChange={manejarCambio}
                  placeholder="Ej. GAN-0005"
                />

              </label>


              <label>

                Nombre del activo *

                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  placeholder="Ej. Vaca 804"
                />

              </label>


            </div>


          </div>


          <div className="formularioActivoSeccion">


            <div className="formularioActivoSeccionTitulo">

              <span>02</span>

              <div>

                <h3>

                  Clasificación

                </h3>

                <p>

                  Taxonomía universal del activo
                  dentro de GANUS.

                </p>

              </div>

            </div>


            <div className="formularioActivoGrid">


              <label>

                Dominio *

                <select
                  name="dominio"
                  value={formulario.dominio}
                  onChange={manejarCambio}
                >

                  {
                    dominiosGANUS.map(
                      (dominio) => (

                        <option
                          key={dominio}
                          value={dominio}
                        >

                          {dominio}

                        </option>

                      )
                    )
                  }

                </select>

              </label>


              <label>

                Categoría *

                <select
                  name="categoria"
                  value={formulario.categoria}
                  onChange={manejarCambio}
                >

                  {
                    clasificacionesActuales.map(
                      (categoria) => (

                        <option
                          key={categoria}
                          value={categoria}
                        >

                          {categoria}

                        </option>

                      )
                    )
                  }

                </select>

              </label>


              <label>

                Tipo

                <input
                  type="text"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={manejarCambio}
                  placeholder="Ej. Bovino"
                />

              </label>


              <label>

                Subtipo

                <input
                  type="text"
                  name="subtipo"
                  value={formulario.subtipo}
                  onChange={manejarCambio}
                  placeholder="Ej. Vaca"
                />

              </label>


            </div>


          </div>


          <div className="formularioActivoSeccion">


            <div className="formularioActivoSeccionTitulo">

              <span>03</span>

              <div>

                <h3>

                  Identificación múltiple

                </h3>

                <p>

                  Identificador físico, digital
                  o administrativo asociado.

                </p>

              </div>

            </div>


            <div className="formularioActivoGrid">


              <label>

                Tipo de identificador *

                <select
                  name="tipoIdentificador"
                  value={
                    formulario.tipoIdentificador
                  }
                  onChange={manejarCambio}
                >

                  {
                    tiposIdentificador.map(
                      (tipo) => (

                        <option
                          key={tipo}
                          value={tipo}
                        >

                          {tipo}

                        </option>

                      )
                    )
                  }

                </select>

              </label>


              <label>

                Identificador *

                <input
                  type="text"
                  name="identificador"
                  value={formulario.identificador}
                  onChange={manejarCambio}
                  placeholder="RFID, serial o código"
                />

              </label>


            </div>


          </div>


          <div className="formularioActivoSeccion">


            <div className="formularioActivoSeccionTitulo">

              <span>04</span>

              <div>

                <h3>

                  Ubicación organizacional

                </h3>

                <p>

                  Pertenencia y ubicación operativa
                  actual del activo.

                </p>

              </div>

            </div>


            <div className="formularioActivoGrid">


              <label>

                Finca *

                <input
                  type="text"
                  name="finca"
                  value={formulario.finca}
                  onChange={manejarCambio}
                  placeholder="Ej. Finca El Paraíso"
                />

              </label>


              <label>

                Ubicación

                <input
                  type="text"
                  name="ubicacion"
                  value={formulario.ubicacion}
                  onChange={manejarCambio}
                  placeholder="Potrero, corral o sector"
                />

              </label>


              <label>

                Estado administrativo

                <select
                  name="estado"
                  value={formulario.estado}
                  onChange={manejarCambio}
                >

                  <option value="Activo">

                    Activo

                  </option>

                  <option value="Inactivo">

                    Inactivo

                  </option>

                </select>

              </label>


            </div>


          </div>


          {
            error && (

              <div className="formularioActivoError">

                {error}

              </div>

            )
          }


          <footer className="formularioActivoFooter">


            <button
              type="button"
              className="btnCancelarActivo"
              onClick={cerrar}
            >

              Cancelar

            </button>


            <button
              type="submit"
              className="btnGuardarActivo"
            >

              <Save size={18} />

              {
                esEdicion

                ?

                "Guardar cambios"

                :

                "Registrar activo"
              }

            </button>


          </footer>


        </form>


      </section>


    </div>

  );

}