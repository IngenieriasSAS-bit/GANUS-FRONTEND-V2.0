import {
    getPublishedFieldEngineTemplates,
} from "./fieldEngineService";

import {

    createRoutine,

    createWorkOrder,

    ORDER_TRANSITIONS,
} from "../constants/makeConstants";

import {
    createFieldEngineResponse,
} from "./fieldEngineResponseService";

import {
    getPublishedTemplateById,
} from "./fieldEngineService";


/* ==========================================================
   MAKE SERVICE
   ========================================================== */

const STORAGE_KEYS = {

    routines: "ganus_make_routines",

    workOrders: "ganus_make_work_orders",

};

/* ==========================================================
   STORAGE
   ========================================================== */

const readStorage = (key, fallback) => {

    try {

        const value = localStorage.getItem(key);

        if (!value) {

            localStorage.setItem(
                key,
                JSON.stringify(fallback)
            );

            return fallback;

        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            `MAKE no pudo leer ${key}`,
            error
        );

        return fallback;

    }

};

const writeStorage = (key, value) => {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

    window.dispatchEvent(
        new Event("make-updated")
    );

    return value;

};

/* ==========================================================
   RUTINAS
   ========================================================== */

export const getMakeRoutines = () =>

    readStorage(
        STORAGE_KEYS.routines,
        []
    );

export const saveMakeRoutine = (routine) => {

    const routines =
        getMakeRoutines();

    const exists = routines.some(

        item => item.id === routine.id

    );

    const updatedRoutine = {

        ...routine,

        updatedAt:
            new Date().toISOString(),

    };

    const next = exists

        ? routines.map(item =>

              item.id === routine.id

                  ? updatedRoutine

                  : item

          )

        : [

              updatedRoutine,

              ...routines,

          ];

    writeStorage(

        STORAGE_KEYS.routines,

        next

    );

    return updatedRoutine;

};

export const deleteMakeRoutine = (

    routineId

) => {

    const routines =
        getMakeRoutines();

    writeStorage(

        STORAGE_KEYS.routines,

        routines.filter(

            routine =>

                routine.id !== routineId

        )

    );

};

/* ==========================================================
   CONSULTAR RUTINA
========================================================== */

export const getRoutineById = (routineId) => {

    return getMakeRoutines().find(

        routine => routine.id === routineId

    ) || null;

};

/* ==========================================================
   ACTUALIZAR RUTINA
========================================================== */

export const updateRoutine = (

    routineId,

    changes

) => {

    const routine =

        getRoutineById(routineId);

    if (!routine) {

        throw new Error(

            "La rutina no existe."

        );

    }

    return saveMakeRoutine({

        ...routine,

        ...changes,

        updatedAt: new Date().toISOString(),

    });

};

/* ==========================================================
   CAMBIAR ESTADO
========================================================== */

export const changeRoutineStatus = (

    routineId,

    status

) =>

    updateRoutine(

        routineId,

        {

            status,

        }

    );

/* ==========================================================
   ORDENES
   ========================================================== */

export const getWorkOrders = () =>

    

    readStorage(

        STORAGE_KEYS.workOrders,

        []

    );

    /* ==========================================================
   FILTRAR ÓRDENES DE TRABAJO
========================================================== */

export const getFilteredWorkOrders = (

    filters = {}

) => {

    const {

        status,

        priority,

        routineId,

        operator,

    } = filters;

    return getWorkOrders().filter(order => {

        if (

            status &&

            order.status !== status

        ) {

            return false;

        }

        if (

            priority &&

            order.priority !== priority

        ) {

            return false;

        }

        if (

            routineId &&

            order.routineId !== routineId

        ) {

            return false;

        }

        if (

            operator &&

            !order.assignedOperators?.includes(

                operator

            )

        ) {

            return false;

        }

        return true;

    });

};

/* ==========================================================
   RESUMEN DE ÓRDENES
========================================================== */

export const getWorkOrdersSummary = () => {

    const orders =

        getWorkOrders();

    return {

        total:

            orders.length,

        pending:

            orders.filter(

                order =>

                    order.status === "pending"

            ).length,

        assigned:

            orders.filter(

                order =>

                    order.status === "assigned"

            ).length,

        scheduled:

            orders.filter(

                order =>

                    order.status === "scheduled"

            ).length,

        inProgress:

            orders.filter(

                order =>

                    order.status === "in_progress"

            ).length,

        paused:

            orders.filter(

                order =>

                    order.status === "paused"

            ).length,

        completed:

            orders.filter(

                order =>

                    order.status === "completed"

            ).length,

        cancelled:

            orders.filter(

                order =>

                    order.status === "cancelled"

            ).length,

    };

};

