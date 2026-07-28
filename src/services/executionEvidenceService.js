/* ==========================================================
   EXECUTION EVIDENCE SERVICE
========================================================== */

const STORAGE_KEY = "ganus_execution_evidences";

/* ==========================================================
   HELPERS
========================================================== */

const readStorage = () => {

    try {

        return JSON.parse(

            localStorage.getItem(STORAGE_KEY)

        ) || [];

    } catch {

        return [];

    }

};

const writeStorage = (data) => {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

};

/* ==========================================================
   CONSULTAS
========================================================== */

export const getExecutionEvidences = () => {

    return readStorage();

};

export const getExecutionEvidencesByOrder = (

    orderId

) => {

    return readStorage().filter(

        evidence => evidence.orderId === orderId

    );

};

/* ==========================================================
   CREAR
========================================================== */

export const saveExecutionEvidence = (

    orderId,

    file

) => {

    const evidences = readStorage();

    const newEvidence = {

        id: crypto.randomUUID(),

        orderId,

        name: file.name,

        type: file.type,

        size: file.size,

        uploadedAt: new Date().toISOString(),

        status: "uploaded",

    };

    evidences.push(newEvidence);

    writeStorage(evidences);

    return newEvidence;

};

/* ==========================================================
   ELIMINAR
========================================================== */

export const deleteExecutionEvidence = (

    evidenceId

) => {

    const evidences = readStorage().filter(

        evidence => evidence.id !== evidenceId

    );

    writeStorage(evidences);

};