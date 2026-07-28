/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Caso de Uso
 * Registrar Perfil Empresarial
 */

import { OrganizationDomainService } from "../services/OrganizationDomainService";

export class RegisterBusinessProfile {

  execute(group, profile) {

    return OrganizationDomainService.registerBusinessProfile(
      group,
      profile
    );

  }

}