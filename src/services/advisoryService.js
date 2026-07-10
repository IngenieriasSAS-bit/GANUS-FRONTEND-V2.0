const orientacionesAdvisory = {
  estado: {
    categoria: "Estado general",
    estado: "Operación estable",
    titulo: "Resumen de la operación",

    palabrasClave: [
      "estado",
      "situacion",
      "situación",
      "resumen",
      "general",
      "como vamos",
      "cómo vamos",
      "empresa",
      "operacion",
      "operación",
      "panorama",
    ],

    analisis:
      "La operación presenta un comportamiento estable de acuerdo con la información empresarial disponible. No obstante, existen asuntos de seguimiento relacionados con actividades pendientes, novedades sobre activos y eventos operativos registrados.",

    criterio:
      "El control operativo debe concentrarse en situaciones pendientes que puedan afectar la continuidad, la trazabilidad de los activos o el cumplimiento de las actividades programadas.",

    recomendacion:
      "Mantén seguimiento sobre las actividades pendientes, valida los activos que presentan novedades y revisa las alertas de mayor prioridad antes de realizar nuevas asignaciones operativas.",
  },

  actividades: {
    categoria: "Actividades",
    estado: "Seguimiento requerido",
    titulo: "Seguimiento de ejecución operativa",

    palabrasClave: [
      "actividad",
      "actividades",
      "tarea",
      "tareas",
      "pendiente",
      "pendientes",
      "vencer",
      "vencimiento",
      "ejecucion",
      "ejecución",
      "responsable",
      "responsables",
      "seguimiento",
    ],

    analisis:
      "Las actividades operativas requieren seguimiento periódico para conservar visibilidad sobre su ejecución. Las tareas pendientes o próximas a su fecha límite deben revisarse antes de incrementar la carga operativa.",

    criterio:
      "La prioridad de seguimiento aumenta cuando una actividad permanece pendiente, se aproxima a su fecha límite o requiere validación del responsable asignado.",

    recomendacion:
      "Revisa primero las actividades pendientes y próximas a vencer. Después valida responsables, fechas programadas y condiciones de ejecución antes de generar nuevas asignaciones.",
  },

  inventario: {
    categoria: "Inventario",
    estado: "Validación recomendada",
    titulo: "Control y trazabilidad de activos",

    palabrasClave: [
      "inventario",
      "activo",
      "activos",
      "equipo",
      "equipos",
      "recurso",
      "recursos",
      "asignacion",
      "asignación",
      "responsable",
      "responsables",
      "novedad",
      "novedades",
      "trazabilidad",
    ],

    analisis:
      "El inventario requiere información actualizada para mantener la trazabilidad de los activos y facilitar el control sobre su estado, ubicación y asignación dentro de la operación.",

    criterio:
      "Los activos con novedades, información incompleta o asignaciones pendientes representan los principales puntos de validación dentro del control de inventario.",

    recomendacion:
      "Prioriza la revisión de activos con novedades. Valida su estado actual, ubicación y responsable asignado antes de cerrar el seguimiento o modificar su condición operativa.",
  },

  alertas: {
    categoria: "Alertas y riesgos",
    estado: "Atención prioritaria",
    titulo: "Situaciones que requieren atención",

    palabrasClave: [
      "alerta",
      "alertas",
      "riesgo",
      "riesgos",
      "problema",
      "problemas",
      "critico",
      "crítico",
      "critica",
      "crítica",
      "evento",
      "eventos",
      "incidente",
      "incidentes",
      "prioridad",
      "priorizar",
    ],

    analisis:
      "Existen eventos operativos que pueden requerir atención según su nivel de prioridad y el impacto asociado. La revisión ordenada de estas situaciones permite reducir la acumulación de riesgos dentro de la operación.",

    criterio:
      "Las alertas de mayor prioridad deben atenderse antes que los eventos de seguimiento rutinario, especialmente cuando existe impacto sobre actividades, activos o continuidad operativa.",

    recomendacion:
      "Revisa primero las alertas de mayor prioridad. Documenta la acción realizada, valida si existe relación con actividades o activos y confirma el cierre únicamente cuando la condición haya sido atendida.",
  },

  indicadores: {
    categoria: "Indicadores",
    estado: "Análisis recomendado",
    titulo: "Lectura del desempeño operativo",

    palabrasClave: [
      "indicador",
      "indicadores",
      "kpi",
      "kpis",
      "rendimiento",
      "desempeño",
      "resultado",
      "resultados",
      "medicion",
      "medición",
      "variacion",
      "variación",
      "tendencia",
      "tendencias",
    ],

    analisis:
      "Los indicadores permiten observar el comportamiento de la operación y detectar variaciones que requieren interpretación. Un resultado aislado debe analizarse junto con las actividades, alertas y condiciones operativas relacionadas.",

    criterio:
      "Las variaciones recientes y los cambios de tendencia adquieren mayor relevancia cuando coinciden con retrasos operativos, alertas activas o novedades sobre recursos empresariales.",

    recomendacion:
      "Compara las variaciones recientes de los indicadores y relaciona los cambios relevantes con actividades, alertas y novedades operativas antes de definir una acción correctiva.",
  },

  recomendacion: {
    categoria: "Priorización operativa",
    estado: "Orientación disponible",
    titulo: "Prioridades recomendadas",

    palabrasClave: [
      "recomienda",
      "recomendacion",
      "recomendación",
      "sugerencia",
      "priorizar",
      "prioridad",
      "prioridades",
      "que hago",
      "qué hago",
      "por donde empiezo",
      "por dónde empiezo",
      "que debo hacer",
      "qué debo hacer",
      "hoy",
      "primero",
      "urgente",
    ],

    analisis:
      "La priorización operativa debe comenzar por las situaciones con mayor impacto potencial sobre la continuidad y el control empresarial. Después deben atenderse los asuntos próximos a generar retrasos o pérdida de trazabilidad.",

    criterio:
      "El orden recomendado considera primero las alertas prioritarias, después las actividades próximas a vencer y finalmente los activos que presentan novedades o requieren validación.",

    recomendacion:
      "Comienza revisando las alertas de mayor prioridad. Continúa con las actividades pendientes o próximas a vencer y finaliza validando los activos que presentan novedades de estado, ubicación o asignación.",
  },
};

