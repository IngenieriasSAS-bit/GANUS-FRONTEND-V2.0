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

import { CreateOrganizationGroup } from "../core/organization/usecases/CreateOrganizationGroup";
import { CreateFarm } from "../core/organization/usecases/CreateFarm";
import { AssignFarmToGroup } from "../core/organization/usecases/AssignFarmToGroup";
import {
  toDomain,
  toViewModel,
} from "../mappers/organization/GroupMapper";
import {
  toDomain as farmToDomain,
  toViewModel as farmToViewModel,
} from "../mappers/organization/FarmMapper";

/**
 * Obtiene toda la información de Organización.
 */
export function obtenerDatosOrganizacion() {
  const organizacion = obtenerOrganizacion();

  return organizacion.groups.map((grupo) => ({
    id: grupo.id,
    nombre: grupo.name,
    descripcion: grupo.description,
    estado: grupo.active ? "Activo" : "Inactivo",
    fincas: grupo.farms?.length ?? 0,
  }));
}

/**
 * Crea un Grupo Empresarial.
 */
export function crearGrupoEmpresarial(datosFormulario) {
  const organizacion = obtenerOrganizacion();

  const grupoDTO = toDomain(datosFormulario);

  const useCase = new CreateOrganizationGroup();

  const grupo = useCase.execute(
    grupoDTO,
    organizacion.groups
  );

  organizacion.groups.push(grupo);

  guardarOrganizacion(organizacion);

  return toViewModel(grupo);
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

        rol: datosFormulario.rol,

        estado: datosFormulario.estado,

        activo: datosFormulario.estado === "Activo",

        createdAt: new Date(),

        updatedAt: new Date(),

    };

    organizacion.users.push(usuario);

    guardarOrganizacion(organizacion);

    return {

        id: usuario.id,

        nombre: usuario.nombre,

        correo: usuario.correo,

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

        id: crypto.randomUUID(),

        nombre: datosFormulario.nombre.trim(),

        descripcion: datosFormulario.descripcion.trim(),

        estado: datosFormulario.estado,

        permisos: 0,

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

    };

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

    usuario.rol = datosFormulario.rol;

    usuario.estado = datosFormulario.estado;

    usuario.updatedAt = new Date();

    guardarOrganizacion(organizacion);

    return {

        id: usuario.id,

        nombre: usuario.nombre,

        correo: usuario.correo,

        rol: usuario.rol,

        estado: usuario.estado,

    };

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

        estado: grupo.active ? "Activo" : "Inactivo",

        totalFincas: grupo.farms?.length ?? 0,

    }));

}

/**
 * ==========================================================
 * Obtener todas las fincas
 * ==========================================================
 */
export function obtenerFincas() {

    const organizacion = obtenerOrganizacion();

    return organizacion.farms.map((finca) => ({

        id: finca.id,

        nombre: finca.name,

        grupoId: finca.groupId,

        ubicacion: finca.location,

        estado: finca.active ? "Activo" : "Inactivo",

    }));

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

export const getUsersByIds = (ids = []) => {

    const users = obtenerUsuarios();

    return users.filter(user => ids.includes(user.id));

};