import { useState } from "react";

import Sidebar from "../layouts/Sidebar";

import "../styles/vacunaciones.css";

export default function Vacunaciones(){

const [historial,setHistorial]=useState(() => {

return JSON.parse(

localStorage.getItem("vacunas")

) || [];

});

const [formulario,setFormulario]=useState({

animal_id:1,

vacuna:"",

fecha_aplicacion:"",

proxima_dosis:"",

veterinario:"",

observaciones:""

});

const [animales] = useState(() => {

return JSON.parse(

localStorage.getItem("animales")

) || [];

});

const cambiar=(e)=>{

setFormulario({

...formulario,

[e.target.name]:e.target.value

});

};

const guardar=()=>{

const nuevasVacunas=[

...historial,

{

id:Date.now(),

nombre:

formulario.animal_id==="1"

?

"La Negra"

:

"Toro Bravo",

vacuna:

formulario.vacuna,

fecha_aplicacion:

formulario.fecha_aplicacion,

proxima_dosis:

formulario.proxima_dosis,

veterinario:

formulario.veterinario,

observaciones:

formulario.observaciones

}

];

setHistorial(nuevasVacunas);

localStorage.setItem(

"vacunas",

JSON.stringify(nuevasVacunas)

);

alert(

"Vacunación registrada correctamente"

);

setFormulario({

animal_id:1,

vacuna:"",

fecha_aplicacion:"",

proxima_dosis:"",

veterinario:"",

observaciones:""

});

};

return(

<>  

<Sidebar/>

<div className="vacunaciones">

<h1>

Vacunación

</h1>

<p className="subtitulo">

Control sanitario y seguimiento de vacunas.

</p>


<div className="vacunacionTop">


<div className="formularioVacuna">

<select
name="animal_id"
value={formulario.animal_id}
onChange={cambiar}
>

{

animales.map((animal)=>(

<option

key={animal.id}

value={animal.id}

>

{animal.nombre}

</option>

))

}

</select>

<input

name="vacuna"

placeholder="Nombre de la vacuna"

value={formulario.vacuna}

onChange={cambiar}

/>


<input

type="date"

name="fecha_aplicacion"

value={formulario.fecha_aplicacion}

onChange={cambiar}

/>


<input

type="date"

name="proxima_dosis"

value={formulario.proxima_dosis}

onChange={cambiar}

/>


<input

name="veterinario"

placeholder="Veterinario responsable"

value={formulario.veterinario}

onChange={cambiar}

/>


<textarea

name="observaciones"

placeholder="Observaciones"

value={formulario.observaciones}

onChange={cambiar}

/>


<button

className="btnGuardar"

onClick={guardar}

>

Guardar Vacuna

</button>

</div>


<div className="resumenVacuna">

<h2>

Resumen

</h2>

<div className="dato">

<span>Vacunas aplicadas</span>

<h1>

145

</h1>

</div>


<div className="dato">

<span>Próximas vacunas</span>

<h1 className="amarillo">

12

</h1>

</div>


<div className="dato">

<span>Vacunas vencidas</span>

<h1 className="rojo">

3

</h1>

</div>

</div>

</div>


<h2 className="tituloTabla">

Historial de Vacunación

</h2>


<div className="tablaVacunas">

<table>

<thead>

<tr>

<th>Animal</th>

<th>Vacuna</th>

<th>Aplicación</th>

<th>Próxima</th>

<th>Veterinario</th>

</tr>

</thead>


<tbody>

{

historial.map((v)=>(

<tr key={v.id}>

<td>

{v.nombre}

</td>

<td>

{v.vacuna}

</td>

<td>

{v.fecha_aplicacion?.split("T")[0]}

</td>

<td>

{v.proxima_dosis?.split("T")[0]}

</td>

<td>

{v.veterinario}

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</>

)

} 