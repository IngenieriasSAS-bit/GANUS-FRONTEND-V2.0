/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Caso de Uso
 * Crear Proceso Empresarial
 */

import { BusinessProcess } from "../entities/BusinessProcess";
import { OrganizationDomainService } from "../services/OrganizationDomainService";

export class CreateBusinessProcess {

  /**
   * Ejecuta el caso de uso.
   * @param {Object} data
   * @param {Array<BusinessProcess>} existingProcesses
   * @returns {BusinessProcess}
   */
  execute(data, existingProcesses = []) {

    OrganizationDomainService.validateUniqueProcessCode(
      data.code,
      existingProcesses
    );

    OrganizationDomainService.validateUniqueProcessName(
      data.name,
      existingProcesses
    );

    return new BusinessProcess(data);

  }

}