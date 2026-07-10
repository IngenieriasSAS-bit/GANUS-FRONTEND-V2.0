import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import FieldEngineHeader from "../components/fieldengine/FieldEngineHeader";
import FieldEngineStats from "../components/fieldengine/FieldEngineStats";
import TemplateContextPanel from "../components/fieldengine/TemplateContextPanel";
import FieldTypePalette from "../components/fieldengine/FieldTypePalette";
import FormBuilderCanvas from "../components/fieldengine/FormBuilderCanvas";
import FieldPropertiesPanel from "../components/fieldengine/FieldPropertiesPanel";
import FieldValidationPanel from "../components/fieldengine/FieldValidationPanel";
import ContextKeysPanel from "../components/fieldengine/ContextKeysPanel";
import TemplateSchedulePanel from "../components/fieldengine/TemplateSchedulePanel";
import DynamicFormPreview from "../components/fieldengine/DynamicFormPreview";

import {
  createField,
  createSection,
} from "../constants/fieldEngineConstants";

import {
  createFieldEngineTemplate,
  getFieldEngineTemplates,
  getFieldEngineCatalogs,
  getFieldEngineAssetTypes,
  getFieldEngineActivityTypes,
  saveFieldEngineTemplate,
  publishFieldEngineTemplate,
} from "../services/fieldEngineService";

import "../styles/fieldengine/fieldEngine.css";

const getInitialFieldEngineState = (templateId) => {
  let storedTemplates = getFieldEngineTemplates();

  if (!storedTemplates.length) {
    const createdTemplate =
      createFieldEngineTemplate();

    storedTemplates = getFieldEngineTemplates();

    const firstSection =
      createdTemplate?.sections?.[0] || null;

    const firstField =
      firstSection?.fields?.[0] || null;

    return {
      templates: storedTemplates,
      template: createdTemplate,
      catalogs: getFieldEngineCatalogs(),
      assetTypes: getFieldEngineAssetTypes(),
      activityTypes: getFieldEngineActivityTypes(),
      selectedFieldId: firstField?.id || null,
      selectedSectionId: firstSection?.id || null,
    };
  }

  const activeTemplate =
    storedTemplates.find(
      (storedTemplate) =>
        storedTemplate.id === templateId
    ) || null;

  const firstSection =
    activeTemplate?.sections?.[0] || null;

  const firstField =
    firstSection?.fields?.[0] || null;

  return {
    templates: storedTemplates,
    template: activeTemplate,
    catalogs: getFieldEngineCatalogs(),
    assetTypes: getFieldEngineAssetTypes(),
    activityTypes: getFieldEngineActivityTypes(),
    selectedFieldId: firstField?.id || null,
    selectedSectionId: firstSection?.id || null,
  };
};

