import {
  obtenerRelacionEvento,
} from "./knowledgeRelationService";

import {
  evaluarReglas,
} from "./knowledgeRuleEngineService";
const STORAGE_KEY = "ganus_knowledge_engine";

import {
  agregarSnapshot,
} from "./knowledgeSnapshotService";

const estadoInicial = {
  eventos: [],
  indicadores: [],
  relaciones: [],
  evaluaciones: [],
  snapshots: [],

  hallazgos: [],
  riesgos: [],
  oportunidades: [],
  recomendaciones: [],
};

function obtenerEstado() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
      return { ...estadoInicial };
    }

    return JSON.parse(datos);
  } catch {
    return { ...estadoInicial };
  }
}

function guardarEstado(estado) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(estado)
  );

  window.dispatchEvent(

    new CustomEvent(
      "knowledge-engine-updated",
      {
        detail: estado,
      }
    )

  );

}

export function obtenerKnowledgeEngine() {
  return obtenerEstado();
}

export function obtenerResumenKnowledge() {

  const estado = obtenerEstado();

  return {

    eventos:
      estado.eventos.length,

    reglas:
      (estado.evaluaciones || []).length,

    indicadores:
      (estado.indicadores || []).length,

    snapshots:
      (estado.snapshots || []).length,

    hallazgos:
      (estado.hallazgos || []).length,

    riesgos:
      (estado.riesgos || []).length,

    oportunidades:
      (estado.oportunidades || []).length,

    recomendaciones:
      (estado.recomendaciones || []).length,

    objetivos:

      new Set(
        estado.eventos.map(
          evento => evento.objetivo
        )
      ).size,

    principios:

      new Set(
        estado.eventos.map(
          evento => evento.principio
        )
      ).size,

  };

}

export function reiniciarKnowledgeEngine() {
  guardarEstado({ ...estadoInicial });
}

export function registrarEvento(evento) {
  

  const estado = obtenerEstado();

  const relacion = obtenerRelacionEvento(
    evento.tipo
  );

  const nuevoEvento = {
  id: crypto.randomUUID(),

  fecha: new Date().toISOString(),

  ...evento,

  objetivo: relacion.objetivo,

  principio: relacion.principio,

  regla: relacion.regla,

  proceso: relacion.proceso,

  area: relacion.area,

  impacto: relacion.impacto,

  nivel: relacion.nivel,
};

  estado.eventos = [
    nuevoEvento,
    ...(estado.eventos || []),
  ];

  const evaluaciones = evaluarReglas(nuevoEvento);

estado.evaluaciones = [
  ...(estado.evaluaciones || []),
  ...evaluaciones,
];

evaluaciones.forEach((evaluacion) => {
evaluacion.prioridad =
  {
    critica: 1,
    alta: 2,
    media: 3,
    baja: 4,
  }[evaluacion.severidad] ?? 5;

  switch (evaluacion.tipo) {
    case "hallazgo":
      estado.hallazgos = [
        evaluacion,
        ...(estado.hallazgos || []),
      ];
      break;

    case "riesgo":
      estado.riesgos = [
        evaluacion,
        ...(estado.riesgos || []),
      ];
      break;

    case "oportunidad":
      estado.oportunidades = [
        evaluacion,
        ...(estado.oportunidades || []),
      ];
      break;

    case "recomendacion":
      estado.recomendaciones = [
        evaluacion,
        ...(estado.recomendaciones || []),
      ];
      break;

    default:
      break;
  }
});

  estado.indicadores = [
  ...(estado.indicadores || []),

  {
    id: crypto.randomUUID(),

    nombre: "Órdenes finalizadas",

    valor:
      estado.eventos.filter(
        (evento) =>
          evento.tipo === "ORDEN_FINALIZADA"
      ).length,

    fecha: new Date().toISOString(),
  },
];

  const snapshot = {
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),

    eventos: estado.eventos.length,

    evaluaciones:
      estado.evaluaciones.length,

    ordenesFinalizadas:
      estado.eventos.filter(
        (evento) =>
          evento.tipo === "ORDEN_FINALIZADA"
      ).length,
  };

  estado.snapshots = [
    snapshot,
    ...(estado.snapshots || []),
  ];

  guardarEstado(estado);

  return nuevoEvento;
}

export function obtenerEventosKnowledge() {
    const estado = obtenerEstado();

    return [...estado.eventos].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
}

