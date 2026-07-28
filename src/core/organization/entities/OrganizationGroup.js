/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class OrganizationGroup {
  constructor({
    id,
    code,
    name,
    description = "",
    businessProfile = null,
    farms = [],
    active = true,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!id) throw new Error("El id del grupo es obligatorio.");
    if (!code) throw new Error("El código del grupo es obligatorio.");
    if (!name) throw new Error("El nombre del grupo es obligatorio.");

    this.id = id;
    this.code = code;
    this.name = name.trim();
    this.description = description;

    this.businessProfile = businessProfile;
    this.farms = farms;

    this.active = active;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  addFarm(farm) {
    if (!farm) {
      throw new Error("La finca es obligatoria.");
    }

    if (!farm.active) {
      throw new Error("No se puede asociar una finca inactiva.");
    }

    const exists = this.farms.some(item => item.id === farm.id);

    if (exists) {
      throw new Error("La finca ya pertenece al grupo empresarial.");
    }

    this.farms.push(farm);

    this.touch();
  }

  removeFarm(farmId) {
    this.farms = this.farms.filter(farm => farm.id !== farmId);

    this.touch();
  }

  updateBusinessProfile(profile) {
    if (!profile) {
      throw new Error("El perfil empresarial es obligatorio.");
    }

    this.businessProfile = profile;

    this.touch();
  }

  activate() {
    this.active = true;

    this.touch();
  }

  deactivate() {
    this.active = false;

    this.touch();
  }

  touch() {
    this.updatedAt = new Date();
  }
}