import {
  DEFAULT_CATALOGS,
  TEMPLATE_STATES,
  createTemplate,
} from "../constants/fieldEngineConstants";

const STORAGE_KEYS = {
  templates: "ganus_field_engine_templates",
  catalogs: "ganus_field_engine_catalogs",
  assetTypes: "ganus_field_engine_asset_types",
  activityTypes: "ganus_field_engine_activity_types",
};

const DEFAULT_ASSET_TYPES = [
  {
    id: "asset-equipment",
    name: "Equipo",
    code: "EQU",
    description: "Equipos y recursos técnicos de la organización.",
    active: true,
  },
  {
    id: "asset-vehicle",
    name: "Vehículo",
    code: "VEH",
    description: "Vehículos y recursos de transporte.",
    active: true,
  },
  {
    id: "asset-infrastructure",
    name: "Infraestructura",
    code: "INF",
    description: "Infraestructura física administrada por la organización.",
    active: true,
  },
];

const DEFAULT_ACTIVITY_TYPES = [
  {
    id: "activity-inspection",
    name: "Inspección",
    code: "INS",
    description: "Verificación estructurada del estado de un activo o proceso.",
    active: true,
  },
  {
    id: "activity-maintenance",
    name: "Mantenimiento",
    code: "MAN",
    description: "Actividad de mantenimiento preventivo o correctivo.",
    active: true,
  },
  {
    id: "activity-control",
    name: "Control operativo",
    code: "CON",
    description: "Registro periódico de variables operativas.",
    active: true,
  },
];

const readStorage = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Field Engine no pudo leer ${key}:`, error);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const getFieldEngineTemplates = () =>
  readStorage(STORAGE_KEYS.templates, []);

export const getFieldEngineCatalogs = () =>
  readStorage(STORAGE_KEYS.catalogs, DEFAULT_CATALOGS);

export const getFieldEngineAssetTypes = () =>
  readStorage(STORAGE_KEYS.assetTypes, DEFAULT_ASSET_TYPES);

export const getFieldEngineActivityTypes = () =>
  readStorage(STORAGE_KEYS.activityTypes, DEFAULT_ACTIVITY_TYPES);

export const createFieldEngineTemplate = () => {
  const templates = getFieldEngineTemplates();
  const template = createTemplate();

  writeStorage(STORAGE_KEYS.templates, [template, ...templates]);

  return template;
};

export const saveFieldEngineTemplate = (template) => {
  if (template.state === TEMPLATE_STATES.PUBLISHED) {
    throw new Error(
      "Una versión publicada no puede modificarse. Debe crear una nueva versión."
    );
  }

  const templates = getFieldEngineTemplates();

  const updatedTemplate = {
    ...template,
    updatedAt: new Date().toISOString(),
  };

  const exists = templates.some((item) => item.id === template.id);

  const nextTemplates = exists
    ? templates.map((item) =>
        item.id === template.id ? updatedTemplate : item
      )
    : [updatedTemplate, ...templates];

  writeStorage(STORAGE_KEYS.templates, nextTemplates);

  return updatedTemplate;
};

export const cloneFieldEngineTemplate = (templateId) => {
  const templates = getFieldEngineTemplates();
  const sourceTemplate = templates.find((item) => item.id === templateId);

  if (!sourceTemplate) {
    throw new Error("La plantilla seleccionada no existe.");
  }

  const clonedTemplate = {
    ...structuredClone(sourceTemplate),
    id: crypto.randomUUID(),
    name: `${sourceTemplate.name} - Copia`,
    state: TEMPLATE_STATES.DRAFT,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
    history: [],
  };

  writeStorage(STORAGE_KEYS.templates, [
    clonedTemplate,
    ...templates,
  ]);

  return clonedTemplate;
};

export const createFieldEngineVersion = (templateId) => {
  const templates = getFieldEngineTemplates();
  const sourceTemplate = templates.find((item) => item.id === templateId);

  if (!sourceTemplate) {
    throw new Error("La plantilla seleccionada no existe.");
  }

  const newVersion = {
    ...structuredClone(sourceTemplate),
    id: crypto.randomUUID(),
    state: TEMPLATE_STATES.DRAFT,
    version: Number(sourceTemplate.version) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
    history: [
      ...(sourceTemplate.history || []),
      {
        id: crypto.randomUUID(),
        action: "version-created",
        version: Number(sourceTemplate.version) + 1,
        date: new Date().toISOString(),
      },
    ],
  };

  writeStorage(STORAGE_KEYS.templates, [
    newVersion,
    ...templates,
  ]);

  return newVersion;
};

export const publishFieldEngineTemplate = (templateId) => {
  const templates = getFieldEngineTemplates();
  const currentTemplate = templates.find((item) => item.id === templateId);

  if (!currentTemplate) {
    throw new Error("La plantilla seleccionada no existe.");
  }

  if (!currentTemplate.name.trim()) {
    throw new Error("La plantilla debe tener un nombre.");
  }

  if (!currentTemplate.contextValue.trim()) {
    throw new Error("Debe definir el contexto funcional de la plantilla.");
  }

  if (!currentTemplate.sections.length) {
    throw new Error("La plantilla debe contener al menos una sección.");
  }

  const totalFields = currentTemplate.sections.reduce(
    (total, section) => total + section.fields.length,
    0
  );

  if (!totalFields) {
    throw new Error("La plantilla debe contener al menos un campo.");
  }

  const publishedAt = new Date().toISOString();

  const nextTemplates = templates.map((template) => {
    if (template.id !== templateId) {
      return template;
    }

    return {
      ...template,
      state: TEMPLATE_STATES.PUBLISHED,
      publishedAt,
      updatedAt: publishedAt,
      history: [
        ...(template.history || []),
        {
          id: crypto.randomUUID(),
          action: "published",
          version: template.version,
          date: publishedAt,
        },
      ],
    };
  });

  writeStorage(STORAGE_KEYS.templates, nextTemplates);

  return nextTemplates.find((template) => template.id === templateId);
};

export const saveFieldEngineCatalogs = (catalogs) =>
  writeStorage(STORAGE_KEYS.catalogs, catalogs);

export const saveFieldEngineAssetTypes = (assetTypes) =>
  writeStorage(STORAGE_KEYS.assetTypes, assetTypes);

export const saveFieldEngineActivityTypes = (activityTypes) =>
  writeStorage(STORAGE_KEYS.activityTypes, activityTypes);

export const getPublishedFieldEngineTemplates = () =>
  getFieldEngineTemplates().filter(
    (template) => template.state === TEMPLATE_STATES.PUBLISHED
  );

export const getPublishedTemplateById = (templateId) =>
  getPublishedFieldEngineTemplates().find(
    (template) => template.id === templateId
  ) || null;