/**
 * ---------------------------------------------------------
 * Mapper: FarmMapper
 * Módulo: Organización
 *
 * Responsabilidad:
 * Convertir entre:
 *
 * Frontend (React)
 *        ⇅
 * Dominio (Core)
 * ---------------------------------------------------------
 */

/**
 * Convierte el formulario del Frontend
 * al DTO que utiliza el Core.
 */
export function toDomain(datosFormulario, grupoId) {

    return {

        id: crypto.randomUUID(),

        code: `FIN-${Date.now()}`,

        name: datosFormulario.nombre.trim(),

        organizationGroupId: grupoId,

        address: {

    direccion: datosFormulario.direccion?.trim() ?? "",

    municipio: datosFormulario.municipio.trim(),

    departamento: datosFormulario.departamento.trim(),

},

coordinates: {

    latitud: datosFormulario.latitud
        ? Number(datosFormulario.latitud)
        : null,

    longitud: datosFormulario.longitud
        ? Number(datosFormulario.longitud)
        : null,

},

businessProfile: {

    negocio: datosFormulario.negocio?.trim() ?? "",

    sector: datosFormulario.sector?.trim() ?? "",

    industria: datosFormulario.industria?.trim() ?? "",

},

        active:
            datosFormulario.estado === "Activo",

        createdAt: new Date(),

        updatedAt: new Date(),

    };

}

/**
 * Convierte la Entidad del Core
 * al modelo utilizado por React.
 */
export function toViewModel(finca, grupoNombre = "") {

    return {

    id: finca.id,

    nombre: finca.name,

    grupoEmpresarial: grupoNombre,

    direccion:
        finca.address?.direccion ?? "",

    municipio:
        finca.address?.municipio ?? "",

    departamento:
        finca.address?.departamento ?? "",

    latitud:
        finca.coordinates?.latitud ?? "",

    longitud:
        finca.coordinates?.longitud ?? "",

    negocio:
        finca.businessProfile?.negocio ?? "",

    sector:
        finca.businessProfile?.sector ?? "",

    industria:
        finca.businessProfile?.industria ?? "",

    estado:
        finca.active
            ? "Activo"
            : "Inactivo",

};

}