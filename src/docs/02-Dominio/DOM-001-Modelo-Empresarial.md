# DOM-001 - Modelo Empresarial de GANUS

**Código:** DOM-001

**Versión:** 1.0

**Estado:** APROBADO

**Proyecto:** GANUS Enterprise Platform

**Última actualización:** Julio 2026

---

# 1. Propósito

Este documento define el Modelo Empresarial Oficial de GANUS.

Su objetivo consiste en representar cómo la plataforma comprende el negocio ganadero y cómo se relacionan las entidades que lo conforman.

El Modelo Empresarial constituye la base para el desarrollo del Core Empresarial, Knowledge Studio y el Business Understanding Engine.

---

# 2. Filosofía del Modelo

GANUS no modela únicamente datos.

GANUS modela el funcionamiento completo de una empresa.

Cada entidad representa un concepto del negocio.

Cada relación representa una interacción empresarial.

Cada módulo de la plataforma consume este mismo modelo.

Existe una única fuente oficial de verdad para toda la plataforma.

---

# 3. Principios del Modelo Empresarial

El Modelo Empresarial de GANUS se fundamenta en los siguientes principios:

- El negocio se representa mediante entidades relacionadas.
- Toda entidad pertenece a un contexto empresarial.
- Todo contexto forma parte de una organización.
- Todo dato capturado debe poder relacionarse con el negocio.
- El conocimiento se construye a partir de relaciones, no únicamente de datos.
- Ningún módulo define su propio modelo empresarial.
- Todo el sistema comparte el mismo lenguaje de negocio.

---

# 4. Objetivo del Modelo

Representar de forma consistente todos los elementos que conforman una empresa ganadera para permitir que Knowledge Studio comprenda el negocio como un sistema integrado y no como un conjunto de módulos independientes.

---

# 5. Mapa del Dominio Empresarial

El Modelo Empresarial de GANUS está compuesto por un conjunto de entidades relacionadas.

Cada entidad representa un concepto del negocio y posee una responsabilidad específica dentro de la plataforma.

La siguiente estructura representa la relación principal entre dichas entidades.

```text
Empresa
│
├── Grupo
│     │
│     ├── Finca
│     │      │
│     │      ├── Proceso
│     │      │      │
│     │      │      ├── Actividad
│     │      │      │      │
│     │      │      │      ├── Tarea (MAKE)
│     │      │      │      ├── Formulario (Field Engine)
│     │      │      │      └── Captura
│     │      │
│     │      ├── Activos
│     │      │      ├── Animales
│     │      │      ├── Equipos
│     │      │      ├── Infraestructura
│     │      │      ├── Potreros
│     │      │      └── Insumos
│     │
│     └── Usuarios
│
└──────────────────────────────────────┐
                                       │
                               Knowledge Studio
                                       │
         Business Understanding Engine
                        │
          Resultado del Conocimiento
                        │
      ├── Hallazgo
      ├── Riesgo
      ├── Oportunidad
      ├── Recomendación
      ├── Tendencia
      └── Observación
                        │
                Dashboard
                Advisory
                Reportes
```

---

## Principio del Dominio

Todas las entidades del sistema forman parte de un único Modelo Empresarial.

No existen modelos independientes por módulo.

Organización, Inventario, Field Engine, MAKE, Operativo, Dashboard y Advisory utilizan el mismo dominio de negocio.

Knowledge Studio actúa como el núcleo encargado de comprender las relaciones entre todas estas entidades.

---

# 6. Entidades del Dominio

Las entidades representan los conceptos principales del negocio.

Cada entidad posee identidad propia, responsabilidades claramente definidas y relaciones con otras entidades del modelo empresarial.

Las entidades oficiales del dominio son:

- Empresa
- Grupo
- Finca
- Proceso
- Actividad
- Activo
- Usuario
- Formulario
- Captura
- Objetivo Estratégico
- Indicador
- Regla Empresarial
- Resultado del Conocimiento

---

## 6.1 Empresa

### Definición

La Empresa representa la organización propietaria del conocimiento empresarial administrado por GANUS.

Constituye la entidad raíz del Modelo Empresarial.

Todas las demás entidades pertenecen directa o indirectamente a una Empresa.

### Responsabilidades

- Definir la identidad del negocio.
- Establecer el tipo de explotación.
- Definir el sector e industria.
- Ser propietaria del conocimiento empresarial.
- Agrupar unidades organizacionales.
- Servir como contexto raíz para toda la plataforma.

### Relaciones

Una Empresa:

- Contiene uno o varios Grupos.
- Publica Objetivos Estratégicos.
- Publica Indicadores Oficiales.
- Define Reglas Empresariales.
- Es interpretada por Knowledge Studio.

### Módulos consumidores

La entidad Empresa es utilizada por:

- Organización
- Knowledge Studio
- Dashboard
- Advisory
- MAKE
- Operativo
- Reportes

---

### Reglas de negocio

La Empresa constituye la entidad raíz del Modelo Empresarial y representa el nivel más alto de contexto dentro de GANUS.

Las siguientes reglas deberán cumplirse en toda la plataforma:

