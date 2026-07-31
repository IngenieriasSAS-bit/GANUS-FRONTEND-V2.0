/**
 * ==========================================================
 * Use Case: CreateFarm
 * Módulo: Organización
 *
 * Responsabilidad:
 * Crear una entidad Finca válida a partir de un DTO.
 * ==========================================================
 */

export class CreateFarm {

    execute(farm) {

        if (!farm) {

            throw new Error(
                "La información de la finca es obligatoria."
            );

        }

        if (!farm.name?.trim()) {

            throw new Error(
                "El nombre de la finca es obligatorio."
            );

        }

        if (!farm.organizationGroupId) {

    throw new Error(
        "La finca debe pertenecer a un Grupo Empresarial."
    );

}

        return {

            ...farm,

            id: crypto.randomUUID(),

            active: true,

            createdAt: new Date(),

            updatedAt: new Date(),

        };

    }

}