/**
 * GANUS Enterprise Platform
 * Core Empresarial
 * Dominio: Organización
 */

export class BusinessProfile {
  constructor({
    sector,
    industry,
    businessType,
    productionModel,
    description = "",
    strategicObjectives = [],
    active = true,
  }) {
    if (!sector) throw new Error("El sector es obligatorio.");
    if (!industry) throw new Error("La industria es obligatoria.");
    if (!businessType) throw new Error("El tipo de negocio es obligatorio.");

    this.sector = sector;
    this.industry = industry;
    this.businessType = businessType;
    this.productionModel = productionModel;

    this.description = description;
    this.strategicObjectives = strategicObjectives;

    this.active = active;
  }

  addStrategicObjective(objective) {
    if (!objective) {
      throw new Error("El objetivo estratégico es obligatorio.");
    }

    this.strategicObjectives.push(objective);
  }

  removeStrategicObjective(objective) {
    this.strategicObjectives =
      this.strategicObjectives.filter(item => item !== objective);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}