export function evaluarReglas(evento) {
  const evaluaciones = [];

  switch (evento.tipo) {
    case "ORDEN_FINALIZADA":
      evaluaciones.push({
  id: crypto.randomUUID(),

  regla: "RGL-001",

  nombre: "Orden finalizada correctamente",

  tipo: "hallazgo",

  categoria: "Operación",

  severidad: "baja",

  titulo: "Orden ejecutada satisfactoriamente",

  descripcion:
    "La orden fue finalizada correctamente y aporta evidencia positiva al conocimiento operativo.",

  recomendacion:
    "Mantener las condiciones operativas actuales y utilizar esta ejecución como referencia para futuras actividades.",

  resultado: "success",

  fecha: new Date().toISOString(),

  eventoId: evento.id,
});
      break;

case "ORDEN_VENCIDA":
  evaluaciones.push({
    id: crypto.randomUUID(),

    regla: "RGL-002",

    nombre: "Orden vencida",

    tipo: "riesgo",

    categoria: "Operación",

    severidad: "alta",

    titulo: "Incumplimiento operativo",

    descripcion:
      "Se detectó una orden cuya fecha límite fue superada.",

    recomendacion:
      "Asignar prioridad alta y revisar la causa del incumplimiento.",

    resultado: "warning",

    fecha: new Date().toISOString(),

    eventoId: evento.id,
  });
  break;

case "ALERTA_CRITICA":
  evaluaciones.push({
    id: crypto.randomUUID(),

    regla: "RGL-003",

    nombre: "Alerta crítica",

    tipo: "riesgo",

    categoria: "Alertas",

    severidad: "critica",

    titulo: "Atención inmediata requerida",

    descripcion:
      "Se registró una alerta crítica que requiere intervención inmediata.",

    recomendacion:
      "Escalar la alerta al supervisor y generar una orden correctiva.",

    resultado: "danger",

    fecha: new Date().toISOString(),

    eventoId: evento.id,
  });
  break;

case "PRODUCTIVIDAD_ALTA":
  evaluaciones.push({
    id: crypto.randomUUID(),

    regla: "RGL-004",

    nombre: "Alta productividad",

    tipo: "oportunidad",

    categoria: "Productividad",

    severidad: "baja",

    titulo: "Buen desempeño operativo",

    descripcion:
      "El rendimiento supera el objetivo esperado.",

    recomendacion:
      "Documentar las buenas prácticas y replicarlas en otros procesos.",

    resultado: "success",

    fecha: new Date().toISOString(),

    eventoId: evento.id,
  });
  break;

case "INDICADOR_BAJO":
  evaluaciones.push({
    id: crypto.randomUUID(),

    regla: "RGL-005",

    nombre: "Indicador bajo",

    tipo: "recomendacion",

    categoria: "Indicadores",

    severidad: "media",

    titulo: "Indicador fuera del objetivo",

    descripcion:
      "Uno de los indicadores estratégicos se encuentra por debajo del valor esperado.",

    recomendacion:
      "Analizar la tendencia y definir un plan de mejora.",

    resultado: "info",

    fecha: new Date().toISOString(),

    eventoId: evento.id,
  });
  break;

    default:
      break;
  }

  return evaluaciones;
}