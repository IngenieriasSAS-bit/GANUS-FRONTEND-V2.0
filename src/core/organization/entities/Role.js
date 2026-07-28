/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class Role {
  constructor({
    id,
    code,
    name,
    permissions = [],
    active = true,
  }) {
    if (!id) throw new Error("El id es obligatorio.");
    if (!code) throw new Error("El código es obligatorio.");
    if (!name) throw new Error("El nombre es obligatorio.");

    this.id = id;
    this.code = code;
    this.name = name;
    this.permissions = permissions;
    this.active = active;
  }

  addPermission(permission) {
    if (!permission) return;
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission) {
    this.permissions = this.permissions.filter(p => p !== permission);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}