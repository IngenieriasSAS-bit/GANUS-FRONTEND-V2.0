/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";

import {
    obtenerDatosOrganizacion,
    obtenerFincas,
    obtenerUsuarios,
    obtenerRoles,
} from "../services/organizationService";

export const OrganizationContext =
    createContext(null);

export function OrganizationProvider({ children }) {

    const [grupos, setGrupos] = useState([]);
    const [fincas, setFincas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);

    const recargarOrganizacion = useCallback(() => {

        setGrupos(
            obtenerDatosOrganizacion()
        );

        setFincas(
            obtenerFincas()
        );

        setUsuarios(
            obtenerUsuarios()
        );

        setRoles(
            obtenerRoles()
        );

    }, []);

    return (

        <OrganizationContext.Provider
            value={{

                grupos,
                fincas,
                usuarios,
                roles,

                recargarOrganizacion,

            }}
        >

            {children}

        </OrganizationContext.Provider>

    );

}