- Todo Grupo pertenece obligatoriamente a una Empresa.
- Ninguna Finca puede existir sin una Empresa asociada.
- Todo Objetivo Estratégico pertenece a una Empresa.
- Todo Indicador Oficial pertenece a una Empresa.
- Toda Regla Empresarial pertenece a una Empresa.
- Todo conocimiento generado por Knowledge Studio deberá estar asociado a una Empresa.

---

### Información principal

La entidad Empresa deberá administrar como mínimo la siguiente información:

- Identificador único.
- Nombre.
- Razón social.
- Tipo de organización.
- Sector económico.
- País.
- Estado.
- Fecha de creación.
- Estado de la empresa (Activa, Inactiva, Archivada).

---

### Futuras integraciones

La entidad Empresa podrá integrarse con:

- ERP corporativos.
- Sistemas contables.
- Plataformas documentales.
- Sistemas de autenticación empresarial.
- Servicios de Inteligencia Artificial.
- Plataformas de analítica empresarial.

---

## 6.2 Grupo

### Definición

El Grupo representa una unidad organizacional que permite administrar de forma conjunta un conjunto de fincas, procesos, recursos y estrategias pertenecientes a una misma Empresa.

Su propósito consiste en facilitar la organización empresarial cuando la operación se distribuye entre múltiples unidades productivas.

---

### Responsabilidades

- Agrupar fincas relacionadas.
- Compartir objetivos empresariales.
- Facilitar la administración regional o funcional.
- Organizar recursos comunes.
- Servir como nivel intermedio entre la Empresa y las Fincas.

---

### Relaciones

Un Grupo:

- Pertenece obligatoriamente a una Empresa.
- Contiene una o varias Fincas.
- Puede compartir Procesos entre diferentes Fincas.
- Es interpretado por Knowledge Studio como parte del contexto empresarial.

---

### Reglas de negocio

Las siguientes reglas aplican para toda la plataforma:

- Todo Grupo pertenece a una única Empresa.
- Un Grupo debe contener al menos una Finca activa.
- Ninguna Finca puede pertenecer simultáneamente a dos Grupos.
- Todo conocimiento asociado a un Grupo deberá estar relacionado con la Empresa propietaria.

---

### Información principal

La entidad Grupo deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código.
- Descripción.
- Empresa asociada.
- Estado (Activo, Inactivo, Archivado).

---

### Módulos consumidores

La entidad Grupo será utilizada por:

- Organización
- Inventario
- MAKE
- Operativo
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Grupo podrá integrarse con:

- Sistemas corporativos.
- Plataformas regionales.
- Herramientas analíticas.
- Servicios de Inteligencia Artificial.

---

## 6.3 Finca

### Definición

La Finca representa la unidad productiva principal administrada por GANUS.

Constituye el espacio donde se ejecutan los procesos del negocio, se administran los activos, se desarrollan las actividades y se captura la información que posteriormente será transformada en conocimiento empresarial.

La Finca es el principal contexto operativo del Modelo Empresarial.

---

### Responsabilidades

- Administrar la operación productiva.
- Contener los Procesos del negocio.
- Administrar los Activos asociados.
- Servir como contexto para las Actividades.
- Permitir la captura de información mediante Field Engine.
- Proveer información para Knowledge Studio.

---

### Relaciones

Una Finca:

- Pertenece obligatoriamente a un Grupo.
- Pertenece indirectamente a una Empresa.
- Contiene uno o varios Procesos.
- Administra uno o varios Activos.
- Es utilizada por MAKE para planificar Actividades.
- Es utilizada por Operativo para ejecutar procesos.
- Es interpretada por Knowledge Studio como una unidad productiva.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Toda Finca pertenece a un único Grupo.
- Toda Finca pertenece indirectamente a una Empresa.
- Una Finca puede contener múltiples Procesos.
- Todos los Activos pertenecen a una Finca.
- Toda Captura deberá poder relacionarse con la Finca donde fue registrada.

---

### Información principal

La entidad Finca deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código interno.
- Grupo asociado.
- Empresa asociada.
- Ubicación geográfica.
- Área.
- Estado (Activa, Inactiva, Archivada).

---

### Módulos consumidores

La entidad Finca será utilizada por:

- Organización
- Inventario
- Field Engine
- MAKE
- Operativo
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Finca podrá integrarse con:

- Sistemas GIS.
- Plataformas cartográficas.
- Sensores IoT.
- Estaciones meteorológicas.
- Sistemas de trazabilidad.
- Servicios de Inteligencia Artificial.

---

## 6.4 Proceso

### Definición

El Proceso representa una capacidad permanente del negocio orientada al cumplimiento de un objetivo empresarial.

Un Proceso organiza un conjunto de actividades relacionadas que generan valor para la organización y permiten ejecutar la operación de forma estandarizada.

Los Procesos constituyen el eje sobre el cual se planifica, ejecuta, controla y mejora la operación de la empresa.

---

### Responsabilidades

- Organizar la operación del negocio.
- Definir el flujo operativo.
- Agrupar actividades relacionadas.
- Proveer contexto para la planificación.
- Facilitar el seguimiento del desempeño.
- Generar información para Knowledge Studio.

---

### Relaciones

Un Proceso:

