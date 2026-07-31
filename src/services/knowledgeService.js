const STORAGE_KEY = "ganus_knowledge_studio";

const estadoInicial = {
  objetivos: [],
  indicadores: [],
  principios: [],
  reglas: [],
};

function obtenerEstado() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
      return { ...estadoInicial };
    }

    return {
      ...estadoInicial,
      ...JSON.parse(datos),
    };
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
      "knowledge-studio-updated",
      {
        detail: estado,
      }
    )
  );
}

const objetivosIniciales = [
  {
    id: 1,
    nombre:
      "Optimizar la comercialización ganadera",
    descripcion:
      "Mejorar la disponibilidad comercial de los activos ganaderos mediante seguimiento estratégico.",
    progreso: 82,
    indicadores: 3,
    estado: "Activo",
  },
  {
    id: 2,
    nombre:
      "Fortalecer la eficiencia operativa",
    descripcion:
      "Reducir tiempos operativos y mejorar la trazabilidad de las actividades empresariales.",
    progreso: 68,
    indicadores: 2,
    estado: "Activo",
  },
  {
    id: 3,
    nombre:
      "Incrementar la calidad de la información",
    descripcion:
      "Garantizar información confiable y actualizada para la toma de decisiones empresariales.",
    progreso: 91,
    indicadores: 2,
    estado: "Activo",
  },
  {
    id: 4,
    nombre:
      "Consolidar la automatización empresarial",
    descripcion:
      "Integrar reglas y eventos que permitan ejecutar respuestas automáticas dentro de GANUS.",
    progreso: 45,
    indicadores: 1,
    estado: "En revisión",
  },
];

export function obtenerObjetivosEstrategicos() {

  const estado = obtenerEstado();

  if (estado.objetivos.length === 0) {

    estado.objetivos = objetivosIniciales.map(
      (objetivo) => ({
        ...objetivo,
      })
    );

    guardarEstado(estado);

  }

  return estado.objetivos.map(
    (objetivo) => ({
      ...objetivo,
    })
  );

}

export function crearObjetivoEstrategico(
  objetivos,
  datosObjetivo
) {
  const siguienteId =
    objetivos.length > 0
      ? Math.max(
          ...objetivos.map((objetivo) => objetivo.id)
        ) + 1
      : 1;

  return {
    id: siguienteId,
    nombre: datosObjetivo.nombre,
    descripcion: datosObjetivo.descripcion,
    progreso: datosObjetivo.progreso,
    indicadores: datosObjetivo.indicadores,
    estado: datosObjetivo.estado,
  };
}

export function actualizarObjetivoEstrategico(
  objetivos,
  objetivoActualizado
) {

  const nuevosObjetivos =
    objetivos.map((objetivo) =>
      objetivo.id === objetivoActualizado.id
        ? {
            ...objetivo,
            ...objetivoActualizado,
          }
        : objetivo
    );

  const estado = obtenerEstado();

  estado.objetivos = nuevosObjetivos;

  guardarEstado(estado);

  return nuevosObjetivos;

}

export function eliminarObjetivoEstrategico(
  objetivos,
  objetivoId
) {
  return objetivos.filter(
    (objetivo) => objetivo.id !== objetivoId
  );
}

const indicadoresKnowledgeIniciales = [
  {
    id: "IND-001",
    nombre: "Disponibilidad Operativa",
    objetivo: "Garantizar continuidad operacional",
    unidad: "%",
    frecuencia: "Mensual",
    estado: "Publicado",
    valor: "98.4%",
  },
  {
    id: "IND-002",
    nombre: "Cumplimiento de Mantenimiento",
    objetivo: "Optimizar la gestión de activos",
    unidad: "%",
    frecuencia: "Mensual",
    estado: "Publicado",
    valor: "94.7%",
  },
  {
    id: "IND-003",
    nombre: "Tiempo Promedio de Resolución",
    objetivo: "Mejorar la eficiencia operativa",
    unidad: "Horas",
    frecuencia: "Semanal",
    estado: "Publicado",
    valor: "3.8 h",
  },
  {
    id: "IND-004",
    nombre: "Activos con Incidencias Críticas",
    objetivo: "Reducir riesgos operacionales",
    unidad: "Cantidad",
    frecuencia: "Diaria",
    estado: "Borrador",
    valor: "12",
  },
];

