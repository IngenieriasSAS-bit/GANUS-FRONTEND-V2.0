import { OrganizationException } from "./OrganizationException";

export class FarmAlreadyExistsException extends OrganizationException {
  constructor(code) {
    super(`Ya existe una finca con el código '${code}'.`);
    this.name = "FarmAlreadyExistsException";
  }
}