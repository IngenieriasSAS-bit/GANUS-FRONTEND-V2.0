/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 * Value Object: Tipo de Negocio
 */

export const BusinessTypes = Object.freeze({
  BEEF: "BEEF",
  DAIRY: "DAIRY",
  DUAL_PURPOSE: "DUAL_PURPOSE",
  BREEDING: "BREEDING",
  FATTENING: "FATTENING",
  GENETICS: "GENETICS",
  MIXED: "MIXED",
});

export class BusinessType {
  constructor(type) {
    if (!Object.values(BusinessTypes).includes(type)) {
      throw new Error("Tipo de negocio no válido.");
    }

    this.value = type;

    Object.freeze(this);
  }

  toString() {
    return this.value;
  }
}