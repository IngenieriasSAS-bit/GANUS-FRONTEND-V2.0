const RELACIONES = {
  ORDEN_FINALIZADA: {
  objetivo: "Fortalecer la eficiencia operativa",

  principio: "Continuidad operacional",

  regla: "RGL-001",

  proceso: "Mantenimiento",

  area: "Operaciones",

  impacto: "Alto",

  nivel: "Estratégico",
},

ORDEN_CREADA: {
  objetivo: "Planificar la ejecución operativa",

  principio: "Planeación",

  regla: "RGL-000",

  proceso: "Mantenimiento",

  area: "Operaciones",

  impacto: "Medio",

  nivel: "Operativo",
},

ORDEN_INICIADA: {
  objetivo: "Ejecutar las actividades programadas",

  principio: "Ejecución",

  regla: "RGL-000A",

  proceso: "Mantenimiento",

  area: "Operaciones",

  impacto: "Alto",

  nivel: "Operativo",
},

ORDEN_PAUSADA: {
  objetivo: "Controlar interrupciones operativas",

  principio: "Continuidad operacional",

  regla: "RGL-000B",

  proceso: "Mantenimiento",

  area: "Operaciones",

  impacto: "Medio",

  nivel: "Táctico",
},

ORDEN_VENCIDA: {
  objetivo: "Reducir incumplimientos operativos",

  principio: "Cumplimiento",

  regla: "RGL-002",

  proceso: "Mantenimiento",

  area: "Operaciones",

  impacto: "Crítico",

  nivel: "Estratégico",
},

ALERTA_CRITICA: {
  objetivo: "Garantizar la continuidad del negocio",

  principio: "Gestión del riesgo",

  regla: "RGL-003",

  proceso: "Monitoreo",

  area: "Operaciones",

  impacto: "Crítico",

  nivel: "Estratégico",
},

PRODUCTIVIDAD_ALTA: {
  objetivo: "Incrementar la productividad",

  principio: "Mejora continua",

  regla: "RGL-004",

  proceso: "Producción",

  area: "Operaciones",

  impacto: "Medio",

  nivel: "Táctico",
},

INDICADOR_BAJO: {
  objetivo: "Mejorar el desempeño",

  principio: "Gestión por indicadores",

  regla: "RGL-005",

  proceso: "Indicadores",

  area: "Planeación",

  impacto: "Alto",

  nivel: "Estratégico",
},
};

export function obtenerRelacionEvento(tipoEvento) {
  return (
  RELACIONES[tipoEvento] || {
    objetivo: "Sin relación",
    principio: "Sin relación",
    regla: null,

    proceso: "No definido",

    area: "General",

    impacto: "Bajo",

    nivel: "Operativo",
  }
);
}