export function obtenerUltimosEventos(limit = 10) {
    return obtenerEventosKnowledge().slice(0, limit);
}

export function obtenerTotalEventos() {
    return obtenerEstado().eventos.length;
}

export function obtenerEstadoMotor() {

  const estado = obtenerEstado();

  return [

    {
      id: 1,
      nombre: "Knowledge Engine",
      descripcion:
        `${estado.eventos.length} evento(s) procesados`,
      estado: "activo",
    },

    {
      id: 2,
      nombre: "Rule Engine",
      descripcion:
        `${(estado.evaluaciones || []).length} regla(s) ejecutadas`,
      estado:
        (estado.evaluaciones || []).length > 0
          ? "activo"
          : "espera",
    },

    {
      id: 3,
      nombre: "Event Engine",
      descripcion:
        `${estado.eventos.length} evento(s) recibidos`,
      estado: "activo",
    },

    {
      id: 4,
      nombre: "Widget Publisher",
      descripcion:
        `${(estado.indicadores || []).length} indicador(es) publicados`,
      estado:
        (estado.indicadores || []).length > 0
          ? "activo"
          : "sincronizando",
    },

    {
      id: 5,
      nombre: "Snapshot Engine",
      descripcion:
        `${(estado.snapshots || []).length} snapshot(s) generados`,
      estado: "activo",
    },

    {
  id: 6,
  nombre: "Risk Analyzer",
  descripcion:
    `${(estado.riesgos || []).length} riesgo(s) detectados`,
  estado:
    (estado.riesgos || []).length > 0
      ? "activo"
      : "espera",
},

{
  id: 7,
  nombre: "Opportunity Analyzer",
  descripcion:
    `${(estado.oportunidades || []).length} oportunidad(es) detectadas`,
  estado:
    (estado.oportunidades || []).length > 0
      ? "activo"
      : "espera",
},

{
  id: 8,
  nombre: "Recommendation Engine",
  descripcion:
    `${(estado.recomendaciones || []).length} recomendación(es) generadas`,
  estado:
    (estado.recomendaciones || []).length > 0
      ? "activo"
      : "espera",
},

  ];

}

export function obtenerEventosPorTipo(tipo) {
  return obtenerEstado().eventos.filter(
    (evento) => evento.tipo === tipo
  );
}

export function obtenerTotalOrdenesFinalizadas() {
  return obtenerEventosPorTipo(
    "ORDEN_FINALIZADA"
  ).length;
}

export function obtenerResumenAdvisory() {

  const estado = obtenerEstado();

  return {

    areasSeguimiento:

      (estado.riesgos || []).length +
      (estado.recomendaciones || []).length,

    prioridadOperativa:

      (estado.riesgos || []).filter(
        riesgo => riesgo.severidad === "critica"
      ).length,

    seguimientoEmpresarial:

      estado.eventos.length > 0
        ? "Activo"
        : "Sin actividad",

  };

}

export function obtenerIndicadoresMotor() {

  const estado = obtenerEstado();

  return {

    ordenesFinalizadas:
      obtenerTotalOrdenesFinalizadas(),

    eventosProcesados:
      estado.eventos.length,

    reglas:
      (estado.evaluaciones || []).length,

    hallazgos:
      (estado.hallazgos || []).length,

    riesgos:
      (estado.riesgos || []).length,

    oportunidades:
      (estado.oportunidades || []).length,

    recomendaciones:
      (estado.recomendaciones || []).length,

  };

}


export function generarSnapshot() {
  const estado = obtenerEstado();

  const snapshot = {
    id: crypto.randomUUID(),
    fecha: new Date().toISOString(),

    eventos: estado.eventos.length,

    evaluaciones:
      (estado.evaluaciones || []).length,

    ordenesFinalizadas:
      obtenerTotalOrdenesFinalizadas(),
  };

  estado.snapshots = [
    snapshot,
    ...(estado.snapshots || []),
  ];

 agregarSnapshot(snapshot);

  return snapshot;
}

export function obtenerHallazgosKnowledge() {
  return obtenerEstado().hallazgos || [];
}

export function obtenerRiesgosKnowledge() {
  return obtenerEstado().riesgos || [];
}

export function obtenerOportunidadesKnowledge() {
  return obtenerEstado().oportunidades || [];
}

export function obtenerRecomendacionesKnowledge() {
  return obtenerEstado().recomendaciones || [];
}