import { OrganizationException } from "./OrganizationException";

export class BusinessProfileException extends OrganizationException {
  constructor(message) {
    super(message);
    this.name = "BusinessProfileException";
  }
}