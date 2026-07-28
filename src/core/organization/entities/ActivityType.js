/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class ActivityType {
  constructor({
    id,
    code,
    name,
    processId,
    description = "",
    active = true,
  }) {
    if (!id) throw new Error("El id es obligatorio.");
    if (!code) throw new Error("El código es obligatorio.");
    if (!name) throw new Error("El nombre es obligatorio.");
    if (!processId) throw new Error("Debe pertenecer a un proceso.");

    this.id = id;
    this.code = code;
    this.name = name;
    this.processId = processId;
    this.description = description;
    this.active = active;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}