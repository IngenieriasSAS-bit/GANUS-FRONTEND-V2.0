import { useState } from "react";

import Sidebar from "../layouts/Sidebar";

import "../styles/pesaje.css";

export default function Pesaje() {
const [historial,setHistorial]=useState(()=>{

return JSON.parse(

localStorage.getItem("pesajes")

)

||

[];

});

const [formulario,setFormulario]=useState({

animal_id:1,

peso:"",

condicion_corporal:"",

fecha:"",

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

[e.target.name]:

e.target.value

});

};

const guardar=()=>{

const nuevoPesaje={

id:Date.now(),

fecha:formulario.fecha,

peso:formulario.peso,

variacion:"+0 Kg",

condicion:formulario.condicion_corporal,

observaciones:formulario.observaciones

};


const nuevosPesajes=[

nuevoPesaje,

...historial

];


setHistorial(

nuevosPesajes

);


localStorage.setItem(

"pesajes",

JSON.stringify(

nuevosPesajes

)

);


alert(

"Pesaje registrado correctamente"

);


setFormulario({

animal_id:1,

peso:"",

condicion_corporal:"",

fecha:"",

observaciones:""

});

};

return(

<>

<Sidebar/>

<div className="pesaje">

<h1>

Registro de Pesaje

</h1>

<p className="subtitulo">

Control y seguimiento del peso de los animales.

</p>

<div className="pesajeTop">

<div className="formularioPesaje">

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

name="peso"

placeholder="Peso (Kg)"

value={formulario.peso}

onChange={cambiar}

/>


<input

name="condicion_corporal"

placeholder="Condición corporal"

value={formulario.condicion_corporal}

onChange={cambiar}

/>


<input

type="date"

name="fecha"

value={formulario.fecha}

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

Guardar Pesaje

</button>

</div>


<div className="resumen">

<h2>

Resumen

</h2>

<div className="dato">

<span>Último peso</span>

<h2>420 Kg</h2>

</div>

<div className="dato">

<span>Variación</span>

<h2 className="verde">

+15 Kg

</h2>

</div>

<div className="dato">

<span>Fecha último pesaje</span>

<h2>

15/06/2026

</h2>

</div>

<div className="dato">

<span>Estado</span>

<h2>

Estable

</h2>

</div>

</div>

</div>


<h2 className="tituloTabla">

Historial de Pesajes

</h2>

<div className="tablaPesajes">

<table>

<thead>

<tr>

<th>Fecha</th>

<th>Peso</th>

<th>Variación</th>

<th>Condición</th>

<th>Observaciones</th>

</tr>

</thead>

<tbody>

{

historial.map((item,index)=>(

<tr key={index}>

<td>

{item.fecha}

</td>

<td>

{item.peso} Kg

</td>

<td className="verde">

{item.variacion}

</td>

<td>

{item.condicion}

</td>

<td>

{item.observaciones}

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