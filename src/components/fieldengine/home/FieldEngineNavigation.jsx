import { LayoutTemplate, ClipboardList } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function FieldEngineNavigation() {

    return (

        <div className="fe-home-navigation">

            <NavLink
                to="/field-engine"
                end
                className={({ isActive }) =>
                    `fe-home-navigation__item ${
                        isActive ? "active" : ""
                    }`
                }
            >

                <LayoutTemplate size={18} />

                <span>

                    Plantillas

                </span>

            </NavLink>

            <NavLink
                to="/field-engine/responses"
                className={({ isActive }) =>
                    `fe-home-navigation__item ${
                        isActive ? "active" : ""
                    }`
                }
            >

                <ClipboardList size={18} />

                <span>

                    Registros dinámicos

                </span>

            </NavLink>

        </div>

    );

}