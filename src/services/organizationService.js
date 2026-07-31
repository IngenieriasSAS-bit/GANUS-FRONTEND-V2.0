/**
 * ---------------------------------------------------------
 * Servicio: organizationService
 * Módulo: Organización
 *
 * Responsabilidad:
 * Orquestar los casos de uso del Core y la persistencia.
 * ---------------------------------------------------------
 */

import {
  obtenerOrganizacion,
  guardarOrganizacion,
} from "./organizationStorageService";
import permisos from "../data/permisos";

import { CreateOrganizationGroup } from "../core/organization/usecases/CreateOrganizationGroup";
import { CreateFarm } from "../core/organization/usecases/CreateFarm";
import { AssignFarmToGroup } from "../core/organization/usecases/AssignFarmToGroup";
import { RegisterBusinessProfile } from "../core/organization/usecases/RegisterBusinessProfile";

import {
  toDomain,
  toViewModel,
} from "../mappers/organization/GroupMapper";
import {
  toDomain as farmToDomain,
  toViewModel as farmToViewModel,
} from "../mappers/organization/FarmMapper";

import { CreateBusinessProcess } from "../core/organization/usecases/CreateBusinessProcess";
import { CreateActivityType } from "../core/organization/usecases/CreateActivityType";

/**
 * Obtiene toda la información de Organización.
 */
export function obtenerDatosOrganizacion() {

    const organizacion = obtenerOrganizacion();

    return organizacion.groups.map((grupo) => ({

    id: grupo.id,

    nombre: grupo.name,

    descripcion: grupo.description,

    sector:
        grupo.businessProfile?.sector ?? "",

    industria:
        grupo.businessProfile?.industry ?? "",

    tipoNegocio:
        grupo.businessProfile?.businessType ?? "",

    modeloProduccion:
        grupo.businessProfile?.productionModel ?? "",

    estado:
        grupo.active ? "Activo" : "Inactivo",

    fincas: organizacion.farms.filter(

        (finca) => finca.organizationGroupId === grupo.id

    ).length,

}));

}

/**
 * Crea un Grupo Empresarial.
 */
export function crearGrupoEmpresarial(datosFormulario) {
  const organizacion = obtenerOrganizacion();

  const grupoDTO = toDomain(datosFormulario);

grupoDTO.businessProfile = {

    sector:
        datosFormulario.sector ?? "",

    industry:
        datosFormulario.industria ?? "",

    businessType:
        datosFormulario.tipoNegocio ?? "",

    productionModel:
        datosFormulario.modeloProduccion ?? "",

    description: "",

    strategicObjectives: [],

    active: true,

};

  const useCase = new CreateOrganizationGroup();

  const grupo = useCase.execute(
    grupoDTO,
    organizacion.groups
  );

  if (grupo.businessProfile) {

    const registerBusinessProfile =
        new RegisterBusinessProfile();

    registerBusinessProfile.execute(
        grupo,
        grupo.businessProfile
    );

}

  organizacion.groups.push(grupo);

  guardarOrganizacion(organizacion);

  return {

    ...toViewModel(grupo),

    sector:
        grupo.businessProfile?.sector ?? "",

    industria:
        grupo.businessProfile?.industry ?? "",

    tipoNegocio:
        grupo.businessProfile?.businessType ?? "",

    modeloProduccion:
        grupo.businessProfile?.productionModel ?? "",

};
}

/**
 * ==========================================================
 * Actualizar Grupo Empresarial
 * ==========================================================
 */
