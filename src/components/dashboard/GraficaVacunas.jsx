import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

Title,

Tooltip,

Legend

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

Title,

Tooltip,

Legend

);

export default function GraficaVacunas(){

const data={

labels:[

"Ene",

"Feb",

"Mar",

"Abr",

"May",

"Jun"

],

datasets:[

{

label:"Vacunaciones",

data:[

4,

7,

5,

9,

6,

8

],

backgroundColor:"#76B82A",

borderRadius:12

}

]

};

const options={

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:false

},

title:{

display:true,

text:"Vacunaciones por mes",

color:"#082C54",

font:{

size:22,

weight:"bold"

}

}

}

};

return(

<div className="grafica">

<Bar

data={data}

options={options}

/>

</div>

)

}