const orientacionGeneral = {
  categoria: "Orientación general",
  estado: "Consulta disponible",
  titulo: "Análisis de la operación",

  analisis:
    "La consulta no coincide directamente con un área específica de análisis operativo. Advisory puede orientar la revisión del estado general, actividades, inventario, alertas, indicadores y prioridades empresariales.",

  criterio:
    "La orientación se organiza según las áreas operativas actualmente disponibles dentro de GANUS y la información empresarial asociada a cada contexto.",

  recomendacion:
    "Formula la consulta indicando el área que deseas revisar o solicita una recomendación de prioridad para obtener una orientación más específica.",
};

const normalizarTexto = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const calcularCoincidencias = (
  mensajeNormalizado,
  palabrasClave = []
) =>
  palabrasClave.reduce((total, palabraClave) => {
    const palabraNormalizada = normalizarTexto(palabraClave);

    if (!palabraNormalizada) {
      return total;
    }

    return mensajeNormalizado.includes(palabraNormalizada)
      ? total + 1
      : total;
  }, 0);

const buscarOrientacionLocal = (mensaje) => {
  const mensajeNormalizado = normalizarTexto(mensaje);

  if (!mensajeNormalizado) {
    return orientacionGeneral;
  }

  const categoriasEvaluadas = Object.entries(
    orientacionesAdvisory
  ).map(([id, orientacion]) => ({
    id,
    orientacion,
    coincidencias: calcularCoincidencias(
      mensajeNormalizado,
      orientacion.palabrasClave
    ),
  }));

  const categoriaPrincipal = categoriasEvaluadas.reduce(
    (categoriaActual, categoriaEvaluada) => {
      if (
        categoriaEvaluada.coincidencias >
        categoriaActual.coincidencias
      ) {
        return categoriaEvaluada;
      }

      return categoriaActual;
    },
    {
      id: null,
      orientacion: orientacionGeneral,
      coincidencias: 0,
    }
  );

  if (categoriaPrincipal.coincidencias === 0) {
    return orientacionGeneral;
  }

  return categoriaPrincipal.orientacion;
};

export const obtenerRespuestaAdvisory = async (mensaje) => {
  await new Promise((resolve) => setTimeout(resolve, 650));

  const orientacion = buscarOrientacionLocal(mensaje);

  return {
    categoria: orientacion.categoria,
    estado: orientacion.estado,
    titulo: orientacion.titulo,
    analisis: orientacion.analisis,
    criterio: orientacion.criterio,
    recomendacion: orientacion.recomendacion,
  };
};