export function actualizarGrupoEmpresarial(id, datosFormulario) {

    const organizacion = obtenerOrganizacion();

    const grupo = organizacion.groups.find(
        (item) => item.id === id
    );

    if (!grupo) {

        throw new Error(
            "Grupo Empresarial no encontrado."
        );

    }

    

    grupo.name = datosFormulario.nombre.trim();

grupo.description =
    datosFormulario.descripcion.trim();

grupo.active =
    datosFormulario.estado === "Activo";

grupo.businessProfile = {

    ...grupo.businessProfile,

    sector:
        datosFormulario.sector ??
        grupo.businessProfile?.sector ??
        "",

    industry:
        datosFormulario.industria ??
        grupo.businessProfile?.industry ??
        "",

    businessType:
        datosFormulario.tipoNegocio ??
        grupo.businessProfile?.businessType ??
        "",

    productionModel:
        datosFormulario.modeloProduccion ??
        grupo.businessProfile?.productionModel ??
        "",

};

    grupo.updatedAt = new Date();

    guardarOrganizacion(organizacion);

    return {

    id: grupo.id,

    nombre: grupo.name,

    descripcion: grupo.description,

    sector:
        grupo.businessProfile?.sector ?? "",

    industria:
        grupo.businessProfile?.industry ?? "",

    tipoNegocio:
        grupo.businessProfile?.businessType ?? "",

    modeloProduccion:
        grupo.businessProfile?.productionModel ?? "",

    estado:
        grupo.active
            ? "Activo"
            : "Inactivo",

    fincas: organizacion.farms.filter(
        (finca) => finca.organizationGroupId === grupo.id
    ).length,

};

}

export function registrarPerfilEmpresarial(groupId, profile) {

    const organizacion = obtenerOrganizacion();

    const grupo = organizacion.groups.find(
        item => item.id === groupId
    );

    if (!grupo) {
        throw new Error("Grupo Empresarial no encontrado.");
    }

    const useCase = new RegisterBusinessProfile();

    useCase.execute(
        grupo,
        profile
    );

    guardarOrganizacion(organizacion);

    return grupo;

}

/**
 * ==========================================================
 * Desactivar Grupo Empresarial
 * ==========================================================
 */
export function desactivarGrupoEmpresarial(id) {

    const organizacion = obtenerOrganizacion();

    const grupo = organizacion.groups.find(
        (item) => item.id === id
    );

    if (!grupo) {

        throw new Error(
            "Grupo Empresarial no encontrado."
        );

    }

    grupo.active = false;

    grupo.updatedAt = new Date();

    guardarOrganizacion(organizacion);

}

/**
 * Crea una finca.
 */
export function crearFinca(datosFormulario) {

  const organizacion = obtenerOrganizacion();

  // ==========================================
  // Buscar el Grupo Empresarial por nombre
  // ==========================================

  const grupo = organizacion.groups.find(

    (item) =>

      item.name.trim().toLowerCase() ===
      datosFormulario.grupoEmpresarial.trim().toLowerCase()

  );

  if (!grupo) {

    throw new Error(
      "Debe seleccionar un Grupo Empresarial válido."
    );

  }

  // ==========================================
  // DTO para el Core
  // ==========================================

  const fincaDTO = farmToDomain(
    datosFormulario,
    grupo.id
);

  const useCase = new CreateFarm();

  const finca = useCase.execute(fincaDTO);

  organizacion.farms.push(finca);

  guardarOrganizacion(organizacion);

  // ==========================================
  // DTO para React
  // ==========================================

  return farmToViewModel(
    finca,
    grupo.name
);

}

/**
 * ---------------------------------------------------------
 * Crear Usuario
 * ---------------------------------------------------------
 */
export function crearUsuario(datosFormulario) {
    

    const organizacion = obtenerOrganizacion();

    const usuario = {

    id: crypto.randomUUID(),

    nombre: datosFormulario.nombre.trim(),

    correo: datosFormulario.correo.trim(),

    grupoEmpresarial:
        datosFormulario.grupoEmpresarial,

    finca:
        datosFormulario.finca,

    rol: datosFormulario.rol,

    estado: datosFormulario.estado,

    activo:
        datosFormulario.estado === "Activo",

    createdAt: new Date(),

    updatedAt: new Date(),

};

    organizacion.users.push(usuario);

    guardarOrganizacion(organizacion);

    return {

    id: usuario.id,

    nombre: usuario.nombre,

    correo: usuario.correo,

    grupoEmpresarial:
        usuario.grupoEmpresarial,

    finca:
        usuario.finca,

    rol: usuario.rol,

    estado: usuario.estado,

};

}

/**
 * Obtiene todos los usuarios.
 */
export function obtenerUsuarios() {

    const organizacion = obtenerOrganizacion();

    return organizacion.users.map((usuario) => ({

    id: usuario.id,

    nombre: usuario.nombre,

    correo: usuario.correo,

    grupoEmpresarial:
        usuario.grupoEmpresarial,

    finca:
        usuario.finca,

    rol: usuario.rol,

    estado: usuario.estado,

}));

}

