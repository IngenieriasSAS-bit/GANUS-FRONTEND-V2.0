/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class BusinessProcess {
  constructor({
    id,
    code,
    name,
    description = "",
    active = true,
  }) {
    if (!id) throw new Error("El id del proceso es obligatorio.");
    if (!code) throw new Error("El código del proceso es obligatorio.");
    if (!name) throw new Error("El nombre del proceso es obligatorio.");

    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.active = active;
  }

  rename(name) {
    if (!name) throw new Error("El nombre es obligatorio.");
    this.name = name;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}