/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 * Value Object: Dirección
 */

export class Address {
  constructor({
    country,
    department,
    city,
    municipality = "",
    village = "",
    neighborhood = "",
    line1,
    line2 = "",
    postalCode = "",
  }) {
    if (!country) throw new Error("El país es obligatorio.");
    if (!department) throw new Error("El departamento es obligatorio.");
    if (!city) throw new Error("La ciudad es obligatoria.");
    if (!line1) throw new Error("La dirección principal es obligatoria.");

    this.country = country;
    this.department = department;
    this.city = city;
    this.municipality = municipality;
    this.village = village;
    this.neighborhood = neighborhood;
    this.line1 = line1;
    this.line2 = line2;
    this.postalCode = postalCode;

    Object.freeze(this);
  }

  toString() {
    return [
      this.line1,
      this.line2,
      this.neighborhood,
      this.village,
      this.municipality,
      this.city,
      this.department,
      this.country,
      this.postalCode,
    ]
      .filter(Boolean)
      .join(", ");
  }
}