/**
 * ---------------------------------------------------------
 * Obtiene todos los roles.
 * ---------------------------------------------------------
 */
export function obtenerRoles() {

    const organizacion = obtenerOrganizacion();

    return organizacion.roles.map((rol) => ({

        id: rol.id,

        nombre: rol.nombre,

        descripcion: rol.descripcion,

        estado: rol.estado,

        permisos: rol.permisos,

        totalUsuarios: organizacion.users.filter(

    (usuario) => usuario.rol === rol.nombre

).length,

        permisosDetalle: structuredClone(

            rol.permisosDetalle

        ),

    }));

}

/**
 * ---------------------------------------------------------
 * Crear Rol
 * ---------------------------------------------------------
 */
export function crearRol(datosFormulario) {

    const organizacion = obtenerOrganizacion();

    const rol = {

    id: Math.max(

    ...organizacion.roles.map((rol) => Number(rol.id) || 0)

) + 1,

    nombre: datosFormulario.nombre.trim(),

    descripcion: datosFormulario.descripcion.trim(),

    estado: datosFormulario.estado,

    permisos: permisos.reduce(

        (total, modulo) => {

            return total +

                Object.values(modulo)

                    .filter(

                        (valor) => valor === true

                    ).length;

        },

        0

    ),

    permisosDetalle: structuredClone(permisos),

    activo: datosFormulario.estado === "Activo",

    createdAt: new Date(),

    updatedAt: new Date(),

};

    organizacion.roles.push(rol);

    guardarOrganizacion(organizacion);

    return {

        id: rol.id,

        nombre: rol.nombre,

        descripcion: rol.descripcion,

        estado: rol.estado,

        permisos: rol.permisos,

    };

}

/**
 * ---------------------------------------------------------
 * Actualizar Rol
 * ---------------------------------------------------------
 */
export function actualizarRol(id, datosFormulario) {

    const organizacion = obtenerOrganizacion();

    const rol = organizacion.roles.find(
        (item) => item.id === id
    );

    if (!rol) {

        throw new Error(
            "Rol no encontrado."
        );

    }

    rol.nombre = datosFormulario.nombre.trim();

    rol.descripcion = datosFormulario.descripcion.trim();

    rol.estado = datosFormulario.estado;

    rol.updatedAt = new Date();

    guardarOrganizacion(organizacion);

    return {

    id: rol.id,

    nombre: rol.nombre,

    descripcion: rol.descripcion,

    estado: rol.estado,

    permisos: rol.permisos,

    permisosDetalle: structuredClone(

        rol.permisosDetalle

    ),

    totalUsuarios: 0,

};

}

export function desactivarRol(id) {

    const organizacion = obtenerOrganizacion();

    const rol = organizacion.roles.find(

        (item) => String(item.id) === String(id)

    );

    if (!rol) {

        throw new Error(

            "Rol no encontrado."

        );

    }

    rol.estado = "Inactivo";

    rol.activo = false;

    rol.updatedAt = new Date();

    guardarOrganizacion(

        organizacion

    );

}

/**
 * Actualiza un usuario.
 */
export function actualizarUsuario(id, datosFormulario) {

    const organizacion = obtenerOrganizacion();

    const usuario = organizacion.users.find(
        (item) => item.id === id
    );

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado."
        );

    }

    usuario.nombre = datosFormulario.nombre.trim();

    usuario.correo = datosFormulario.correo.trim();

    usuario.grupoEmpresarial = datosFormulario.grupoEmpresarial;

    usuario.finca = datosFormulario.finca;

    usuario.rol = datosFormulario.rol;

    usuario.estado = datosFormulario.estado;

    usuario.updatedAt = new Date();

    guardarOrganizacion(organizacion);

    return {

    id: usuario.id,

    nombre: usuario.nombre,

    correo: usuario.correo,

    grupoEmpresarial:
        usuario.grupoEmpresarial,

    finca:
        usuario.finca,

    rol: usuario.rol,

    estado: usuario.estado,

};

}

