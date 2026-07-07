const respuestasAdvisory = {
  estado: {
    palabrasClave: [
      "estado",
      "situacion",
      "situación",
      "resumen",
      "general",
      "como vamos",
      "cómo vamos",
    ],
    respuesta:
      "El entorno empresarial presenta una operación estable. Se recomienda mantener seguimiento sobre las actividades pendientes, los activos con novedades y las alertas operativas registradas.",
  },

  actividades: {
    palabrasClave: [
      "actividad",
      "actividades",
      "pendiente",
      "pendientes",
      "operacion",
      "operación",
    ],
    respuesta:
      "Las actividades operativas requieren seguimiento periódico. GANUS recomienda priorizar las tareas pendientes y validar aquellas que se encuentran próximas a su fecha límite.",
  },

  inventario: {
    palabrasClave: [
      "inventario",
      "activo",
      "activos",
      "equipos",
      "recurso",
      "recursos",
    ],
    respuesta:
      "El inventario debe mantenerse actualizado para asegurar trazabilidad. Se recomienda revisar los activos con novedades y validar la asignación de responsables.",
  },

  alertas: {
    palabrasClave: [
      "alerta",
      "alertas",
      "riesgo",
      "riesgos",
      "problema",
      "problemas",
    ],
    respuesta:
      "Se identifican eventos que requieren atención operativa. La recomendación es revisar primero las alertas de mayor prioridad y documentar las acciones realizadas.",
  },

  indicadores: {
    palabrasClave: [
      "indicador",
      "indicadores",
      "kpi",
      "kpis",
      "rendimiento",
      "desempeño",
    ],
    respuesta:
      "Los indicadores permiten evaluar el comportamiento de la operación. GANUS recomienda analizar las variaciones recientes y relacionarlas con las actividades y alertas registradas.",
  },

  recomendacion: {
    palabrasClave: [
      "recomienda",
      "recomendacion",
      "recomendación",
      "sugerencia",
      "priorizar",
      "prioridad",
      "que hago",
      "qué hago",
    ],
    respuesta:
      "La prioridad recomendada es atender las alertas críticas, revisar actividades próximas a vencer y validar los activos que presentan novedades. Esto permite reducir riesgos operativos y mejorar el control empresarial.",
  },
};

const normalizarTexto = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const buscarRespuestaLocal = (mensaje) => {
  const mensajeNormalizado = normalizarTexto(mensaje);

  const categoriaEncontrada = Object.values(respuestasAdvisory).find(
    (categoria) =>
      categoria.palabrasClave.some((palabra) =>
        mensajeNormalizado.includes(normalizarTexto(palabra))
      )
  );

  if (categoriaEncontrada) {
    return categoriaEncontrada.respuesta;
  }

  return "Puedo orientarte sobre el estado general de la operación, actividades, inventario, alertas, indicadores y prioridades empresariales. Selecciona una consulta sugerida o formula una pregunta relacionada con estos temas.";
};

export const obtenerRespuestaAdvisory = async (mensaje) => {
  await new Promise((resolve) => setTimeout(resolve, 650));

  return buscarRespuestaLocal(mensaje);
};