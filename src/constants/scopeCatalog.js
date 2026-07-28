/**
 * ==========================================================
 * Catálogo Maestro de Contexto Operativo
 * GANUS
 * ==========================================================
 */

export const enterpriseGroups = [

    {

        id: 1,

        name: "GANUS Demo",

    },

];

export const farms = [

    {

        id: 1,

        groupId: 1,

        name: "Finca La Esperanza",

    },

    {

        id: 2,

        groupId: 1,

        name: "Finca El Roble",

    },

    {

        id: 3,

        groupId: 1,

        name: "Finca San Miguel",

    },

];

export const lots = [

    {

        id: 1,

        farmId: 1,

        name: "Lote Norte",

    },

    {

        id: 2,

        farmId: 1,

        name: "Lote Central",

    },

    {

        id: 3,

        farmId: 2,

        name: "Potrero A",

    },

    {

        id: 4,

        farmId: 2,

        name: "Potrero B",

    },

    {

        id: 5,

        farmId: 3,

        name: "Lote Principal",

    },

];

export const areas = [

    {

        id: 1,

        lotId: 1,

        name: "Corral 1",

    },

    {

        id: 2,

        lotId: 1,

        name: "Corral 2",

    },

    {

        id: 3,

        lotId: 2,

        name: "Zona de Pesaje",

    },

    {

        id: 4,

        lotId: 3,

        name: "Sala de Ordeño",

    },

    {

        id: 5,

        lotId: 5,

        name: "Potrero Occidental",

    },

];

export const scopeTypes = [

    {

        id: "all",

        name: "Todo el contexto",

    },

    {

        id: "location",

        name: "Ubicación específica",

    },

    {

        id: "sample",

        name: "Por muestra (%)",

    },

    {

        id: "range",

        name: "Por rango",

    },

];