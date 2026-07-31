/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Caso de Uso
 * Crear Tipo de Actividad
 */

import { ActivityType } from "../entities/ActivityType";
import { OrganizationDomainService } from "../services/OrganizationDomainService";

export class CreateActivityType {

  /**
   * Ejecuta el caso de uso.
   * @param {Object} data
   * @param {Array<ActivityType>} existingActivityTypes
   * @returns {ActivityType}
   */
  execute(data, existingActivityTypes = []) {

    OrganizationDomainService.validateUniqueActivityTypeCode(
      data.code,
      existingActivityTypes
    );

    OrganizationDomainService.validateUniqueActivityTypeName(
      data.name,
      existingActivityTypes
    );

    return new ActivityType(data);

  }

}