export const saveWorkOrders = (

    orders

) =>

    writeStorage(

        STORAGE_KEYS.workOrders,

        orders

    );

/* ==========================================================
   PLANTILLAS DISPONIBLES
   ========================================================== */

export const getAvailableTemplates = () =>

    getPublishedFieldEngineTemplates();

    /* ==========================================================
   METADATA DE PLANTILLA
========================================================== */

export const getTemplateMetadata = (template) => {

    if (!template) {

        return null;

    }

    const totalSections =

        template.sections?.length || 0;

    const totalFields =

        template.sections?.reduce(

            (total, section) =>

                total +

                (section.fields?.length || 0),

            0

        ) || 0;

    return {

        id: template.id,

        name: template.name,

        description: template.description,

        version: template.version,

        state: template.state,

        consumerModule:

            template.consumerModule ||

            "No definido",

        contextType:

            template.contextType ||

            "-",

        contextValue:

            template.contextValue ||

            "-",

        totalSections,

        totalFields,

        createdAt:

            template.createdAt,

        updatedAt:

            template.updatedAt,

        publishedAt:

            template.publishedAt,

    };

};

/* ==========================================================
   CREAR RUTINA DESDE UNA PLANTILLA
========================================================== */

export const createRoutineFromTemplate = (
    templateId,
    configuration = {}
) => {

    const templates =
        getPublishedFieldEngineTemplates();

    const template =
        templates.find(
            item => item.id === templateId
        );

    if (!template) {

        throw new Error(
            "La plantilla seleccionada no existe o no está publicada."
        );

    }

    const routine =
        createRoutine();

    routine.name =
        configuration.name ||
        template.name;

    routine.description =
        configuration.description ||
        template.description ||
        "";

    routine.templateId =
        template.id;

    routine.templateName =
        template.name;

    /*
    ===========================================
    CONTEXTO HEREDADO DEL FIELD ENGINE
    ===========================================
    */

    routine.consumerModule =
        template.consumerModule || "";

    routine.contextType =
        template.contextType || "";

    routine.contextValue =
        template.contextValue || "";

    /*
    ===========================================
    CONFIGURACIÓN DE NEGOCIO
    ===========================================
    */

    routine.priority =
        configuration.priority ||
        "medium";

    routine.status =
        configuration.status ||
        "draft";

    routine.scope =
        configuration.scope ||
        routine.scope;

    routine.schedule =
        configuration.schedule ||
        routine.schedule;

    routine.operators =
        configuration.operators ||
        [];

    /*
    ===========================================
    GUARDAR
    ===========================================
    */

    saveMakeRoutine(
        routine
    );

    return routine;

};


/* ==========================================================
   DASHBOARD
   ========================================================== */

export const getMakeDashboard = () => {

    const routines =
        getMakeRoutines();

    const orders =
        getWorkOrders();

    return {

        totalRoutines:
            routines.length,

        activeRoutines:

            routines.filter(

                routine =>

                    routine.status ===
                    "active"

            ).length,

        pausedRoutines:

            routines.filter(

                routine =>

                    routine.status ===
                    "paused"

            ).length,

        totalOrders:
            orders.length,

        pendingOrders:

            orders.filter(

                order =>

                    order.status ===
                    "pending"

            ).length,

        inProgressOrders:

            orders.filter(

                order =>

                    order.status ===
                    "in_progress"

            ).length,

        completedOrders:

            orders.filter(

                order =>

                    order.status ===
                    "completed"

            ).length,

        templates:

            getPublishedFieldEngineTemplates(),

        routines,

        orders,

    };

};

/* ==========================================================
   VALIDAR RUTINA
========================================================== */

export const validateRoutine = (routine) => {

    const errors = [];

    if (!routine.templateId && !routine.template?.id) {

        errors.push("Debe seleccionar una plantilla.");

    }

    if (!routine.scope) {

        errors.push("Debe configurar el alcance.");

    }

    if (

        !routine.operators ||

        routine.operators.length === 0

    ) {

        errors.push(

            "Debe asignar al menos un operador."

        );

    }

    if (

        !routine.schedule ||

        !routine.schedule.frequency

    ) {

        errors.push(

            "Debe definir una programación."

        );

    }

    return {

        valid: errors.length === 0,

        errors,

    };

};

