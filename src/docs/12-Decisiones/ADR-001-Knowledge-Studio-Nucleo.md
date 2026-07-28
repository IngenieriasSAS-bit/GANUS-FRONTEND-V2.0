# ADR-001 - Knowledge Studio como Núcleo de GANUS

**Código:** ADR-001

**Estado:** Aprobado

**Fecha:** Julio 2026

**Proyecto:** GANUS Enterprise Platform

---

# Contexto

Durante la evolución de GANUS se identificó la necesidad de unificar la interpretación del negocio dentro de un único componente responsable del conocimiento empresarial.

La documentación oficial del proyecto establece que la plataforma no debe comportarse como un conjunto de módulos independientes, sino como un Sistema Operativo Empresarial cuyo núcleo es Knowledge Studio.

---

# Decisión

Knowledge Studio será el único propietario del conocimiento empresarial de GANUS.

Todos los módulos deberán publicar información hacia Knowledge Studio o consumir conocimiento generado por él.

Ningún módulo diferente a Knowledge Studio podrá definir de forma independiente:

- Objetivos Estratégicos
- Indicadores Oficiales
- Reglas Empresariales
- Hallazgos
- Riesgos
- Oportunidades
- Recomendaciones

---

# Consecuencias

Esta decisión permite:

- Evitar duplicidad de lógica empresarial.
- Mantener un único modelo de conocimiento.
- Facilitar la integración con motores de Inteligencia Artificial.
- Reducir el acoplamiento entre módulos.
- Preparar la plataforma para futuras integraciones.

---

# Estado de implementación

Actualmente esta decisión se encuentra en proceso de implementación mediante la creación del Core Empresarial de GANUS.