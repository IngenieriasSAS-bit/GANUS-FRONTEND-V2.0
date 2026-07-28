import { OrganizationException } from "./OrganizationException";

export class GroupAlreadyExistsException extends OrganizationException {
  constructor(code) {
    super(`Ya existe un Grupo Empresarial con el código '${code}'.`);
    this.name = "GroupAlreadyExistsException";
  }
}