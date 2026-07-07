import { useState } from "react";

export default function NuevoAnimal({

cerrar,

actualizar

}){


const [formulario,setFormulario]=useState({

codigo:"",

nombre:"",

rfid:"",

sexo:"",

raza:"",

peso:"",

estado:"Activo"

});


const cambiar=(e)=>{

setFormulario({

...formulario,

[e.target.name]:

e.target.value

});

};


const guardar = () => {

const animales =

JSON.parse(

localStorage.getItem("animales")

)

||

[];


const nuevoAnimal = {

id: Date.now(),

...formulario

};


animales.push(

nuevoAnimal

);


localStorage.setItem(

"animales",

JSON.stringify(animales)

);


alert(

"Animal registrado correctamente"

);


actualizar();

cerrar();

};

return(

<div className="overlay">


<div className="modal">


<h2>

Registrar Animal

</h2>


<input

name="codigo"

placeholder="Código"

onChange={cambiar}

/>


<input

name="nombre"

placeholder="Nombre"

onChange={cambiar}

/>


<input

name="rfid"

placeholder="RFID"

onChange={cambiar}

/>


<select

name="sexo"

onChange={cambiar}

>

<option>

Sexo

</option>

<option>

Macho

</option>

<option>

Hembra

</option>

</select>


<input

name="raza"

placeholder="Raza"

onChange={cambiar}

/>


<input

name="peso"

placeholder="Peso"

onChange={cambiar}

/>


<button

onClick={guardar}

className="btnGuardar"

>

Guardar

</button>


<button

onClick={cerrar}

className="btnCancelar"

>

Cancelar

</button>


</div>


</div>

)

}