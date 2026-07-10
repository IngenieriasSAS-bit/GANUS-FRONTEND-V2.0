import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  ClipboardCheck,
  ChevronRight,
  FileText,
} from "lucide-react";

import {
  getPublishedFieldEngineTemplates,
} from "../../services/fieldEngineService";

import {
  getFieldEngineResponses,
} from "../../services/fieldEngineResponseService";

export default function FormulariosDinamicosActivo({
  activo,
}) {
  const navigate = useNavigate();

  const plantillas = useMemo(() => {
    return getPublishedFieldEngineTemplates().filter(
      (template) =>
        template.consumerModule === "inventory"
    );
  }, []);

  const respuestas = useMemo(() => {
    return getFieldEngineResponses().filter(
      (response) =>
        response.context?.primaryAsset === activo.id
    );
  }, [activo.id]);

  const obtenerTotalRegistros = (templateId) =>
    respuestas.filter(
      (response) =>
        response.templateId === templateId
    ).length;

  const abrirFormulario = (template) => {
    navigate(
      `/field-engine/capture/${template.id}?assetId=${encodeURIComponent(
        activo.id
      )}`
    );
  };

  return (
    <section className="formulariosDinamicosActivo">
      <div className="formulariosDinamicosActivoHeader">
        <div>
          <span>Formularios dinámicos</span>

          <p>
            Plantillas publicadas en Field Engine
            disponibles para registrar información sobre
            este activo.
          </p>
        </div>
      </div>

      {plantillas.length > 0 ? (
        <div className="formulariosDinamicosActivoLista">
          {plantillas.map((template) => {
            const totalRegistros =
              obtenerTotalRegistros(template.id);

            return (
              <button
                key={template.id}
                type="button"
                className="formularioDinamicoActivoItem"
                onClick={() =>
                  abrirFormulario(template)
                }
              >
                <div className="formularioDinamicoActivoIcono">
                  <ClipboardCheck size={17} />
                </div>

                <div className="formularioDinamicoActivoInformacion">
                  <div className="formularioDinamicoActivoTitulo">
                    <strong>
                      {template.name}
                    </strong>

                    <span>Publicada</span>
                  </div>

                  <p>
                    {template.description ||
                      "Plantilla dinámica configurada en Field Engine."}
                  </p>

                  <small>
                    Versión {template.version || 1}
                    {" · "}
                    {totalRegistros}{" "}
                    {totalRegistros === 1
                      ? "registro asociado"
                      : "registros asociados"}
                  </small>
                </div>

                <ChevronRight
                  size={18}
                  className="formularioDinamicoActivoFlecha"
                />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="formulariosDinamicosActivoVacio">
          <FileText size={20} />

          <p>
            No existen plantillas publicadas de Field
            Engine disponibles para Inventario.
          </p>
        </div>
      )}
    </section>
  );
}