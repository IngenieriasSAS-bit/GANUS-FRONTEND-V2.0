/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class User {
  constructor({
    id,
    firstName,
    lastName,
    email,
    roleId,
    farmId = null,
    active = true,
  }) {
    if (!id) throw new Error("El id es obligatorio.");
    if (!firstName) throw new Error("El nombre es obligatorio.");
    if (!lastName) throw new Error("El apellido es obligatorio.");
    if (!email) throw new Error("El correo es obligatorio.");
    if (!roleId) throw new Error("El rol es obligatorio.");

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roleId = roleId;
    this.farmId = farmId;
    this.active = active;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}