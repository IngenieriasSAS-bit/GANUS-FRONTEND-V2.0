/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Caso de Uso
 * Crear Grupo Empresarial
 */

import { OrganizationGroup } from "../entities/OrganizationGroup";
import { OrganizationDomainService } from "../services/OrganizationDomainService";

export class CreateOrganizationGroup {
  /**
   * Ejecuta el caso de uso.
   * @param {Object} data
   * @param {Array<OrganizationGroup>} existingGroups
   * @returns {OrganizationGroup}
   */
  execute(data, existingGroups = []) {

    OrganizationDomainService.validateUniqueGroupCode(
      data.code,
      existingGroups
    );

    OrganizationDomainService.validateUniqueGroupName(
      data.name,
      existingGroups
    );

    return new OrganizationGroup(data);
  }
}