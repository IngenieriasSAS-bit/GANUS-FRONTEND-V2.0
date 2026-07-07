import {

Chart as ChartJS,

CategoryScale,

LinearScale,

PointElement,

LineElement,

Title,

Tooltip,

Legend

} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(

CategoryScale,

LinearScale,

PointElement,

LineElement,

Title,

Tooltip,

Legend

);

export default function GraficaPesajes(){

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

label:"Pesajes",

data:[

275,

320,

355,

310,

420,

375

],

borderColor:"#0E6BFF",

backgroundColor:"#0E6BFF",

tension:.4

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

text:"Pesajes realizados",

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

<Line

data={data}

options={options}

/>

</div>

)

}