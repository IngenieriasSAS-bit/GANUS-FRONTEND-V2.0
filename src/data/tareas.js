/**
 * ---------------------------------------------------------
 * Datos iniciales: Tareas Operativas
 * Módulo: GANUS Tareas
 *
 * Responsabilidad:
 * Definir tareas demostrativas para la versión MVP.
 *
 * Principio GANUS:
 * Las tareas representan acciones planificadas pendientes
 * de ejecución y pueden estar asociadas a un activo.
 * ---------------------------------------------------------
 */

const tareasIniciales = [
  {
    id: 1,
    activoId: "ACT-001",
    titulo: "Verificar condición corporal",
    descripcion:
      "Realizar revisión visual y registrar cualquier novedad operativa identificada.",
    fechaCreacion: "2026-07-01",
    fechaVencimiento: "2026-07-06",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: 2,
    activoId: "ACT-004",
    titulo: "Revisión de calibración",
    descripcion:
      "Validar la calibración operativa de la báscula principal antes del siguiente ciclo de pesaje.",
    fechaCreacion: "2026-07-02",
    fechaVencimiento: "2026-07-08",
    prioridad: "Media",
    estado: "En progreso",
  },
  {
    id: 3,
    activoId: "ACT-003",
    titulo: "Inspeccionar condición del potrero",
    descripcion:
      "Revisar el estado general del espacio productivo y registrar novedades relevantes.",
    fechaCreacion: "2026-07-03",
    fechaVencimiento: "2026-07-10",
    prioridad: "Media",
    estado: "Pendiente",
  },
  {
    id: 4,
    activoId: "ACT-002",
    titulo: "Validar identificación RFID",
    descripcion:
      "Confirmar la lectura e identificación correcta del activo mediante el identificador registrado.",
    fechaCreacion: "2026-07-04",
    fechaVencimiento: "2026-07-12",
    prioridad: "Baja",
    estado: "Completada",
  },
];

export default tareasIniciales;