import { useContext } from "react";

import { OrganizationContext } from "../context/OrganizationContext";

export default function useOrganization() {

    return useContext(
        OrganizationContext
    );

}