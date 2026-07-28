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

            municipio: datosFormulario.municipio.trim(),

            departamento: datosFormulario.departamento.trim(),

        },

        coordinates: null,

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

        municipio:
            finca.address?.municipio ?? "",

        departamento:
            finca.address?.departamento ?? "",

        estado:
            finca.active
                ? "Activo"
                : "Inactivo",

    };

}