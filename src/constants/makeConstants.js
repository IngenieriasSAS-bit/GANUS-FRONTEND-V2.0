/* ==========================================================
   MAKE
   CONSTANTES
========================================================== */

export const ROUTINE_STATUS = {

    DRAFT: "draft",

    ACTIVE: "active",

    PAUSED: "paused",

    FINISHED: "finished",

    CANCELLED: "cancelled",

};

export const ORDER_STATUS = {

    PENDING: "pending",

    ASSIGNED: "assigned",

    SCHEDULED: "scheduled",

    IN_PROGRESS: "in_progress",

    PAUSED: "paused",

    COMPLETED: "completed",

    CLOSED: "closed",

    CANCELLED: "cancelled",

    EXPIRED: "expired",

};

/* ==========================================================
   TRANSICIONES PERMITIDAS
========================================================== */

export const ORDER_TRANSITIONS = {

    [ORDER_STATUS.PENDING]: [

    ORDER_STATUS.IN_PROGRESS,

    ORDER_STATUS.CANCELLED,

],
    /*
    [ORDER_STATUS.ASSIGNED]: [

        ORDER_STATUS.SCHEDULED,

        ORDER_STATUS.CANCELLED,

    ],
    */ 
    /*
[ORDER_STATUS.SCHEDULED]: [

    ORDER_STATUS.IN_PROGRESS,

    ORDER_STATUS.CANCELLED,

    ORDER_STATUS.EXPIRED,

],
*/

    [ORDER_STATUS.IN_PROGRESS]: [

        ORDER_STATUS.PAUSED,

        ORDER_STATUS.COMPLETED,

    ],

    [ORDER_STATUS.PAUSED]: [

        ORDER_STATUS.IN_PROGRESS,

        ORDER_STATUS.CANCELLED,

    ],

    [ORDER_STATUS.COMPLETED]: [

        ORDER_STATUS.CLOSED,

    ],

    [ORDER_STATUS.CLOSED]: [],

    [ORDER_STATUS.CANCELLED]: [],

    [ORDER_STATUS.EXPIRED]: [],

};

export const ROUTINE_PRIORITY = [

    "low",

    "medium",

    "high",

    "critical",

];

export const createRoutine = () => ({

    id: crypto.randomUUID(),

    name: "",

    description: "",

    templateId: "",

    templateName: "",

    consumerModule: "",

    contextType: "",

    contextValue: "",

    priority: "medium",

    status: ROUTINE_STATUS.DRAFT,

    operators: [],

    schedule: {

        enabled: true,

        startDate: "",

        frequency: 1,

        unit: "days",

        repeat: true,

        specificDays: [],

        endDate: "",

        maxExecutions: "",

    },

    scope: {

        type: "",

        filters: [],

    },

    statistics: {

        totalOrders: 0,

        pendingOrders: 0,

        completedOrders: 0,

        cancelledOrders: 0,

    },

    history: [],

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

});

/* ==========================================================
   CREAR ORDEN DE TRABAJO
========================================================== */

export const createWorkOrder = () => ({

    id: crypto.randomUUID(),

    routineId: "",

    routineName: "",

    templateId: "",

    templateName: "",

    consumerModule: "",

    contextType: "",

    contextValue: "",

    priority: "medium",

    status: ORDER_STATUS.PENDING,

    assignedOperators: [],

    plannedDate: "",

    startedAt: null,

    finishedAt: null,

    observations: "",

    evidence: [],

    history: [],

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

});