- Pertenece obligatoriamente a una Finca.
- Contiene una o varias Actividades.
- Puede utilizar múltiples Activos.
- Puede generar Formularios mediante Field Engine.
- Es planificado por MAKE.
- Es ejecutado mediante Operativo.
- Es interpretado por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Proceso pertenece a una única Finca.
- Toda Actividad pertenece a un único Proceso.
- Un Proceso puede ejecutarse múltiples veces.
- Todo conocimiento generado deberá poder asociarse al Proceso correspondiente.

---

### Información principal

La entidad Proceso deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código.
- Descripción.
- Finca asociada.
- Responsable.
- Estado (Activo, Inactivo, Archivado).

---

### Módulos consumidores

La entidad Proceso será utilizada por:

- Organización
- MAKE
- Operativo
- Field Engine
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Proceso podrá integrarse con:

- Motores BPM.
- Plataformas de automatización.
- Sistemas analíticos.
- Servicios de Inteligencia Artificial.

---

## 6.5 Actividad

### Definición

La Actividad representa una acción operativa específica que forma parte de un Proceso empresarial.

Las Actividades materializan la ejecución del negocio y constituyen la unidad funcional sobre la cual se planifican tareas, se ejecutan operaciones y se capturan evidencias.

Una Actividad puede ejecutarse múltiples veces a lo largo del tiempo.

---

### Responsabilidades

- Ejecutar una parte del Proceso.
- Servir como base para la planificación en MAKE.
- Permitir la captura de información mediante Field Engine.
- Relacionar los Activos involucrados.
- Generar evidencias operativas.
- Aportar información para Knowledge Studio.

---

### Relaciones

Una Actividad:

- Pertenece obligatoriamente a un Proceso.
- Puede involucrar uno o varios Activos.
- Puede tener uno o varios Formularios asociados.
- Puede generar múltiples Capturas.
- Es planificada mediante MAKE.
- Es ejecutada desde Operativo.
- Es interpretada por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Toda Actividad pertenece a un único Proceso.
- Una Actividad puede planificarse múltiples veces.
- Toda Captura debe estar asociada a una Actividad.
- Todo Formulario publicado debe estar asociado a una Actividad.
- Toda evidencia generada deberá conservar la relación con la Actividad correspondiente.

---

### Información principal

La entidad Actividad deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código.
- Descripción.
- Proceso asociado.
- Tipo de actividad.
- Responsable.
- Estado (Activa, Inactiva, Archivada).

---

### Módulos consumidores

La entidad Actividad será utilizada por:

- Organización
- Actividades
- MAKE
- Operativo
- Field Engine
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Actividad podrá integrarse con:

- Motores BPM.
- Plataformas de automatización.
- Sistemas de trazabilidad.
- Servicios de Inteligencia Artificial.

---

## 6.6 Activo

### Definición

El Activo representa cualquier recurso empresarial que participa en uno o varios procesos del negocio y genera valor para la organización.

Los Activos constituyen los elementos sobre los cuales se ejecutan las actividades operativas y se captura información para la generación de conocimiento empresarial.

GANUS administra Activos de diferentes naturalezas utilizando un modelo unificado.

---

### Responsabilidades

- Representar recursos del negocio.
- Participar en Procesos y Actividades.
- Mantener su estado operativo.
- Permitir el seguimiento de su ciclo de vida.
- Generar información para Knowledge Studio.
- Servir como referencia para la captura de datos.

---

### Relaciones

Un Activo:

- Pertenece obligatoriamente a una Finca.
- Puede participar en múltiples Procesos.
- Puede intervenir en múltiples Actividades.
- Puede estar asociado a Formularios.
- Puede generar múltiples Capturas.
- Es interpretado por Knowledge Studio como un recurso empresarial.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Activo pertenece a una única Finca.
- Todo Activo posee un Tipo de Activo.
- Un Activo puede participar en múltiples Actividades.
- Toda Captura relacionada con un Activo deberá conservar dicha relación.
- El historial del Activo deberá mantenerse durante todo su ciclo de vida.

---

### Información principal

La entidad Activo deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código.
- Tipo de Activo.
- Finca asociada.
- Estado operativo.
- Estado administrativo.
- Fecha de creación.

---

### Clasificación de Activos

GANUS permitirá administrar diferentes tipos de Activos.

Ejemplos:

- Animales.
- Potreros.
- Equipos.
- Maquinaria.
- Infraestructura.
- Vehículos.
- Insumos.
- Dispositivos IoT.

La plataforma podrá incorporar nuevos tipos sin modificar el Modelo Empresarial.

---

### Módulos consumidores

La entidad Activo será utilizada por:

- Organización
- Inventario
- Actividades
- MAKE
- Operativo
- Field Engine
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Activo podrá integrarse con:

- Sistemas RFID.
- Sensores IoT.
- Plataformas GIS.
- Sistemas de trazabilidad.
- ERP.
- Servicios de Inteligencia Artificial.

---

## 6.7 Formulario

### Definición

El Formulario representa el instrumento oficial utilizado por GANUS para capturar información estructurada durante la ejecución de una Actividad.

Todo Formulario responde a una necesidad del negocio y constituye el mecanismo mediante el cual Field Engine materializa los procesos de captura de información.

---

### Responsabilidades

