/**
 * GANUS Enterprise Platform
 * Organization Base Exception
 */

export class OrganizationException extends Error {
  constructor(message) {
    super(message);
    this.name = "OrganizationException";
  }
}