export function desactivarUsuario(id) {

    const organizacion = obtenerOrganizacion();

    const usuario = organizacion.users.find(
        (item) => item.id === id
    );

    if (!usuario) {

        throw new Error(
            "Usuario no encontrado."
        );

    }

    usuario.estado = "Inactivo";

    usuario.activo = false;

    usuario.updatedAt = new Date();

    guardarOrganizacion(organizacion);

}

/**
 * ---------------------------------------------------------
 * Obtener Permisos
 * ---------------------------------------------------------
 */
/**
 * ---------------------------------------------------------
 * Obtener permisos de un rol
 * ---------------------------------------------------------
 */
export function obtenerPermisos(rolId) {

    const organizacion = obtenerOrganizacion();

    const rol = organizacion.roles.find(

        (item) => item.id === rolId

    );

    if (!rol) {

        return [];

    }

    return structuredClone(

        rol.permisosDetalle ?? []

    );

}


/**
 * ---------------------------------------------------------
 * Guardar Permisos
 * ---------------------------------------------------------
 */
/**
 * ---------------------------------------------------------
 * Guardar permisos de un rol
 * ---------------------------------------------------------
 */
export function guardarPermisos(

    rolId,

    permisos

) {

    const organizacion = obtenerOrganizacion();

    const rol = organizacion.roles.find(

        (item) => item.id === rolId

    );

    if (!rol) {

        throw new Error(

            "Rol no encontrado."

        );

    }

    rol.permisosDetalle = structuredClone(

        permisos

    );

    rol.permisos = permisos.reduce(

        (total, modulo) => {

            return total +

                Object.values(modulo)

                    .filter(

                        (valor) => valor === true

                    ).length;

        },

        0

    );

    guardarOrganizacion(

        organizacion

    );

}

/**
 * Asigna una finca a un grupo.
 */
export function asignarFincaAGrupo(groupId, farmId) {

  const organizacion = obtenerOrganizacion();

  const grupo = organizacion.groups.find(
    (item) => item.id === groupId
  );

  if (!grupo) {
    throw new Error(
      "Grupo Empresarial no encontrado."
    );
  }

  const finca = organizacion.farms.find(
    (item) => item.id === farmId
  );

  if (!finca) {
    throw new Error(
      "Finca no encontrada."
    );
  }

  const useCase = new AssignFarmToGroup();

  useCase.execute(
    grupo,
    finca
  );

  guardarOrganizacion(organizacion);

  return grupo;

}

/**
 * ==========================================================
 * Obtener todos los grupos empresariales
 * ==========================================================
 */
export function obtenerGrupos() {

    const organizacion = obtenerOrganizacion();

    return organizacion.groups.map((grupo) => ({

    id: grupo.id,

    nombre: grupo.name,

    descripcion: grupo.description,

    sector:
        grupo.businessProfile?.sector ?? "",

    industria:
        grupo.businessProfile?.industry ?? "",

    tipoNegocio:
        grupo.businessProfile?.businessType ?? "",

    modeloProduccion:
        grupo.businessProfile?.productionModel ?? "",

    estado:
        grupo.active ? "Activo" : "Inactivo",

    totalFincas: organizacion.farms.filter((finca) => {

        if ("organizationGroupId" in finca) {

            return finca.organizationGroupId === grupo.id;

        }

        return finca.grupoEmpresarial === grupo.name;

    }).length,

}));

}

/**
 * ==========================================================
 * Obtener todas las fincas
 * ==========================================================
 */
export function obtenerFincas() {

    const organizacion = obtenerOrganizacion();

    return organizacion.farms.map((finca) => {

        // ==========================================
        // Compatibilidad con datos antiguos
        // ==========================================

        if ("nombre" in finca) {

    return {

        id: finca.id,

        nombre: finca.nombre ?? "",

        grupoEmpresarial:
            finca.grupoEmpresarial ?? "",

        direccion:
            finca.direccion ?? "",

        municipio:
            finca.municipio ?? "",

        departamento:
            finca.departamento ?? "",

        latitud:
            finca.latitud ?? "",

        longitud:
            finca.longitud ?? "",

        negocio:
            finca.negocio ?? "",

        sector:
            finca.sector ?? "",

        industria:
            finca.industria ?? "",

        estado:
            finca.estado ?? "Activo",

    };

}


        // ==========================================
        // Nuevo modelo del Core
        // ==========================================

        const grupo = organizacion.groups.find(

            (item) => item.id === finca.organizationGroupId

        );

        return {

            id: finca.id,

            nombre: finca.name ?? "",

            grupoEmpresarial:
                grupo?.name ?? "",

            municipio:
                finca.address?.municipio ?? "",

            departamento:
                finca.address?.departamento ?? "",

            estado:
                finca.active
                    ? "Activo"
                    : "Inactivo",

        };

    });

}

