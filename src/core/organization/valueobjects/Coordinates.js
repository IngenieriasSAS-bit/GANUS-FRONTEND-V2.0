/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 * Value Object: Coordenadas
 */

export class Coordinates {
  constructor({
    latitude,
    longitude,
    altitude = null,
  }) {
    if (latitude === undefined || latitude === null) {
      throw new Error("La latitud es obligatoria.");
    }

    if (longitude === undefined || longitude === null) {
      throw new Error("La longitud es obligatoria.");
    }

    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitud inválida.");
    }

    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitud inválida.");
    }

    this.latitude = Number(latitude);
    this.longitude = Number(longitude);
    this.altitude = altitude;

    Object.freeze(this);
  }

  toArray() {
    return [
      this.latitude,
      this.longitude,
    ];
  }
}