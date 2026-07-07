const alertasIniciales = [
  {
    id: 1,
    activoId: "ACT-004",
    tipoAlerta: "MANTENIMIENTO",
    prioridad: "Alta",
    titulo: "Mantenimiento próximo",
    descripcion:
      "La Báscula Principal requiere revisión preventiva.",
    fechaGeneracion: "2026-07-05",
    estado: "Pendiente",
  },
  {
    id: 2,
    activoId: "ACT-001",
    tipoAlerta: "SEGUIMIENTO",
    prioridad: "Media",
    titulo: "Seguimiento operativo",
    descripcion:
      "Revisar la evolución del último registro de peso.",
    fechaGeneracion: "2026-07-05",
    estado: "Pendiente",
  },
  {
    id: 3,
    activoId: "ACT-003",
    tipoAlerta: "INSPECCION",
    prioridad: "Baja",
    titulo: "Inspección programada",
    descripcion:
      "Validar nuevamente las condiciones generales del activo territorial.",
    fechaGeneracion: "2026-07-06",
    estado: "Pendiente",
  },
];

export default alertasIniciales;