export function obtenerIndicadoresKnowledge() {

  const estado = obtenerEstado();

  if (estado.indicadores.length === 0) {

    estado.indicadores =
      indicadoresKnowledgeIniciales.map(
        (indicador) => ({
          ...indicador,
        })
      );

    guardarEstado(estado);

  }

  return estado.indicadores.map(
    (indicador) => ({
      ...indicador,
    })
  );

}

export function crearIndicadorKnowledge(
  indicadores,
  datosIndicador
) {
  const consecutivo =
    indicadores.reduce((mayorConsecutivo, indicador) => {
      const numeroId = Number(
        indicador.id.replace("IND-", "")
      );

      return Number.isNaN(numeroId)
        ? mayorConsecutivo
        : Math.max(mayorConsecutivo, numeroId);
    }, 0) + 1;

  return {
    id: `IND-${String(consecutivo).padStart(3, "0")}`,
    ...datosIndicador,
  };
}

export function actualizarIndicadorKnowledge(
  indicadores,
  indicadorActualizado
) {

  const nuevosIndicadores =
    indicadores.map((indicador) =>
      indicador.id === indicadorActualizado.id
        ? {
            ...indicador,
            ...indicadorActualizado,
          }
        : indicador
    );

  const estado = obtenerEstado();

  estado.indicadores = nuevosIndicadores;

  guardarEstado(estado);

  return nuevosIndicadores;

}

export function eliminarIndicadorKnowledge(
  indicadores,
  indicadorId
) {
  return indicadores.filter(
    (indicador) => indicador.id !== indicadorId
  );
}

const principiosNegocioIniciales = [
  {
    id: "PRN-001",
    nombre: "Trazabilidad de la información",
    descripcion:
      "Toda decisión operativa debe conservar evidencia sobre su origen, responsable y evolución.",
    categoria: "Gobernanza",
    alcance: "Corporativo",
    estado: "Vigente",
  },
  {
    id: "PRN-002",
    nombre: "Continuidad operacional",
    descripcion:
      "La gestión de activos debe priorizar la disponibilidad y continuidad de los servicios críticos.",
    categoria: "Operación",
    alcance: "Activos",
    estado: "Vigente",
  },
  {
    id: "PRN-003",
    nombre: "Decisiones basadas en indicadores",
    descripcion:
      "Las decisiones estratégicas deben sustentarse en mediciones verificables y objetivos definidos.",
    categoria: "Estrategia",
    alcance: "Corporativo",
    estado: "Vigente",
  },
  {
    id: "PRN-004",
    nombre: "Prevención del riesgo operativo",
    descripcion:
      "Los eventos con impacto potencial deben identificarse y evaluarse antes de afectar la operación.",
    categoria: "Riesgo",
    alcance: "Operación",
    estado: "Vigente",
  },
  {
    id: "PRN-005",
    nombre: "Responsabilidad sobre los activos",
    descripcion:
      "Todo activo administrado debe conservar una asignación organizacional y un responsable identificable.",
    categoria: "Gobernanza",
    alcance: "Activos",
    estado: "Vigente",
  },
  {
    id: "PRN-006",
    nombre: "Revisión periódica del conocimiento",
    descripcion:
      "Los criterios empresariales deben revisarse periódicamente para conservar su vigencia.",
    categoria: "Conocimiento",
    alcance: "Knowledge Studio",
    estado: "Borrador",
  },
];

export function obtenerPrincipiosNegocio() {

  const estado = obtenerEstado();

  if (estado.principios.length === 0) {

    estado.principios =
      principiosNegocioIniciales.map(
        (principio) => ({
          ...principio,
        })
      );

    guardarEstado(estado);

  }

  return estado.principios.map(
    (principio) => ({
      ...principio,
    })
  );

}

export function crearPrincipioNegocio(
  principios,
  datosPrincipio
) {
  const consecutivo =
    principios.reduce(
      (mayorConsecutivo, principio) => {
        const numeroId = Number(
          principio.id.replace("PRN-", "")
        );

        return Number.isNaN(numeroId)
          ? mayorConsecutivo
          : Math.max(
              mayorConsecutivo,
              numeroId
            );
      },
      0
    ) + 1;

  return {
    id: `PRN-${String(consecutivo).padStart(
      3,
      "0"
    )}`,
    ...datosPrincipio,
  };
}

