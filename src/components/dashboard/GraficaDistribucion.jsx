import {

Chart as ChartJS,

ArcElement,

Tooltip,

Legend

} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(

ArcElement,

Tooltip,

Legend

);

export default function GraficaDistribucion(){

const data={

labels:[

"Vacunados",

"Pendientes",

"Enfermos"

],

datasets:[

{

data:[

70,

20,

10

],

backgroundColor:[

"#4CCB4C",

"#F8BE3C",

"#FF4E42"

],

borderWidth:0

}

]

};

const options={

responsive:true,

maintainAspectRatio:false,

cutout:"72%",

plugins:{

legend:{

position:"right",

labels:{

boxWidth:15,

padding:20,

font:{

size:14

}

}

}

}

};

return(

<div className="grafica">

<h2>

Distribución del ganado

</h2>

<div className="graficaPie">

<Doughnut

data={data}

options={options}

/>

</div>

</div>

)

}