- Definir la estructura de captura de datos.
- Representar un mecanismo oficial de registro.
- Asociarse a una o varias Actividades.
- Permitir el versionamiento.
- Controlar su ciclo de vida (Borrador, Publicado, Archivado).
- Servir como origen de las Capturas.

---

### Relaciones

Un Formulario:

- Pertenece al contexto de una Actividad.
- Puede utilizar Catálogos reutilizables.
- Puede contener múltiples Secciones y Campos.
- Puede generar múltiples Capturas.
- Es diseñado y administrado por Field Engine.
- Es interpretado por Knowledge Studio a través de la información capturada.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Formulario deberá estar asociado al menos a una Actividad.
- Solo los Formularios publicados podrán utilizarse para capturar información.
- Cada versión publicada deberá conservar su historial.
- Toda Captura deberá indicar la versión del Formulario utilizada.
- Ningún Formulario publicado podrá modificarse directamente; deberá crearse una nueva versión.

---

### Información principal

La entidad Formulario deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Código.
- Descripción.
- Actividad asociada.
- Versión.
- Estado (Borrador, Publicado, Archivado).
- Fecha de publicación.

---

### Módulos consumidores

La entidad Formulario será utilizada por:

- Field Engine
- Operativo
- Knowledge Studio
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Formulario podrá integrarse con:

- Motores OCR.
- Firmas digitales.
- Dispositivos móviles.
- Plataformas offline.
- Servicios de Inteligencia Artificial.

---

## 6.8 Captura

### Definición

La Captura representa la evidencia estructurada generada durante la ejecución de una Actividad mediante una versión específica de un Formulario.

Cada Captura conserva el contexto empresarial completo en el momento en que fue registrada y constituye la principal fuente de información para la construcción del conocimiento empresarial.

---

### Responsabilidades

- Registrar la evidencia de una ejecución.
- Conservar el contexto empresarial de la operación.
- Almacenar las respuestas capturadas.
- Mantener la trazabilidad de la información.
- Servir como entrada para Knowledge Studio.
- Permitir auditoría e historial de cambios.

---

### Relaciones

Una Captura:

- Pertenece a un Formulario.
- Corresponde a una versión específica del Formulario.
- Está asociada a una Actividad.
- Puede involucrar uno o varios Activos.
- Se registra dentro de una Finca y una Empresa.
- Es interpretada por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Toda Captura deberá estar asociada a un Formulario publicado.
- Toda Captura deberá conservar la versión del Formulario utilizada.
- Ninguna Captura podrá perder su contexto empresarial.
- Toda Captura deberá ser trazable hasta la Actividad que la originó.
- Las Capturas forman parte del historial permanente del negocio.

---

### Información principal

La entidad Captura deberá administrar como mínimo:

- Identificador único.
- Formulario asociado.
- Versión del formulario.
- Actividad asociada.
- Activos relacionados.
- Usuario responsable.
- Fecha y hora de captura.
- Método de captura.
- Estado (Borrador, Finalizada, Validada, Anulada).

---

### Módulos consumidores

La entidad Captura será utilizada por:

- Field Engine
- Operativo
- Knowledge Studio
- Dashboard
- Advisory
- Reportes

---

### Futuras integraciones

La entidad Captura podrá integrarse con:

- Dispositivos móviles.
- Captura offline.
- Sensores IoT.
- Servicios de firma digital.
- Plataformas analíticas.
- Servicios de Inteligencia Artificial.

---

## 6.9 Usuario

### Definición

El Usuario representa un actor empresarial que interactúa con GANUS para ejecutar procesos, administrar recursos, capturar información o consumir conocimiento.

El modelo de Usuario no se limita a la autenticación; también define el rol que desempeña cada persona dentro de la operación del negocio.

---

### Responsabilidades

- Ejecutar actividades operativas.
- Registrar capturas mediante formularios.
- Administrar información según su rol.
- Consultar indicadores y reportes.
- Participar en la ejecución de procesos.
- Consumir conocimiento generado por Knowledge Studio.

---

### Relaciones

Un Usuario:

- Pertenece a una Empresa.
- Puede estar asociado a uno o varios Grupos.
- Puede operar en una o varias Fincas.
- Puede ejecutar múltiples Actividades.
- Puede generar múltiples Capturas.
- Consume información publicada por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Usuario pertenece a una Empresa.
- Todo Usuario debe tener al menos un Rol asignado.
- Las acciones del Usuario deberán ser trazables.
- Toda Captura deberá registrar el Usuario responsable.
- Los permisos estarán determinados por los Roles asignados.

---

### Información principal

La entidad Usuario deberá administrar como mínimo:

- Identificador único.
- Nombre completo.
- Documento de identificación.
- Correo electrónico.
- Rol o Roles asignados.
- Empresa asociada.
- Estado (Activo, Inactivo, Suspendido).

---

### Módulos consumidores

La entidad Usuario será utilizada por:

- Organización
- Operativo
- MAKE
- Field Engine
- Knowledge Studio
- Dashboard
- Advisory
- Reportes
- Configuración

---

### Futuras integraciones

La entidad Usuario podrá integrarse con:

- Active Directory.
- Microsoft Entra ID.
- LDAP.
- Proveedores OAuth.
- Sistemas corporativos de identidad.

