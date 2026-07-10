const STORAGE_KEY = "ganus_field_engine_responses";

const readResponses = () => {
  try {
    const storedResponses = localStorage.getItem(STORAGE_KEY);

    if (!storedResponses) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

      return [];
    }

    const parsedResponses = JSON.parse(storedResponses);

    return Array.isArray(parsedResponses)
      ? parsedResponses
      : [];
  } catch (error) {
    console.error(
      "Field Engine no pudo leer las respuestas almacenadas:",
      error
    );

    return [];
  }
};

const writeResponses = (responses) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(responses)
  );

  return responses;
};

export const getFieldEngineResponses = () =>
  readResponses();

export const getFieldEngineResponseById = (
  responseId
) =>
  getFieldEngineResponses().find(
    (response) => response.id === responseId
  ) || null;

export const getFieldEngineResponsesByTemplate = (
  templateId
) =>
  getFieldEngineResponses().filter(
    (response) => response.templateId === templateId
  );

export const getFieldEngineResponsesByContext = ({
  consumerModule,
  contextType,
  contextValue,
}) =>
  getFieldEngineResponses().filter((response) => {
    const matchesConsumerModule = consumerModule
      ? response.consumerModule === consumerModule
      : true;

    const matchesContextType = contextType
      ? response.contextType === contextType
      : true;

    const matchesContextValue = contextValue
      ? response.contextValue === contextValue
      : true;

    return (
      matchesConsumerModule &&
      matchesContextType &&
      matchesContextValue
    );
  });

export const createFieldEngineResponse = ({
  template,
  values,
  context = {},
}) => {
  if (!template?.id) {
    throw new Error(
      "No se puede registrar una respuesta sin plantilla."
    );
  }

  if (!values || typeof values !== "object") {
    throw new Error(
      "La respuesta del formulario no contiene valores válidos."
    );
  }

  const responses = getFieldEngineResponses();
  const createdAt = new Date().toISOString();

  const response = {
    id: crypto.randomUUID(),

    templateId: template.id,
    templateName: template.name,
    templateVersion: template.version,

    consumerModule: template.consumerModule,
    contextType: template.contextType,
    contextValue: template.contextValue,

    values: structuredClone(values),

    context: {
      primaryAsset: context.primaryAsset || null,
      secondaryAsset: context.secondaryAsset || null,
      responsible: context.responsible || null,
      location: context.location || null,
      eventDate: context.eventDate || createdAt,
      recordCode:
        context.recordCode ||
        `GANUS-${Date.now()}`,
    },

    status: "completed",

    createdAt,
    updatedAt: createdAt,
  };

  writeResponses([
    response,
    ...responses,
  ]);

  return response;
};

export const updateFieldEngineResponse = (
  responseId,
  changes
) => {
  const responses = getFieldEngineResponses();

  const currentResponse = responses.find(
    (response) => response.id === responseId
  );

  if (!currentResponse) {
    throw new Error(
      "El registro dinámico seleccionado no existe."
    );
  }

  const updatedResponse = {
    ...currentResponse,
    ...structuredClone(changes),
    id: currentResponse.id,
    templateId: currentResponse.templateId,
    templateVersion: currentResponse.templateVersion,
    createdAt: currentResponse.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const nextResponses = responses.map((response) =>
    response.id === responseId
      ? updatedResponse
      : response
  );

  writeResponses(nextResponses);

  return updatedResponse;
};

export const deleteFieldEngineResponse = (
  responseId
) => {
  const responses = getFieldEngineResponses();

  const exists = responses.some(
    (response) => response.id === responseId
  );

  if (!exists) {
    throw new Error(
      "El registro dinámico seleccionado no existe."
    );
  }

  const nextResponses = responses.filter(
    (response) => response.id !== responseId
  );

  writeResponses(nextResponses);

  return true;
};

export const clearFieldEngineResponses = () => {
  writeResponses([]);

  return [];
};