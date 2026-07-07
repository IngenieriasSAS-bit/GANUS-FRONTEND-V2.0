/**
 * ---------------------------------------------------------
 * Datos iniciales: Inventario Maestro de Activos
 * Módulo: GANUS Inventario
 *
 * Responsabilidad:
 * Definir activos demostrativos para la versión MVP.
 *
 * Principio GANUS:
 * Inventario identifica activos.
 * Las actividades registran hechos sobre los activos.
 * ---------------------------------------------------------
 */

export const activosIniciales = [
  {
    id: "ACT-001",
    codigo: "GAN-0001",
    nombre: "Vaca 803",
    dominio: "Biológico",
    categoria: "Animal",
    tipo: "Bovino",
    subtipo: "Vaca",
    identificador: "9950001234569870",
    tipoIdentificador: "RFID",
    finca: "Finca El Paraíso",
    ubicacion: "Potrero Bajo",
    estado: "Activo",
  },
  {
    id: "ACT-002",
    codigo: "GAN-0002",
    nombre: "Toro Bravo",
    dominio: "Biológico",
    categoria: "Animal",
    tipo: "Bovino",
    subtipo: "Toro",
    identificador: "9950003216549870",
    tipoIdentificador: "RFID",
    finca: "Finca El Paraíso",
    ubicacion: "Potrero Norte",
    estado: "Activo",
  },
  {
    id: "ACT-003",
    codigo: "GAN-0003",
    nombre: "Potrero Bajo",
    dominio: "Territorial",
    categoria: "Espacio productivo",
    tipo: "Potrero",
    subtipo: "Pastoreo",
    identificador: "PTR-001",
    tipoIdentificador: "Código interno",
    finca: "Finca El Paraíso",
    ubicacion: "Sector Sur",
    estado: "Activo",
  },
  {
    id: "ACT-004",
    codigo: "GAN-0004",
    nombre: "Báscula Principal",
    dominio: "Equipamiento",
    categoria: "Equipo",
    tipo: "Báscula",
    subtipo: "Digital",
    identificador: "BAS-001",
    tipoIdentificador: "Código interno",
    finca: "Finca El Paraíso",
    ubicacion: "Corral Principal",
    estado: "Activo",
  },
];