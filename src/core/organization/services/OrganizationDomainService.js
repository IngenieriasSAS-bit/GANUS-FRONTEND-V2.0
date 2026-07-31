/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 * Servicio de Dominio
 */

export class OrganizationDomainService {
  /**
   * Verifica que el código del grupo sea único.
   * @param {string} code
   * @param {Array} groups
   */
  static validateUniqueGroupCode(code, groups = []) {
    const exists = groups.some(group => group.code === code);

    if (exists) {
      throw new Error(
        `Ya existe un Grupo Empresarial con el código '${code}'.`
      );
    }

    return true;
  }

  /**
   * Verifica que el nombre del grupo sea único.
   * @param {string} name
   * @param {Array} groups
   */
  static validateUniqueGroupName(name, groups = []) {
    const exists = groups.some(
      group => group.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (exists) {
      throw new Error(
        `Ya existe un Grupo Empresarial con el nombre '${name}'.`
      );
    }

    return true;
  }

  /**
   * Asigna una finca a un grupo empresarial.
   * @param {OrganizationGroup} group
   * @param {Farm} farm
   */
  static assignFarm(group, farm) {
    if (!group) {
      throw new Error("El grupo empresarial es obligatorio.");
    }

    if (!farm) {
      throw new Error("La finca es obligatoria.");
    }

    const exists = group.farms.some(item => item.id === farm.id);

    if (exists) {
      throw new Error("La finca ya pertenece al grupo empresarial.");
    }

    group.addFarm(farm);

    return group;
  }

  /**
   * Registra o actualiza el perfil empresarial.
   * @param {OrganizationGroup} group
   * @param {BusinessProfile} profile
   */
  static registerBusinessProfile(group, profile) {
    if (!group) {
      throw new Error("El grupo empresarial es obligatorio.");
    }

    if (!profile) {
      throw new Error("El perfil empresarial es obligatorio.");
    }

    group.updateBusinessProfile(profile);

    return group;
  }

  /**
   * Verifica que el código del proceso sea único.
   * @param {string} code
   * @param {Array} processes
   */
  static validateUniqueProcessCode(code, processes = []) {

    const exists = processes.some(
      process => process.code === code
    );

    if (exists) {
      throw new Error(
        `Ya existe un Proceso Empresarial con el código '${code}'.`
      );
    }

    return true;

  }

  /**
   * Verifica que el nombre del proceso sea único.
   * @param {string} name
   * @param {Array} processes
   */
  static validateUniqueProcessName(name, processes = []) {

    const exists = processes.some(
      process =>
        process.name.trim().toLowerCase() ===
        name.trim().toLowerCase()
    );

    if (exists) {
      throw new Error(
        `Ya existe un Proceso Empresarial con el nombre '${name}'.`
      );
    }

    return true;

  }

  /**
   * Verifica que el código del tipo de actividad sea único.
   * @param {string} code
   * @param {Array} activityTypes
   */
  static validateUniqueActivityTypeCode(code, activityTypes = []) {

    const exists = activityTypes.some(
      activityType => activityType.code === code
    );

    if (exists) {
      throw new Error(
        `Ya existe un Tipo de Actividad con el código '${code}'.`
      );
    }

    return true;

  }

  /**
   * Verifica que el nombre del tipo de actividad sea único.
   * @param {string} name
   * @param {Array} activityTypes
   */
  static validateUniqueActivityTypeName(name, activityTypes = []) {

    const exists = activityTypes.some(
      activityType =>
        activityType.name.trim().toLowerCase() ===
        name.trim().toLowerCase()
    );

    if (exists) {
      throw new Error(
        `Ya existe un Tipo de Actividad con el nombre '${name}'.`
      );
    }

    return true;

  }

}