---

## 6.10 Objetivo Estratégico

### Definición

El Objetivo Estratégico representa el resultado empresarial que la organización desea alcanzar dentro de un horizonte determinado.

Los Objetivos orientan la ejecución de los procesos, permiten priorizar iniciativas y constituyen el principal referente para la construcción del conocimiento empresarial en GANUS.

---

### Responsabilidades

- Definir la dirección estratégica del negocio.
- Guiar la ejecución de los procesos.
- Servir como referencia para la evaluación del desempeño.
- Relacionarse con Indicadores y Reglas Empresariales.
- Apoyar la toma de decisiones.

---

### Relaciones

Un Objetivo Estratégico:

- Pertenece a una Empresa.
- Puede aplicarse a uno o varios Grupos.
- Puede aplicarse a una o varias Fincas.
- Se evalúa mediante Indicadores.
- Puede estar asociado a una o varias Reglas Empresariales.
- Es interpretado por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Objetivo Estratégico pertenece a una Empresa.
- Un Objetivo debe contar con al menos un Indicador asociado.
- Un Objetivo puede relacionarse con múltiples Procesos.
- Todo conocimiento generado deberá poder vincularse con uno o más Objetivos Estratégicos.

---

### Información principal

La entidad Objetivo Estratégico deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Descripción.
- Empresa asociada.
- Horizonte de cumplimiento.
- Prioridad.
- Estado (Activo, En revisión, Finalizado).

---

### Módulos consumidores

La entidad Objetivo Estratégico será utilizada por:

- Knowledge Studio
- Dashboard
- Advisory
- Indicadores
- Reportes

---

### Futuras integraciones

La entidad Objetivo Estratégico podrá integrarse con:

- Plataformas de planeación estratégica.
- Sistemas corporativos de gestión.
- Herramientas de analítica.
- Servicios de Inteligencia Artificial.

---

## 6.11 Regla Empresarial

### Definición

La Regla Empresarial representa una política, condición o criterio definido por la organización para controlar el comportamiento del negocio y apoyar la toma de decisiones.

Las Reglas Empresariales permiten transformar la información operativa en acciones concretas dentro de GANUS.

---

### Responsabilidades

- Definir condiciones del negocio.
- Evaluar información proveniente de las Capturas.
- Generar Alertas.
- Actualizar Indicadores.
- Generar Resultados del Conocimiento.
- Apoyar la automatización empresarial.

---

### Relaciones

Una Regla Empresarial:

- Pertenece a una Empresa.
- Puede estar asociada a uno o varios Objetivos Estratégicos.
- Evalúa información proveniente de Capturas.
- Puede actualizar Indicadores.
- Es ejecutada por Rule Engine.
- Es interpretada por Knowledge Studio.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Toda Regla Empresarial pertenece a una Empresa.
- Toda Regla deberá tener una condición claramente definida.
- Una Regla podrá generar múltiples acciones.
- Toda ejecución de una Regla deberá ser auditable.
- Las Reglas deberán conservar su historial de versiones.

---

### Información principal

La entidad Regla Empresarial deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Descripción.
- Objetivo Estratégico asociado.
- Condición.
- Acción.
- Prioridad.
- Estado (Activa, Inactiva, Archivada).

---

### Módulos consumidores

La entidad Regla Empresarial será utilizada por:

- Knowledge Studio
- Rule Engine
- Dashboard
- Advisory
- Alertas
- Indicadores
- Reportes

---

### Futuras integraciones

La entidad Regla Empresarial podrá integrarse con:

- Motores BPM.
- Plataformas de automatización.
- Motores de decisiones.
- Servicios de Inteligencia Artificial.

---

## 6.12 Indicador

### Definición

El Indicador representa una medida cuantificable utilizada para evaluar el cumplimiento de un Objetivo Estratégico mediante el análisis de información generada por la operación del negocio.

Los Indicadores permiten medir el desempeño de la organización, apoyar la toma de decisiones y facilitar la mejora continua.

---

### Responsabilidades

- Medir el desempeño del negocio.
- Evaluar el cumplimiento de Objetivos Estratégicos.
- Transformar información operativa en métricas útiles.
- Apoyar la toma de decisiones.
- Facilitar el análisis histórico.
- Publicar resultados para Dashboard y Advisory.

---

### Relaciones

Un Indicador:

- Pertenece a una Empresa.
- Está asociado a uno o varios Objetivos Estratégicos.
- Puede depender de una o varias Reglas Empresariales.
- Utiliza información proveniente de Capturas.
- Es generado por Knowledge Studio.
- Es publicado en Dashboard y consumido por Advisory.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Indicador pertenece a una Empresa.
- Todo Indicador debe estar asociado al menos a un Objetivo Estratégico.
- Todo Indicador deberá indicar claramente su método de cálculo.
- Los valores históricos deberán conservarse para análisis y auditoría.
- Todo cambio en el método de cálculo deberá generar una nueva versión.

---

### Información principal

La entidad Indicador deberá administrar como mínimo:

- Identificador único.
- Nombre.
- Descripción.
- Objetivo Estratégico asociado.
- Método de cálculo.
- Unidad de medida.
- Frecuencia de actualización.
- Estado (Activo, En revisión, Archivado).