/* ==========================================================
   GENERAR ORDEN DE TRABAJO
========================================================== */

export const generateWorkOrder = (

    routineId

) => {

    const routine =

        getRoutineById(routineId);

    if (!routine) {

        throw new Error(

            "La rutina seleccionada no existe."

        );

    }

    /*
==========================================
VALIDACIONES DE NEGOCIO
==========================================
*/

const validation = validateRoutine(routine);

if (!validation.valid) {

    throw new Error(

        validation.errors.join("\n")

    );

}

if (

    routine.status !== "active"

) {

    throw new Error(

        "Solo las rutinas activas pueden generar órdenes de trabajo."

    );

}

if (

    !routine.templateId

) {

    throw new Error(

        "La rutina no tiene una plantilla asociada."

    );

}

if (

    !routine.schedule?.startDate

) {

    throw new Error(

        "Debe existir una fecha programada."

    );

}

    const order =

        createWorkOrder();

    /*
    ==========================================
    HERENCIA DE LA RUTINA
    ==========================================
    */

    order.routineId =

        routine.id;

    order.routineName =

        routine.name;

    order.templateId =

        routine.templateId;

    order.templateName =

        routine.templateName;

    order.consumerModule =

        routine.consumerModule;

    order.contextType =

        routine.contextType;

    order.contextValue =

        routine.contextValue;

    order.priority =

        routine.priority;

    /*
    ==========================================
    OPERADORES
    ==========================================
    */

    order.assignedOperators = (routine.operators || []).map((operator) => ({

    id: operator.id,

    nombre: operator.nombre,

    rol: operator.rol,

}));

    /*
    ==========================================
    PROGRAMACIÓN
    ==========================================
    */

    order.plannedDate =

        routine.schedule?.startDate || "";

       /*
==========================================
EJECUCIÓN
==========================================
*/

order.execution = {

    startedAt: null,

    finishedAt: null,

    lastSavedAt: null,

    completedBy: null,

    progress: 0,

    responses: {},

}; 

    /*
    ==========================================
    HISTORIAL
    ==========================================
    */

    order.history = [];

order.history.push({

    id: crypto.randomUUID(),

    action: "created",

    date: new Date().toISOString(),

    description:
        "Orden creada desde MAKE."

});

    /*
    ==========================================
    GUARDAR
    ==========================================
    */

    const orders =

        getWorkOrders();

    saveWorkOrders([

        order,

        ...orders,

    ]);

    /*
    ==========================================
    ACTUALIZAR ESTADÍSTICAS
    ==========================================
    */

    updateRoutine(

        routine.id,

        {

            statistics: {

                ...routine.statistics,

                totalOrders:

                    (routine.statistics

                        ?.totalOrders || 0) + 1,

                pendingOrders:

                    (routine.statistics

                        ?.pendingOrders || 0) + 1,

            },

        }

    );

    return order;

};

/* ==========================================================
   CAMBIAR ESTADO DE UNA ORDEN
========================================================== */

export const changeWorkOrderStatus = (

    orderId,

    newStatus

) => {

    const orders =

        getWorkOrders();

    const order =

        orders.find(

            item => item.id === orderId

        );

    if (!order) {

        throw new Error(

            "La orden no existe."

        );

    }

    /*
==========================================
VALIDAR TRANSICIÓN
==========================================
*/

const allowedTransitions =

    ORDER_TRANSITIONS[

        order.status

    ] || [];

if (

    !allowedTransitions.includes(

        newStatus

    )

) {

    throw new Error(

        `No es posible cambiar una orden desde "${order.status}" hacia "${newStatus}".`

    );

}

    const updatedOrder = {

        ...order,

        status: newStatus,

        updatedAt:

            new Date().toISOString(),

        history: [

            ...(order.history || []),

            {

                id: crypto.randomUUID(),

                action: "status-change",

                status: newStatus,

                date: new Date().toISOString(),

            },

        ],

    };

    saveWorkOrders(

        orders.map(item =>

            item.id === orderId

                ? updatedOrder

                : item

        )

    );

    return updatedOrder;

};

/* ==========================================================
   INICIAR EJECUCIÓN DE UNA ORDEN
========================================================== */