export default function FieldEngine() {
  const navigate = useNavigate();
  const { templateId } = useParams();

  const [initialState] = useState(() =>
    getInitialFieldEngineState(templateId)
  );

  const [templates, setTemplates] = useState(
    initialState.templates
  );

  const [template, setTemplate] = useState(
    initialState.template
  );

  const [catalogs] = useState(
    initialState.catalogs
  );

  const [assetTypes] = useState(
    initialState.assetTypes
  );

  const [activityTypes] = useState(
    initialState.activityTypes
  );

  const [
    selectedFieldId,
    setSelectedFieldId,
  ] = useState(initialState.selectedFieldId);

  const [
    selectedSectionId,
    setSelectedSectionId,
  ] = useState(initialState.selectedSectionId);

  const [notification, setNotification] =
    useState(null);

  const [isPreviewOpen, setIsPreviewOpen] =
    useState(false);

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setNotification(null);
    }, 3500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [notification]);

  const selectedField = useMemo(() => {
    if (!template || !selectedFieldId) {
      return null;
    }

    for (const section of template.sections) {
      const field = section.fields.find(
        (item) => item.id === selectedFieldId
      );

      if (field) {
        return field;
      }
    }

    return null;
  }, [template, selectedFieldId]);

  const showNotification = (type, message) => {
    setNotification({
      id: crypto.randomUUID(),
      type,
      message,
    });
  };

  const updateTemplate = (updater) => {
    setTemplate((currentTemplate) => {
      if (!currentTemplate) {
        return currentTemplate;
      }

      const nextTemplate =
        typeof updater === "function"
          ? updater(currentTemplate)
          : updater;

      return {
        ...nextTemplate,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const handleTemplateChange = (
    property,
    value
  ) => {
    updateTemplate((currentTemplate) => ({
      ...currentTemplate,
      [property]: value,
    }));
  };

  const handleScheduleChange = (
    nextSchedule
  ) => {
    updateTemplate((currentTemplate) => ({
      ...currentTemplate,
      schedule: nextSchedule,
    }));
  };

  const handleSelectField = (
    fieldId,
    sectionId
  ) => {
    setSelectedFieldId(fieldId);
    setSelectedSectionId(sectionId);
  };

  const handleAddSection = () => {
    if (!template) {
      return;
    }

    const sectionNumber =
      template.sections.length + 1;

    const newSection = createSection(
      `Sección ${sectionNumber}`
    );

    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: [
        ...currentTemplate.sections,
        newSection,
      ],
    }));

    setSelectedSectionId(newSection.id);
    setSelectedFieldId(null);

    showNotification(
      "success",
      "Nueva sección agregada al formulario."
    );
  };

  const handleAddField = (
    fieldType = "short-text",
    targetSectionId = null
  ) => {
    if (!template) {
      return;
    }

    const sectionId =
      targetSectionId ||
      selectedSectionId ||
      template.sections[0]?.id;

    if (!sectionId) {
      showNotification(
        "error",
        "Primero debes crear una sección."
      );

      return;
    }

    const newField = createField(fieldType);

    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: currentTemplate.sections.map(
        (section) =>
          section.id === sectionId
            ? {
                ...section,

                fields: [
                  ...section.fields,
                  newField,
                ],
              }
            : section
      ),
    }));

    setSelectedSectionId(sectionId);
    setSelectedFieldId(newField.id);
  };

  const handleFieldChange = (
    property,
    value
  ) => {
    if (
      !selectedFieldId ||
      !selectedSectionId
    ) {
      return;
    }

    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: currentTemplate.sections.map(
        (section) =>
          section.id === selectedSectionId
            ? {
                ...section,

                fields: section.fields.map(
                  (field) =>
                    field.id === selectedFieldId
                      ? {
                          ...field,
                          [property]: value,
                        }
                      : field
                ),
              }
            : section
      ),
    }));
  };

  const handleDeleteField = (
    sectionId,
    fieldId
  ) => {
    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: currentTemplate.sections.map(
        (section) =>
          section.id === sectionId
            ? {
                ...section,

                fields: section.fields.filter(
                  (field) =>
                    field.id !== fieldId
                ),
              }
            : section
      ),
    }));

    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
      setSelectedSectionId(sectionId);
    }

    showNotification(
      "success",
      "Campo eliminado del formulario."
    );
  };

  const handleDuplicateField = (
    sectionId,
    fieldId
  ) => {
    const section = template?.sections.find(
      (item) => item.id === sectionId
    );

    const sourceField = section?.fields.find(
      (field) => field.id === fieldId
    );

    if (!section || !sourceField) {
      return;
    }

    const duplicatedField = {
      ...structuredClone(sourceField),

      id: crypto.randomUUID(),

      name: `${sourceField.name} - Copia`,

      key: `${sourceField.key}_${Date.now()}`,
    };

    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: currentTemplate.sections.map(
        (currentSection) => {
          if (
            currentSection.id !== sectionId
          ) {
            return currentSection;
          }

          const fieldIndex =
            currentSection.fields.findIndex(
              (field) =>
                field.id === fieldId
            );

          const nextFields = [
            ...currentSection.fields,
          ];

          nextFields.splice(
            fieldIndex + 1,
            0,
            duplicatedField
          );

          return {
            ...currentSection,
            fields: nextFields,
          };
        }
      ),
    }));

    setSelectedSectionId(sectionId);
    setSelectedFieldId(
      duplicatedField.id
    );

    showNotification(
      "success",
      "Campo duplicado correctamente."
    );
  };

  const handleMoveField = (
    sectionId,
    fieldId,
    direction
  ) => {
    updateTemplate((currentTemplate) => ({
      ...currentTemplate,

      sections: currentTemplate.sections.map(
        (section) => {
          if (section.id !== sectionId) {
            return section;
          }

          const currentIndex =
            section.fields.findIndex(
              (field) =>
                field.id === fieldId
            );

          if (currentIndex === -1) {
            return section;
          }

          const targetIndex =
            direction === "up"
              ? currentIndex - 1
              : currentIndex + 1;

          if (
            targetIndex < 0 ||
            targetIndex >=
              section.fields.length
          ) {
            return section;
          }

          const nextFields = [
            ...section.fields,
          ];

          const [movedField] =
            nextFields.splice(
              currentIndex,
              1
            );

          nextFields.splice(
            targetIndex,
            0,
            movedField
          );

          return {
            ...section,
            fields: nextFields,
          };
        }
      ),
    }));
  };

  const handleSave = () => {
    if (!template) {
      return;
    }

    try {
      const savedTemplate =
        saveFieldEngineTemplate(template);

      setTemplate(savedTemplate);

      setTemplates(
        getFieldEngineTemplates()
      );

      showNotification(
        "success",
        "La plantilla fue guardada correctamente."
      );
    } catch (error) {
      showNotification(
        "error",
        error.message
      );
    }
  };

  const handlePublish = () => {
    if (!template) {
      return;
    }

    try {
      const savedTemplate =
        saveFieldEngineTemplate(template);

      const publishedTemplate =
        publishFieldEngineTemplate(
          savedTemplate.id
        );

      setTemplate(publishedTemplate);

      setTemplates(
        getFieldEngineTemplates()
      );

      showNotification(
        "success",
        `Versión ${publishedTemplate.version} publicada correctamente.`
      );
    } catch (error) {
      showNotification(
        "error",
        error.message
      );
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

    const handleBack = () => {
    navigate("/field-engine");
  };

  if (!template) {
    return (
      <div className="fe-loading">
        <div className="fe-loading__spinner" />

        <span>Preparando Field Engine</span>
      </div>
    );
  }

  return (
  <div className="field-engine-shell">
    <Sidebar />

    <div className="field-engine-main">
      <Navbar />

      <main className="field-engine">
        <FieldEngineHeader
          template={template}
          onSave={handleSave}
          onPublish={handlePublish}
          onPreview={handlePreview}
          onBack={handleBack}
        />

        <div className="field-engine__content">
          <FieldEngineStats
            template={template}
            templateCount={templates.length}
            catalogCount={catalogs.length}
          />

          <TemplateContextPanel
            template={template}
            assetTypes={assetTypes}
            activityTypes={activityTypes}
            onChange={handleTemplateChange}
          />

          <section className="fe-workspace">
            <FieldTypePalette
              onAddField={handleAddField}
            />

            <FormBuilderCanvas
              template={template}
              selectedFieldId={selectedFieldId}
              onSelectField={handleSelectField}
              onAddSection={handleAddSection}
              onAddField={handleAddField}
              onDeleteField={handleDeleteField}
              onDuplicateField={handleDuplicateField}
              onMoveField={handleMoveField}
            />

            <FieldPropertiesPanel
              selectedField={selectedField}
              catalogs={catalogs}
              onChange={handleFieldChange}
            />
          </section>

          <section className="fe-advanced-config">
            <FieldValidationPanel
              selectedField={selectedField}
              catalogs={catalogs}
              onFieldChange={handleFieldChange}
            />

            <ContextKeysPanel
              template={template}
              onChange={handleTemplateChange}
            />

            <TemplateSchedulePanel
              schedule={template.schedule}
              onChange={handleScheduleChange}
            />
          </section>
        </div>

        {isPreviewOpen && (
          <DynamicFormPreview
            template={template}
            catalogs={catalogs}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}

        {notification && (
          <div
            className={`fe-notification fe-notification--${notification.type}`}
            role="status"
          >
            <span>{notification.message}</span>
          </div>
        )}
      </main>
    </div>
  </div>
);
}