---

### Módulos consumidores

La entidad Indicador será utilizada por:

- Knowledge Studio
- Dashboard
- Advisory
- Indicadores
- Reportes

---

### Futuras integraciones

La entidad Indicador podrá integrarse con:

- Plataformas BI.
- Sistemas analíticos.
- Herramientas de visualización.
- Servicios de Inteligencia Artificial.

## 6.13 Resultado del Conocimiento

### Definición

El Resultado del Conocimiento representa una conclusión empresarial generada por Knowledge Studio a partir de la interpretación del contexto completo del negocio.

No constituye un dato operativo ni una simple métrica.

Representa conocimiento empresarial construido mediante el análisis conjunto de la información operativa, documental, estratégica y contextual.

Los Resultados del Conocimiento constituyen el principal producto del Business Understanding Engine y sirven como base para la toma de decisiones dentro de GANUS.

---

### Responsabilidades

- Materializar el conocimiento generado por Knowledge Studio.
- Representar conclusiones empresariales.
- Relacionarse con Objetivos Estratégicos.
- Relacionarse con Indicadores.
- Relacionarse con Reglas Empresariales.
- Servir de entrada para Dashboard.
- Servir de contexto para Advisory.
- Permitir trazabilidad del conocimiento generado.

---

### Clasificación

Todo Resultado del Conocimiento deberá pertenecer a uno de los siguientes tipos:

- Hallazgo
- Recomendación
- Riesgo
- Oportunidad
- Tendencia
- Observación

La plataforma podrá incorporar nuevos tipos en futuras versiones sin modificar el Modelo Empresarial.

---

### Relaciones

Un Resultado del Conocimiento:

- Pertenece a una Empresa.
- Puede relacionarse con uno o varios Objetivos Estratégicos.
- Puede relacionarse con uno o varios Indicadores.
- Puede originarse a partir de múltiples Capturas.
- Puede originarse a partir de documentos empresariales.
- Puede utilizar información proveniente del contexto externo.
- Es generado por Knowledge Studio.
- Es consumido por Dashboard.
- Es consumido por Advisory.
- Puede generar Alertas o Propuestas de Acción.

---

### Reglas de negocio

Las siguientes reglas deberán cumplirse:

- Todo Resultado del Conocimiento pertenece a una Empresa.
- Todo Resultado deberá indicar claramente su tipo.
- Todo Resultado deberá conservar trazabilidad hacia la información que lo originó.
- Ningún Resultado podrá modificar directamente los datos operativos.
- Todo Resultado deberá indicar su nivel de confianza cuando sea generado mediante Inteligencia Artificial.
- Todo Resultado podrá ser validado o descartado por la organización.

---

### Información principal

La entidad Resultado del Conocimiento deberá administrar como mínimo:

- Identificador único.
- Tipo de Resultado.
- Título.
- Descripción.
- Empresa asociada.
- Objetivos relacionados.
- Indicadores relacionados.
- Nivel de confianza.
- Estado.
- Fecha de generación.
- Fuente del conocimiento.

---

### Módulos consumidores

La entidad Resultado del Conocimiento será utilizada por:

- Knowledge Studio
- Dashboard
- Advisory
- Reportes
- Alertas

---

### Futuras integraciones

La entidad Resultado del Conocimiento podrá integrarse con:

- Business Understanding Engine.
- Motores de Inteligencia Artificial.
- Sistemas de analítica avanzada.
- Plataformas BI.
- Sistemas de automatización empresarial.

----

# 7. Relaciones del Dominio

Las entidades del Modelo Empresarial no existen de manera aislada.

Cada una participa en una red de relaciones que representa el funcionamiento real de la organización.

Estas relaciones constituyen la base sobre la cual Knowledge Studio interpreta el negocio.

---

## 7.1 Relación Organizacional

```text
Empresa
    │
    └── Grupo
            │
            └── Finca
```

Esta relación define la estructura organizacional de la empresa y el contexto donde ocurre la operación.

---

## 7.2 Relación Operativa

```text
Finca
    │
    └── Proceso
            │
            └── Actividad
```

Esta relación representa cómo se organiza el trabajo dentro de la operación del negocio.

---

## 7.3 Relación de Recursos

```text
Finca
    │
    └── Activo
             │
             └── Actividad
```

Los Activos participan en la ejecución de las Actividades y generan información relevante para el negocio.

---

## 7.4 Relación de Captura

```text
Actividad
      │
      └── Formulario
               │
               └── Captura
```

Field Engine utiliza esta relación para estructurar y ejecutar la captura de información.

---

## 7.5 Relación de Conocimiento

```text
Conocimiento Base
Documentación
Capturas
Contexto Externo
        │
Knowledge Studio
        │
Business Understanding Engine
        │
Resultado del Conocimiento
        │
├── Objetivos Estratégicos
├── Reglas Empresariales
└── Indicadores
```

Knowledge Studio utiliza la información capturada para construir conocimiento empresarial y apoyar la toma de decisiones.

---

## 7.6 Relación de Consumo

```text
Knowledge Studio
      │
      ├── Dashboard
      ├── Advisory
      └── Reportes
```

