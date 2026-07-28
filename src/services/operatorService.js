const STORAGE_KEY = "ganus_operators";

const DEFAULT_OPERATORS = [

    {
        id: crypto.randomUUID(),
        code: "OP-001",
        name: "David Ramírez",
        position: "Técnico de Campo",
        phone: "3001234567",
        email: "david@ganus.com",
        status: "available",
    },

    {
        id: crypto.randomUUID(),
        code: "OP-002",
        name: "Juan Pérez",
        position: "Inspector",
        phone: "3009876543",
        email: "juan@ganus.com",
        status: "available",
    },

    {
        id: crypto.randomUUID(),
        code: "OP-003",
        name: "Carlos Gómez",
        position: "Supervisor",
        phone: "3015555555",
        email: "carlos@ganus.com",
        status: "busy",
    },

];

function save(data){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

    window.dispatchEvent(

        new Event("operators-updated")

    );

}

export function getOperators(){

    const stored = localStorage.getItem(STORAGE_KEY);

    if(!stored){

        save(DEFAULT_OPERATORS);

        return DEFAULT_OPERATORS;

    }

    return JSON.parse(stored);

}

export function getOperatorById(id){

    return getOperators().find(

        operator => operator.id === id

    );

}

export function createOperator(operator){

    const operators = getOperators();

    const newOperator = {

        id: crypto.randomUUID(),

        ...operator,

    };

    operators.push(newOperator);

    save(operators);

    return newOperator;

}

export function updateOperator(id,data){

    const operators = getOperators();

    const updated = operators.map(operator=>{

        if(operator.id!==id){

            return operator;

        }

        return{

            ...operator,

            ...data,

        };

    });

    save(updated);

}

export function changeOperatorStatus(id,status){

    updateOperator(

        id,

        {

            status,

        }

    );

}

export function deleteOperator(id){

    const operators = getOperators().filter(

        operator=>operator.id!==id

    );

    save(operators);

}