/**
 * ==========================================================
 * Actualizar Finca
 * ==========================================================
 */
export function actualizarFinca(id, datosFormulario) {

    const organizacion = obtenerOrganizacion();

    const finca = organizacion.farms.find((item) => {

        if ("nombre" in item) {
            return item.id === id;
        }

        return item.id === id;

    });

    if (!finca) {

        throw new Error("Finca no encontrada.");

    }

    // ===============================
    // Modelo antiguo
    // ===============================

    if ("nombre" in finca) {

        finca.nombre = datosFormulario.nombre.trim();

finca.grupoEmpresarial = datosFormulario.grupoEmpresarial;

finca.direccion = datosFormulario.direccion ?? "";

finca.municipio = datosFormulario.municipio;

finca.departamento = datosFormulario.departamento;

finca.latitud = datosFormulario.latitud ?? "";

finca.longitud = datosFormulario.longitud ?? "";

finca.negocio = datosFormulario.negocio ?? "";

finca.sector = datosFormulario.sector ?? "";

finca.industria = datosFormulario.industria ?? "";

finca.estado = datosFormulario.estado;

    }

    // ===============================
    // Modelo Core
    // ===============================

    else {

        const grupo = organizacion.groups.find(

            (item) =>

                item.name.trim().toLowerCase() ===
                datosFormulario.grupoEmpresarial.trim().toLowerCase()

        );

        if (!grupo) {

            throw new Error(
                "Grupo Empresarial no encontrado."
            );

        }

        finca.name = datosFormulario.nombre.trim();

        finca.organizationGroupId = grupo.id;

        finca.address = {

    direccion: datosFormulario.direccion,

    municipio: datosFormulario.municipio,

    departamento: datosFormulario.departamento,

};

finca.coordinates = {

    latitud: datosFormulario.latitud
        ? Number(datosFormulario.latitud)
        : null,

    longitud: datosFormulario.longitud
        ? Number(datosFormulario.longitud)
        : null,

};

finca.businessProfile = {

    negocio: datosFormulario.negocio,

    sector: datosFormulario.sector,

    industria: datosFormulario.industria,

};

        finca.active =
            datosFormulario.estado === "Activo";

        finca.updatedAt = new Date();

    }

    guardarOrganizacion(organizacion);

    return obtenerFincas().find(
        (item) => item.id === id
    );

}

/**
 * ==========================================================
 * Desactivar Finca
 * ==========================================================
 */
export function desactivarFinca(id) {

    const organizacion = obtenerOrganizacion();

    const finca = organizacion.farms.find(
        (item) => item.id === id
    );

    if (!finca) {

        throw new Error("Finca no encontrada.");

    }

    // Compatibilidad con ambos modelos

    if ("estado" in finca) {

        finca.estado = "Inactivo";

    } else {

        finca.active = false;

        finca.updatedAt = new Date();

    }

    guardarOrganizacion(organizacion);

}

/**
 * ---------------------------------------------------------
 * Resumen del módulo Organización
 * ---------------------------------------------------------
 */

export function obtenerResumenOrganizacion() {

    const organizacion = obtenerOrganizacion();

    return {

        grupos: organizacion.groups.length,

        fincas: organizacion.farms.length,

        usuarios: organizacion.users.length,

        roles: organizacion.roles.length,

    };

}

/**
 * ==========================================================
 * Obtener Procesos Empresariales
 * ==========================================================
 */

export function obtenerProcesos() {

    const organizacion =
        obtenerOrganizacion();

    return structuredClone(

        organizacion.processes ?? []

    );

}

/**
 * ==========================================================
 * Crear Proceso Empresarial
 * ==========================================================
 */