export const startWorkOrder = (orderId) => {

    const orders = getWorkOrders();

    const order = orders.find(
        item => item.id === orderId
    );

    if (!order) {
        throw new Error("La orden no existe.");
    }

    /*
    ==========================================
    SI YA ESTÁ EN EJECUCIÓN
    NO HACER NADA
    ==========================================
    */

    if (order.status === "in_progress") {
        return order;
    }

    /*
    ==========================================
    CREAR CONTEXTO DE EJECUCIÓN
    ==========================================
    */

    if (!order.execution) {

        order.execution = {

            startedAt: null,
            finishedAt: null,
            lastSavedAt: null,
            completedBy: null,
            progress: 0,
            responses: {},

        };

    }

    /*
    ==========================================
    FECHA DE INICIO
    ==========================================
    */

    if (!order.execution.startedAt) {

        order.execution.startedAt =
            new Date().toISOString();
          order.history = order.history || [];
           order.history.push({

    id: crypto.randomUUID(),

    action: "started",

    date: new Date().toISOString(),

    description: "La ejecución de la orden fue iniciada."

}); 
    }

    /*
    ==========================================
    GUARDAR EJECUCIÓN
    ==========================================
    */

    saveWorkOrders(

        orders.map(item =>

            item.id === orderId

                ? order

                : item

        )

    );

    /*
    ==========================================
    CAMBIAR ESTADO
    ==========================================
    */

    return changeWorkOrderStatus(

        orderId,

        "in_progress"

    );

};

export const pauseWorkOrder = (orderId) => {

    const orders = getWorkOrders();

    const order = orders.find(
        item => item.id === orderId
    );

    if (!order) {
        throw new Error("La orden no existe.");
    }

    if (order.status === "paused") {
        return order;
    }

    return changeWorkOrderStatus(
        orderId,
        "paused"
    );

};

export const resumeWorkOrder = (orderId) => {

    const orders = getWorkOrders();

    const order = orders.find(
        item => item.id === orderId
    );

    if (!order) {
        throw new Error("La orden no existe.");
    }

    if (order.status === "in_progress") {
        return order;
    }

    return changeWorkOrderStatus(
        orderId,
        "in_progress"
    );

};

/* ==========================================================
   GUARDAR AVANCE DE LA ORDEN
========================================================== */

export const saveWorkOrderExecution = (

    orderId,

    responses,

    progress = 0

) => {

    const orders = getWorkOrders();

    const updatedOrders = orders.map(order => {

        if (order.id !== orderId) {

            return order;

        }

        return {

            ...order,

            history: [

    ...(order.history || []),

    {

        id: crypto.randomUUID(),

        action: "saved",

        date: new Date().toISOString(),

        description:
            "Se guardó el progreso de la ejecución."

    }

],

            execution: {

                ...order.execution,

                responses,

                progress,

                lastSavedAt:

                    new Date().toISOString(),

            },

        };

    });

    saveWorkOrders(updatedOrders);

};

/* ==========================================================
   FINALIZAR ORDEN
========================================================== */

export const finishWorkOrderExecution = (
    orderId,
    responses,
    completedBy = null
) => {

    const orders = getWorkOrders();

    const updatedOrders = orders.map((order) => {

        if (order.id !== orderId) {
            return order;
        }

        const template = getPublishedTemplateById(
            order.templateId
        );

        let fieldEngineResponse = null;

        if (template) {

            fieldEngineResponse =
                createFieldEngineResponse({

                    template,

                    values: responses,

                    context: {

                        primaryAsset:
                            order.contextValue || null,

                        secondaryAsset: null,

                        responsible:
                            order.assignedOperators || null,

                        location: null,

                        eventDate:
                            new Date().toISOString(),

                        recordCode:
                            order.id,

                    },

                });

        }

        return {

            ...order,

history: [

    ...(order.history || []),

    {

        id: crypto.randomUUID(),

        action: "completed",

        date: new Date().toISOString(),

        description:
            "La orden fue finalizada."

    }

],

            execution: {

                ...order.execution,

                responses,

                progress: 100,

                completedBy,

                finishedAt:
                    new Date().toISOString(),

                lastSavedAt:
                    new Date().toISOString(),

                fieldEngineResponseId:
                    fieldEngineResponse?.id || null,

            },

        };

    });

    

    saveWorkOrders(updatedOrders);

    return changeWorkOrderStatus(
        orderId,
        "completed"
    );

};