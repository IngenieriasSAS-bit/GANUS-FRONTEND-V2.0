import {
  createField,
  createSection,
  TEMPLATE_STATES,
} from "../constants/fieldEngineConstants";

import {
  createFieldEngineTemplate,
  saveFieldEngineTemplate,
} from "./fieldEngineService";

const FORM_INTENT_KEYWORDS = [
  "formulario",
  "formato",
  "plantilla",
  "checklist",
  "lista de chequeo",
  "lista de verificacion",
  "lista de verificación",
  "registro para",
  "formulario para",
  "formato para",
  "crear formulario",
  "crear un formulario",
  "generar formulario",
  "generar un formulario",
  "necesito un formulario",
  "necesito formulario",
  "quiero un formulario",
  "diseñar formulario",
  "disenar formulario",
];

const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const createFieldKey = (name = "campo") => {
  const normalizedName = normalizeText(name)
    .replace(/[^a-z0-9\s_]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  return (
    normalizedName ||
    `campo_${Date.now()}`
  );
};

const detectFormContext = (message = "") => {
  const normalizedMessage = normalizeText(message);

  if (
    normalizedMessage.includes("maquinaria") ||
    normalizedMessage.includes("maquina") ||
    normalizedMessage.includes("equipo")
  ) {
    return {
      consumerModule: "inventory",
      contextType: "asset-type",
      contextValue: "asset-equipment",
      contextLabel: "Equipo",
      proposalType: "equipment-inspection",
    };
  }

  if (
    normalizedMessage.includes("vehiculo") ||
    normalizedMessage.includes("vehiculos")
  ) {
    return {
      consumerModule: "inventory",
      contextType: "asset-type",
      contextValue: "asset-vehicle",
      contextLabel: "Vehículo",
      proposalType: "vehicle-inspection",
    };
  }

  if (
    normalizedMessage.includes("mantenimiento")
  ) {
    return {
      consumerModule: "operation",
      contextType: "activity-type",
      contextValue: "activity-maintenance",
      contextLabel: "Mantenimiento",
      proposalType: "maintenance",
    };
  }

  if (
    normalizedMessage.includes("inspeccion") ||
    normalizedMessage.includes("inspeccionar") ||
    normalizedMessage.includes("verificacion") ||
    normalizedMessage.includes("verificar")
  ) {
    return {
      consumerModule: "operation",
      contextType: "activity-type",
      contextValue: "activity-inspection",
      contextLabel: "Inspección",
      proposalType: "inspection",
    };
  }

  return {
    consumerModule: "operation",
    contextType: "process",
    contextValue: "process-control",
    contextLabel: "Control operativo",
    proposalType: "operational-control",
  };
};

const createEquipmentInspectionProposal = (
  context
) => ({
  name: "Inspección de maquinaria",
  description:
    "Formulario para registrar la inspección operativa y el estado general de maquinaria o equipos.",

  context:
    "Control estructurado de condiciones operativas, novedades y evidencia asociada a maquinaria.",

    consumerModule: context.consumerModule,
  contextType: context.contextType,
  contextValue: context.contextValue,
  contextLabel: context.contextLabel,

  sections: [
    {
      name: "Identificación de la maquinaria",
      description:
        "Información principal del equipo inspeccionado.",

      fields: [
        {
          name: "Código de la maquinaria",
          type: "short-text",
          required: true,
          helpText:
            "Identificador interno del equipo o maquinaria.",
        },
        {
          name: "Activo relacionado",
          type: "related-asset",
          required: true,
          helpText:
            "Selecciona el activo asociado a la inspección.",
        },
        {
          name: "Fecha de inspección",
          type: "date",
          required: true,
          helpText:
            "Fecha efectiva en la que se realiza la inspección.",
        },
      ],
    },
    {
      name: "Condición operativa",
      description:
        "Validación del estado y funcionamiento del equipo.",

      fields: [
        {
          name: "Estado operativo",
          type: "list",
          required: true,
          catalogId: "catalog-status",
          helpText:
            "Clasifica el estado general observado durante la inspección.",
        },
        {
          name: "Equipo en funcionamiento",
          type: "boolean",
          required: true,
          helpText:
            "Indica si la maquinaria se encuentra en funcionamiento.",
        },
        {
          name: "Descripción de la condición",
          type: "long-text",
          required: true,
          helpText:
            "Describe las condiciones relevantes identificadas.",
        },
      ],
    },
    {
      name: "Novedades y evidencia",
      description:
        "Registro de hallazgos y soportes de la inspección.",

      fields: [
        {
          name: "Se identificaron novedades",
          type: "boolean",
          required: true,
          helpText:
            "Indica si se detectaron novedades durante la inspección.",
        },
        {
          name: "Detalle de novedades",
          type: "long-text",
          required: false,
          helpText:
            "Describe las novedades identificadas.",
        },
        {
          name: "Evidencia fotográfica",
          type: "image",
          required: false,
          helpText:
            "Adjunta evidencia visual relacionada con la inspección.",
        },
        {
          name: "Observaciones finales",
          type: "long-text",
          required: false,
          helpText:
            "Registra información complementaria de la inspección.",
        },
      ],
    },
  ],
});

const createGenericProposal = (
  message,
  context
) => ({
  name: "Formulario de control operativo",

  description:
    "Formulario generado por Advisory para estructurar una necesidad de captura operativa.",

  context: message,

    consumerModule: context.consumerModule,
  contextType: context.contextType,
  contextValue: context.contextValue,
  contextLabel: context.contextLabel,

  sections: [
    {
      name: "Información general",
      description:
        "Datos principales asociados al registro.",

      fields: [
        {
          name: "Código del registro",
          type: "short-text",
          required: true,
          helpText:
            "Identificador principal del registro.",
        },
        {
          name: "Fecha del registro",
          type: "date",
          required: true,
          helpText:
            "Fecha efectiva asociada al registro.",
        },
      ],
    },
    {
      name: "Detalle operativo",
      description:
        "Información relacionada con la situación registrada.",

      fields: [
        {
          name: "Descripción",
          type: "long-text",
          required: true,
          helpText:
            "Describe la situación o condición observada.",
        },
        {
          name: "Prioridad",
          type: "list",
          required: true,
          catalogId: "catalog-priority",
          helpText:
            "Selecciona el nivel de prioridad del registro.",
        },
        {
          name: "Observaciones",
          type: "long-text",
          required: false,
          helpText:
            "Registra información complementaria.",
        },
      ],
    },
  ],
});

export const detectarIntencionFormulario = (
  message = ""
) => {
  const normalizedMessage = normalizeText(message);

  if (!normalizedMessage) {
    return false;
  }

  return FORM_INTENT_KEYWORDS.some((keyword) =>
    normalizedMessage.includes(
      normalizeText(keyword)
    )
  );
};

export const generarPropuestaFormulario = (
  message = ""
) => {
  const context = detectFormContext(message);

  if (
    context.proposalType ===
    "equipment-inspection"
  ) {
    return createEquipmentInspectionProposal(
      context
    );
  }

  return createGenericProposal(
    message,
    context
  );
};

export const normalizarPropuestaFormulario = (
  proposal
) => {
  if (!proposal) {
    throw new Error(
      "No existe una propuesta de formulario para normalizar."
    );
  }

  const normalizedSections = (
    proposal.sections || []
  ).map((section, sectionIndex) => ({
    name:
      section.name ||
      `Sección ${sectionIndex + 1}`,

    description: section.description || "",

    fields: (section.fields || []).map(
      (field, fieldIndex) => ({
        name:
          field.name ||
          `Campo ${fieldIndex + 1}`,

        key:
          field.key ||
          createFieldKey(
            field.name ||
              `campo_${fieldIndex + 1}`
          ),

        type: field.type || "short-text",

        required: Boolean(field.required),

        helpText: field.helpText || "",

        defaultValue:
          field.defaultValue || "",

        placeholder:
          field.placeholder || "",

        captureMethods:
          Array.isArray(field.captureMethods) &&
          field.captureMethods.length
            ? field.captureMethods
            : ["manual"],

        catalogId: field.catalogId || "",

        validations: Array.isArray(
          field.validations
        )
          ? field.validations
          : [],

        visible: field.visible !== false,
      })
    ),
  }));

  if (!normalizedSections.length) {
    throw new Error(
      "La propuesta debe contener al menos una sección."
    );
  }

  const totalFields = normalizedSections.reduce(
    (total, section) =>
      total + section.fields.length,
    0
  );

  if (!totalFields) {
    throw new Error(
      "La propuesta debe contener al menos un campo."
    );
  }

  return {
    name:
      proposal.name ||
      "Formulario generado por Advisory",

    description: proposal.description || "",

    context: proposal.context || "",

    consumerModule:
      proposal.consumerModule || "operation",

    contextType:
      proposal.contextType || "process",

        contextValue:
      proposal.contextValue ||
      "process-control",

    contextLabel:
      proposal.contextLabel ||
      proposal.contextValue ||
      "Control operativo",

    sections: normalizedSections,
  };
};

export const crearBorradorDesdePropuesta = (
  proposal
) => {
  const normalizedProposal =
    normalizarPropuestaFormulario(proposal);

  const baseTemplate =
    createFieldEngineTemplate();

  const sections =
    normalizedProposal.sections.map(
      (proposedSection) => {
        const section = createSection(
          proposedSection.name
        );

        return {
          ...section,

          description:
            proposedSection.description,

          fields: proposedSection.fields.map(
            (proposedField) => {
              const field = createField(
                proposedField.type
              );

              return {
                ...field,

                name: proposedField.name,

                key: proposedField.key,

                required:
                  proposedField.required,

                helpText:
                  proposedField.helpText,

                defaultValue:
                  proposedField.defaultValue,

                placeholder:
                  proposedField.placeholder,

                captureMethods:
                  proposedField.captureMethods,

                catalogId:
                  proposedField.catalogId,

                validations:
                  proposedField.validations,

                visible:
                  proposedField.visible,
              };
            }
          ),
        };
      }
    );

  const draftTemplate = {
    ...baseTemplate,

    name: normalizedProposal.name,

    description:
      normalizedProposal.description,

    consumerModule:
      normalizedProposal.consumerModule,

    contextType:
      normalizedProposal.contextType,

    contextValue:
      normalizedProposal.contextValue,

    state: TEMPLATE_STATES.DRAFT,

    version: 1,

    publishedAt: null,

    sections,

    history: [
      ...(baseTemplate.history || []),

      {
        id: crypto.randomUUID(),

        action: "advisory-draft-created",

        version: 1,

        date: new Date().toISOString(),

        source: "advisory",

        context:
          normalizedProposal.context,
      },
    ],
  };

  return saveFieldEngineTemplate(
    draftTemplate
  );
};