Los módulos consumidores utilizan el conocimiento generado sin modificar el modelo empresarial.

---

# 8. Reglas del Dominio

Las Reglas del Dominio establecen las condiciones que siempre deberán cumplirse para garantizar la integridad del Modelo Empresarial de GANUS.

Estas reglas son independientes de la tecnología utilizada y deberán respetarse en cualquier implementación del sistema.

---

## 8.1 Reglas de la Organización

- Toda Empresa puede contener uno o varios Grupos.
- Todo Grupo pertenece obligatoriamente a una única Empresa.
- Toda Finca pertenece obligatoriamente a un único Grupo.
- Ninguna Finca puede existir fuera del contexto de una Empresa.

---

## 8.2 Reglas de la Operación

- Todo Proceso pertenece a una única Finca.
- Toda Actividad pertenece a un único Proceso.
- Una Actividad puede ejecutarse múltiples veces.
- Todo Activo pertenece a una única Finca.

---

## 8.3 Reglas de Captura

- Todo Formulario deberá estar asociado al menos a una Actividad.
- Solo los Formularios publicados podrán utilizarse para generar Capturas.
- Toda Captura deberá conservar la versión del Formulario utilizada.
- Toda Captura deberá registrar el Usuario responsable.
- Toda Captura deberá mantener el contexto empresarial completo.

---

## 8.4 Reglas del Conocimiento

- Todo Objetivo Estratégico pertenece a una Empresa.
- Toda Regla Empresarial pertenece a una Empresa.
- Todo Indicador deberá estar asociado al menos a un Objetivo Estratégico.
- Knowledge Studio únicamente construirá conocimiento a partir de fuentes de información válidas y trazables pertenecientes al Modelo Empresarial, incluyendo Capturas, Documentación Empresarial, Conocimiento Base y Contexto Externo cuando este se encuentre disponible.

---

## 8.5 Reglas de Trazabilidad

- Toda operación relevante deberá ser auditable.
- Ninguna Captura podrá perder su historial.
- Todo cambio de versión deberá conservar el histórico.
- Todo conocimiento generado deberá poder rastrearse hasta la información que lo originó.

---

# 9. Invariantes del Dominio

Las Invariantes representan las propiedades fundamentales del Modelo Empresarial de GANUS.

Estas condiciones nunca podrán romperse, independientemente de la evolución funcional, tecnológica o arquitectónica de la plataforma.

Su cumplimiento garantiza la consistencia del conocimiento empresarial.

---

## 9.1 Invariantes Organizacionales

- Toda Empresa constituye la raíz del contexto empresarial.
- Ninguna entidad operativa puede existir fuera del contexto de una Empresa.
- Toda Finca pertenece permanentemente a un único Grupo.

---

## 9.2 Invariantes Operacionales

- Toda Actividad pertenece exactamente a un Proceso.
- Todo Proceso pertenece exactamente a una Finca.
- Todo Activo pertenece exactamente a una Finca.
- Ninguna Actividad puede ejecutarse sin un Proceso asociado.

---

## 9.3 Invariantes de Captura

- Toda Captura conserva el contexto empresarial con el que fue creada.
- Toda Captura mantiene la versión del Formulario utilizada.
- Ninguna Captura pierde su trazabilidad.
- Toda Captura puede relacionarse con la Actividad que la originó.

---

## 9.4 Invariantes del Conocimiento

- Todo conocimiento deriva de información validada.
- Ningún Indicador puede existir sin un Objetivo Estratégico.
- Toda Regla Empresarial pertenece a una Empresa.
- Knowledge Studio nunca modifica la información original; únicamente genera conocimiento a partir de ella.

---

## 9.5 Invariantes de Evolución

- El Modelo Empresarial constituye la única fuente oficial de verdad para toda la plataforma.
- Los nuevos módulos deberán adaptarse al Modelo Empresarial y no crear modelos independientes.
- Toda evolución del Core Empresarial deberá preservar estas invariantes.

---

# 10. Eventos del Dominio

Los Eventos del Dominio representan hechos relevantes del negocio que ocurren durante la operación de GANUS.

Estos eventos podrán ser utilizados por Knowledge Studio, Dashboard, Advisory, Reportes y otros módulos para reaccionar de forma desacoplada ante cambios importantes del negocio.

---

## 10.1 Eventos Organizacionales

- Empresa creada.
- Grupo creado.
- Finca registrada.
- Usuario incorporado.
- Cambio de estructura organizacional.

---

## 10.2 Eventos Operativos

- Proceso creado.
- Actividad planificada.
- Actividad iniciada.
- Actividad finalizada.
- Activo registrado.
- Activo actualizado.

---

## 10.3 Eventos de Field Engine

- Formulario creado.
- Nueva versión de Formulario.
- Formulario publicado.
- Formulario archivado.
- Captura iniciada.
- Captura registrada.
- Captura validada.

---

## 10.4 Eventos Estratégicos

- Objetivo Estratégico creado.
- Regla Empresarial creada.
- Regla Empresarial actualizada.
- Indicador recalculado.
- Resultado del Conocimiento generado.
- Resultado del Conocimiento validado.
- Resultado del Conocimiento publicado.

---

## 10.5 Consumo de Eventos