export function crearProceso(datosFormulario) {

    const organizacion =
        obtenerOrganizacion();

   const useCase = new CreateBusinessProcess();

const proceso = useCase.execute(
    {
        id: crypto.randomUUID(),

        code: datosFormulario.codigo.trim(),

        name: datosFormulario.nombre.trim(),

        description: datosFormulario.descripcion ?? "",

        active: datosFormulario.estado === "Activo",
    },
    organizacion.processes
);

    organizacion.processes.push(
        proceso
    );

    guardarOrganizacion(
        organizacion
    );

    return structuredClone(
        proceso
    );

}

/**
 * ==========================================================
 * Obtener Tipos de Actividad
 * ==========================================================
 */

export function obtenerTiposActividad() {

    const organizacion =
        obtenerOrganizacion();

    return structuredClone(

        organizacion.activityTypes ?? []

    );

}

/**
 * ==========================================================
 * Crear Tipo de Actividad
 * ==========================================================
 */

export function crearTipoActividad(
    datosFormulario
) {

    const organizacion =
        obtenerOrganizacion();

    const useCase = new CreateActivityType();

const tipo = useCase.execute(
    {
        id: crypto.randomUUID(),

        code: datosFormulario.codigo.trim(),

        name: datosFormulario.nombre.trim(),

        processId: datosFormulario.procesoId,

        description: datosFormulario.descripcion ?? "",

        active: datosFormulario.estado === "Activo",
    },
    organizacion.activityTypes
);

    organizacion.activityTypes.push(
        tipo
    );

    guardarOrganizacion(
        organizacion
    );

    return structuredClone(
        tipo
    );

}

/**
 * ==========================================================
 * Actualizar Proceso Empresarial
 * ==========================================================
 */

export function actualizarProceso(
    id,
    datosFormulario
) {

    const organizacion =
        obtenerOrganizacion();

    const proceso =
        organizacion.processes.find(
            (item) => item.id === id
        );

    if (!proceso) {

        throw new Error(
            "Proceso Empresarial no encontrado."
        );

    }

    proceso.code =
        datosFormulario.codigo.trim();

    proceso.name =
        datosFormulario.nombre.trim();

    proceso.description =
        datosFormulario.descripcion ?? "";

    proceso.active =
        datosFormulario.estado === "Activo";

    guardarOrganizacion(
        organizacion
    );

    return structuredClone(
        proceso
    );

}

/**
 * ==========================================================
 * Desactivar Proceso Empresarial
 * ==========================================================
 */

export function desactivarProceso(id) {

    const organizacion =
        obtenerOrganizacion();

    const proceso =
        organizacion.processes.find(
            (item) => item.id === id
        );

    if (!proceso) {

        throw new Error(
            "Proceso Empresarial no encontrado."
        );

    }

    proceso.active = false;

    guardarOrganizacion(
        organizacion
    );

}

/**
 * ==========================================================
 * Actualizar Tipo de Actividad
 * ==========================================================
 */

export function actualizarTipoActividad(
    id,
    datosFormulario
) {

    const organizacion =
        obtenerOrganizacion();

    const tipo =
        organizacion.activityTypes.find(
            (item) => item.id === id
        );

    if (!tipo) {

        throw new Error(
            "Tipo de Actividad no encontrado."
        );

    }

    tipo.code =
        datosFormulario.codigo.trim();

    tipo.name =
        datosFormulario.nombre.trim();

    tipo.processId =
        datosFormulario.procesoId;

    tipo.description =
        datosFormulario.descripcion ?? "";

    tipo.active =
        datosFormulario.estado === "Activo";

    guardarOrganizacion(
        organizacion
    );

    return structuredClone(
        tipo
    );

}

/**
 * ==========================================================
 * Desactivar Tipo de Actividad
 * ==========================================================
 */

export function desactivarTipoActividad(id) {

    const organizacion =
        obtenerOrganizacion();

    const tipo =
        organizacion.activityTypes.find(
            (item) => item.id === id
        );

    if (!tipo) {

        throw new Error(
            "Tipo de Actividad no encontrado."
        );

    }

    tipo.active = false;

    guardarOrganizacion(
        organizacion
    );

}

export const getUsersByIds = (ids = []) => {

    const users = obtenerUsuarios();

    return users.filter(user => ids.includes(user.id));

};