export function actualizarPrincipioNegocio(
  principios,
  principioActualizado
) {

  const nuevosPrincipios =
    principios.map((principio) =>
      principio.id === principioActualizado.id
        ? {
            ...principio,
            ...principioActualizado,
          }
        : principio
    );

  const estado = obtenerEstado();

  estado.principios = nuevosPrincipios;

  guardarEstado(estado);

  return nuevosPrincipios;

}

export function eliminarPrincipioNegocio(
  principios,
  principioId
) {

  const nuevosPrincipios =
    principios.filter(
      (principio) =>
        principio.id !== principioId
    );

  const estado = obtenerEstado();

  estado.principios = nuevosPrincipios;

  guardarEstado(estado);

  return nuevosPrincipios;

}

const reglasKnowledgeIniciales = [
  {
    id: "RGL-001",
    nombre: "Evaluar disponibilidad crítica",
    descripcion:
      "Genera una evaluación cuando la disponibilidad de un activo crítico desciende por debajo del umbral definido.",
    evento: "Indicador actualizado",
    condicion: "Disponibilidad < 95%",
    accion: "Generar alerta crítica",
    estado: "Activa",
  },
  {
    id: "RGL-002",
    nombre: "Detectar mantenimiento vencido",
    descripcion:
      "Identifica activos cuyo mantenimiento programado ha superado la fecha establecida.",
    evento: "Actividad vencida",
    condicion: "Fecha actual > fecha límite",
    accion: "Crear alerta operativa",
    estado: "Activa",
  },
  {
    id: "RGL-003",
    nombre: "Validar incidencias recurrentes",
    descripcion:
      "Evalúa la recurrencia de incidencias registradas sobre un mismo activo durante un periodo determinado.",
    evento: "Actividad registrada",
    condicion: "Incidencias >= 3 en 30 días",
    accion: "Escalar evaluación",
    estado: "Activa",
  },
  {
    id: "RGL-004",
    nombre: "Controlar activos sin responsable",
    descripcion:
      "Detecta activos operativos que no tienen una asignación organizacional o responsable vigente.",
    evento: "Activo actualizado",
    condicion: "Responsable no definido",
    accion: "Solicitar asignación",
    estado: "Activa",
  },
  {
    id: "RGL-005",
    nombre: "Evaluar cumplimiento estratégico",
    descripcion:
      "Compara el valor actual de los indicadores estratégicos con las metas definidas en Knowledge Studio.",
    evento: "Indicador publicado",
    condicion: "Valor actual < meta",
    accion: "Registrar desviación",
    estado: "Activa",
  },
  {
    id: "RGL-006",
    nombre: "Revisión de reglas sin ejecución",
    descripcion:
      "Identifica reglas activas que no han sido evaluadas durante el periodo de revisión configurado.",
    evento: "Revisión periódica",
    condicion: "Sin ejecución durante 30 días",
    accion: "Solicitar revisión",
    estado: "Borrador",
  },
];

export function obtenerReglasKnowledge() {

  const estado = obtenerEstado();

  if (estado.reglas.length === 0) {

    estado.reglas =
      reglasKnowledgeIniciales.map(
        (regla) => ({
          ...regla,
        })
      );

    guardarEstado(estado);

  }

  return estado.reglas.map(
    (regla) => ({
      ...regla,
    })
  );

}

export function crearReglaKnowledge(
  reglas,
  datosRegla
) {
  const consecutivo =
    reglas.reduce((mayorConsecutivo, regla) => {
      const numeroId = Number(
        regla.id.replace("RGL-", "")
      );

      return Number.isNaN(numeroId)
        ? mayorConsecutivo
        : Math.max(mayorConsecutivo, numeroId);
    }, 0) + 1;

  return {
    id: `RGL-${String(consecutivo).padStart(3, "0")}`,
    ...datosRegla,
  };
}

export function actualizarReglaKnowledge(
  reglas,
  reglaActualizada
) {

  const nuevasReglas =
    reglas.map((regla) =>
      regla.id === reglaActualizada.id
        ? {
            ...regla,
            ...reglaActualizada,
          }
        : regla
    );

  const estado = obtenerEstado();

  estado.reglas = nuevasReglas;

  guardarEstado(estado);

  return nuevasReglas;

}

export function eliminarReglaKnowledge(
  reglas,
  reglaId
) {

  const nuevasReglas =
    reglas.filter(
      (regla) =>
        regla.id !== reglaId
    );

  const estado = obtenerEstado();

  estado.reglas = nuevasReglas;

  guardarEstado(estado);

  return nuevasReglas;

}