Los eventos del dominio podrán ser consumidos por diferentes módulos según su responsabilidad.

Ejemplos:

- Knowledge Studio interpreta Capturas para generar conocimiento.
- Dashboard actualiza indicadores cuando cambian los resultados.
- Advisory genera recomendaciones cuando se detectan nuevos hallazgos.
- Alertas notifica condiciones definidas por las Reglas Empresariales.
- Reportes incorpora los cambios para mantener la información actualizada.

La publicación y consumo de eventos deberá mantener el desacoplamiento entre módulos definido en ARQ-001.       

---

# 11. Agregados y Límites del Dominio

Con el propósito de mantener un Modelo Empresarial consistente y facilitar la implementación del Core Empresarial, las entidades del dominio se organizan en agregados funcionales.

Cada agregado agrupa entidades estrechamente relacionadas y define claramente sus límites de responsabilidad.

---

## 11.1 Agregado Organizacional

Este agregado representa la estructura organizacional de la empresa.

```text
Empresa
    │
    └── Grupo
            │
            └── Finca
```

Responsabilidad principal:

Administrar la estructura empresarial y proporcionar el contexto organizacional para toda la plataforma.

---

## 11.2 Agregado Operativo

Este agregado representa la ejecución del negocio.

```text
Proceso
      │
      └── Actividad
               │
               ├── Formulario
               └── Captura
```

Responsabilidad principal:

Coordinar la ejecución de procesos, actividades y la captura de información operativa.

---

## 11.3 Agregado de Recursos

Este agregado administra los recursos utilizados por la operación.

```text
Activo
```

Responsabilidad principal:

Gestionar el ciclo de vida y la participación de los Activos en los procesos empresariales.

---

## 11.4 Agregado Estratégico

Este agregado representa el conocimiento empresarial.

```text
Objetivo Estratégico
          │
          ├── Indicador
          ├── Regla Empresarial
          └── Resultado del Conocimiento
```

Responsabilidad principal:

Definir la estrategia del negocio, evaluar el desempeño y apoyar la toma de decisiones.

---

## 11.5 Límites del Dominio

Cada agregado mantiene su propia responsabilidad y no modifica directamente las entidades pertenecientes a otros agregados.

La comunicación entre agregados deberá realizarse mediante eventos del dominio o servicios del Core Empresarial, preservando el desacoplamiento definido en ARQ-001.

---

# 12. Preparación para el Core Empresarial

El Modelo Empresarial definido en este documento constituye la base para la implementación del Core Empresarial de GANUS.

El Core será el responsable de materializar las entidades, reglas y relaciones descritas en este documento, proporcionando una implementación reutilizable para todos los módulos de la plataforma.

---

## 12.1 Responsabilidades del Core

El Core Empresarial deberá:

- Implementar las entidades oficiales del dominio.
- Centralizar las reglas del dominio.
- Garantizar el cumplimiento de las invariantes.
- Gestionar los eventos del dominio.
- Proporcionar servicios reutilizables para todos los módulos.
- Evitar la duplicación de lógica de negocio.

---

## 12.2 Relación con los módulos

Los módulos funcionales no implementarán reglas de negocio propias.

Cada módulo consumirá las capacidades del Core según su responsabilidad.

Ejemplos:

- Organización utilizará el Core para administrar la estructura empresarial.
- Inventario utilizará el Core para gestionar los Activos.
- Field Engine utilizará el Core para asociar Formularios y Capturas al dominio.
- MAKE utilizará el Core para planificar la ejecución de Actividades.
- Operativo utilizará el Core para ejecutar procesos y registrar información.
- Knowledge Studio utilizará el Core como fuente oficial del modelo empresarial.
- Dashboard, Advisory y Reportes consumirán el conocimiento generado sin modificar el dominio.

---

## 12.3 Principios de implementación

La implementación del Core deberá respetar los siguientes principios:

- El dominio será independiente de la interfaz de usuario.
- Las reglas del negocio estarán centralizadas.
- Las entidades mantendrán su consistencia mediante las reglas e invariantes del dominio.
- Los servicios expondrán capacidades reutilizables para toda la plataforma.
- Toda evolución del Core deberá mantener la compatibilidad con el Modelo Empresarial definido en este documento.

---

# 13. Conclusión

El presente documento establece el Modelo Empresarial Oficial de GANUS y define el lenguaje común que deberán utilizar todos los módulos de la plataforma.

Las entidades, relaciones, reglas, invariantes y eventos aquí descritos constituyen la base conceptual sobre la cual se implementará el Core Empresarial.

Este modelo garantiza que toda la plataforma comparta una única representación del negocio, evitando duplicidad de conceptos y asegurando la coherencia entre los diferentes módulos.

A partir de este documento:

- El Core Empresarial implementará las entidades y reglas del dominio.
- Knowledge Studio utilizará este modelo como fundamento para construir conocimiento empresarial.
- Field Engine, MAKE, Operativo, Dashboard, Advisory y los demás módulos consumirán el mismo modelo de negocio.
- Las futuras integraciones deberán respetar las responsabilidades y relaciones aquí definidas.

Toda evolución funcional o tecnológica de GANUS deberá preservar este Modelo Empresarial como la única fuente oficial de verdad para la representación del negocio.