/**
 * ---------------------------------------------------------
 * Mapper: GroupMapper
 * Módulo: Organización
 *
 * Responsabilidad:
 * Convertir entre el modelo del Core y el modelo utilizado
 * por la interfaz gráfica (React).
 * ---------------------------------------------------------
 */

export function toDomain(datosFormulario) {
  return {
    id: crypto.randomUUID(),
    code: `GRP-${Date.now()}`,
    name: datosFormulario.nombre.trim(),
    description: datosFormulario.descripcion?.trim() || "",
    active: datosFormulario.estado === "Activo",
    businessProfile: {
    sector: "",
    industry: "",
    businessType: "",
    productionModel: "",
    description: "",
    strategicObjectives: [],
    active: true,
},
    farms: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function toViewModel(grupoDominio) {
  return {
    id: grupoDominio.id,

    nombre: grupoDominio.name,

    descripcion: grupoDominio.description,

    sector:
        grupoDominio.businessProfile?.sector ?? "",

    industria:
        grupoDominio.businessProfile?.industry ?? "",

    tipoNegocio:
        grupoDominio.businessProfile?.businessType ?? "",

    modeloProduccion:
        grupoDominio.businessProfile?.productionModel ?? "",

    estado:
        grupoDominio.active ? "Activo" : "Inactivo",

    fincas:
        grupoDominio.farms?.length ?? 0,
};
}