/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Caso de Uso
 * Asignar finca a grupo
 */

import { OrganizationDomainService } from "../services/OrganizationDomainService";

export class AssignFarmToGroup {

  execute(group, farm) {

    return OrganizationDomainService.assignFarm(
      group,
      farm
    );

  }

}