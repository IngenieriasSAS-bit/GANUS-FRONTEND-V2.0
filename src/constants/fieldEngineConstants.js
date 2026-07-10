import {
  Type,
  AlignLeft,
  Hash,
  CalendarDays,
  CalendarClock,
  List,
  ListChecks,
  ToggleLeft,
  UserRound,
  Boxes,
  MapPin,
  Image,
  Video,
  FileText,
  PenTool,
  QrCode,
  Minus,
  Heading,
  StickyNote,
  Keyboard,
  Mic,
  RadioTower,
  Barcode,
  Camera,
  Upload,
  Scale,
  Cpu,
  Cloud,
  Calculator,
} from "lucide-react";

export const FIELD_TYPES = [
  { id: "short-text", name: "Texto corto", icon: Type },
  { id: "long-text", name: "Texto largo", icon: AlignLeft },
  { id: "number", name: "Número", icon: Hash },
  { id: "decimal", name: "Decimal", icon: Hash },
  { id: "date", name: "Fecha", icon: CalendarDays },
  { id: "datetime", name: "Fecha / Hora", icon: CalendarClock },
  { id: "list", name: "Lista", icon: List },
  { id: "multiselect", name: "Multiselección", icon: ListChecks },
  { id: "boolean", name: "Booleano", icon: ToggleLeft },
  { id: "user", name: "Usuario", icon: UserRound },
  { id: "related-asset", name: "Activo relacionado", icon: Boxes },
  { id: "gps", name: "GPS", icon: MapPin },
  { id: "image", name: "Imagen", icon: Image },
  { id: "video", name: "Video", icon: Video },
  { id: "document", name: "Documento", icon: FileText },
  { id: "signature", name: "Firma", icon: PenTool },
  { id: "qr", name: "Código QR", icon: QrCode },
  { id: "separator", name: "Separador", icon: Minus },
  { id: "title", name: "Título", icon: Heading },
  { id: "note", name: "Nota", icon: StickyNote },
];

export const CAPTURE_METHODS = [
  { id: "manual", name: "Manual", icon: Keyboard },
  { id: "voice", name: "Voz", icon: Mic },
  { id: "rfid", name: "RFID", icon: RadioTower },
  { id: "qr", name: "Código QR", icon: QrCode },
  { id: "barcode", name: "Código de barras", icon: Barcode },
  { id: "camera", name: "Cámara", icon: Camera },
  { id: "file", name: "Archivo", icon: Upload },
  { id: "scale", name: "Báscula", icon: Scale },
  { id: "iot", name: "Sensor IoT", icon: Cpu },
  { id: "api", name: "API", icon: Cloud },
  { id: "calculated", name: "Cálculo automático", icon: Calculator },
];

export const CONSUMER_MODULES = [
  { id: "inventory", name: "Inventario" },
  { id: "make", name: "MAKE Control" },
  { id: "operation", name: "Operativo" },
  { id: "track", name: "Track" },
  { id: "advisory", name: "Advisory" },
];

export const TEMPLATE_CONTEXTS = [
  { id: "process", name: "Proceso" },
  { id: "activity-type", name: "Tipo de actividad" },
  { id: "asset-type", name: "Tipo de activo" },
];

export const TEMPLATE_STATES = {
  DRAFT: "draft",
  PUBLISHED: "published",
  OBSOLETE: "obsolete",
};

export const CONTEXT_KEYS = [
  {
    id: "primaryAsset",
    name: "Activo principal",
    description: "Activo sobre el cual se origina el registro.",
  },
  {
    id: "secondaryAsset",
    name: "Activo secundario",
    description: "Activo relacionado de forma complementaria.",
  },
  {
    id: "responsible",
    name: "Responsable",
    description: "Usuario responsable de la captura.",
  },
  {
    id: "location",
    name: "Ubicación",
    description: "Contexto geográfico asociado al registro.",
  },
  {
    id: "eventDate",
    name: "Fecha del evento",
    description: "Fecha efectiva en la que ocurre el evento.",
  },
  {
    id: "recordCode",
    name: "Código del registro",
    description: "Identificador único del registro generado.",
  },
];

export const FREQUENCY_UNITS = [
  { id: "days", name: "Días" },
  { id: "weeks", name: "Semanas" },
  { id: "months", name: "Meses" },
  { id: "years", name: "Años" },
];

export const WEEK_DAYS = [
  { id: "monday", shortName: "Lun", name: "Lunes" },
  { id: "tuesday", shortName: "Mar", name: "Martes" },
  { id: "wednesday", shortName: "Mié", name: "Miércoles" },
  { id: "thursday", shortName: "Jue", name: "Jueves" },
  { id: "friday", shortName: "Vie", name: "Viernes" },
  { id: "saturday", shortName: "Sáb", name: "Sábado" },
  { id: "sunday", shortName: "Dom", name: "Domingo" },
];

export const VALIDATION_TYPES = [
  { id: "required", name: "Campo obligatorio" },
  { id: "min", name: "Valor mínimo" },
  { id: "max", name: "Valor máximo" },
  { id: "minLength", name: "Longitud mínima" },
  { id: "maxLength", name: "Longitud máxima" },
  { id: "expression", name: "Expresión personalizada" },
  { id: "dependency", name: "Dependencia de campo" },
  { id: "crossValidation", name: "Validación cruzada" },
];

export const DEFAULT_CATALOGS = [
  {
    id: "catalog-status",
    name: "Estado operativo",
    description: "Estados generales para clasificación operativa.",
    values: ["Operativo", "Requiere revisión", "Fuera de servicio"],
    active: true,
  },
  {
    id: "catalog-priority",
    name: "Prioridad",
    description: "Niveles reutilizables de prioridad.",
    values: ["Baja", "Media", "Alta", "Crítica"],
    active: true,
  },
];

export const createField = (type = "short-text") => ({
  id: crypto.randomUUID(),
  name: "Nuevo campo",
  key: `campo_${Date.now()}`,
  type,
  required: false,
  helpText: "",
  defaultValue: "",
  placeholder: "",
  captureMethods: ["manual"],
  catalogId: "",
  validations: [],
  visible: true,
});

export const createSection = (name = "Nueva sección") => ({
  id: crypto.randomUUID(),
  name,
  description: "",
  fields: [],
});

export const createTemplate = () => ({
  id: crypto.randomUUID(),
  name: "Plantilla sin nombre",
  description: "",
  consumerModule: "inventory",
  contextType: "asset-type",
  contextValue: "",
  state: TEMPLATE_STATES.DRAFT,
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: null,
  sections: [
    {
      ...createSection("Información general"),
      fields: [
        {
          ...createField("short-text"),
          name: "Código",
          key: "codigo",
          required: true,
          helpText: "Identificador principal del registro.",
        },
      ],
    },
  ],
  contextKeys: ["responsible", "eventDate", "recordCode"],
  schedule: {
    enabled: false,
    startDate: "",
    frequency: 1,
    unit: "months",
    repeat: true,
    specificDays: [],
    endDate: "",
    maxExecutions: "",
  },
  history: [],
});