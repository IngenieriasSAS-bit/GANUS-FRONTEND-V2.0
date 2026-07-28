/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class Farm {
  constructor({
    id,
    code,
    name,
    organizationGroupId,
    address = null,
    coordinates = null,
    active = true,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!id) throw new Error("El id de la finca es obligatorio.");
    if (!code) throw new Error("El código de la finca es obligatorio.");
    if (!name) throw new Error("El nombre de la finca es obligatorio.");

    if (!organizationGroupId) {
      throw new Error("La finca debe pertenecer a un Grupo Empresarial.");
    }

    this.id = id;
    this.code = code;
    this.name = name.trim();
    this.organizationGroupId = organizationGroupId;

    this.address = address;
    this.coordinates = coordinates;

    this.active = active;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateAddress(address) {
    if (!address) {
      throw new Error("La dirección es obligatoria.");
    }

    this.address = address;

    this.touch();
  }

  updateCoordinates(coordinates) {
    if (!coordinates) {
      throw new Error("Las coordenadas son obligatorias.");
    }

    this.coordinates = coordinates;

    this.touch();
  }

  rename(name) {
    if (!name || !name.trim()) {
      throw new Error("El nombre de la finca es obligatorio.");
    }

    this.name = name.trim();

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