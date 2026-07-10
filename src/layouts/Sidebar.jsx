import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  Boxes,
  Activity,
  ListTodo,
  Bell,
  ChartNoAxesCombined,
  BookOpen,
  BrainCircuit,
  FileText,
  PanelsTopLeft,
  Settings,
  LogOut,
} from "lucide-react";

import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const [abierto, setAbierto] = useState(false);

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const menuItems = [
    {
      nombre: "Inicio",
      ruta: "/",
      icono: LayoutDashboard,
    },
    {
      nombre: "Organización",
      ruta: "/organizacion",
      icono: Building2,
    },
    {
      nombre: "Inventario",
      ruta: "/inventario",
      icono: Boxes,
    },
    {
      nombre: "Actividades",
      ruta: "/actividades",
      icono: Activity,
    },
    {
      nombre: "Tareas",
      ruta: "/tareas",
      icono: ListTodo,
    },
    {
      nombre: "Alertas",
      ruta: "/alertas",
      icono: Bell,
    },
    {
      nombre: "Indicadores",
      ruta: "/indicadores",
      icono: ChartNoAxesCombined,
    },
    {
      nombre: "Knowledge",
      ruta: "/knowledge",
      icono: BookOpen,
    },
    {
      nombre: "Advisory",
      ruta: "/advisory",
      icono: BrainCircuit,
    },
    {
      nombre: "Reportes",
      ruta: "/reportes",
      icono: FileText,
    },
    {
      nombre: "Field Engine",
      ruta: "/field-engine",
      icono: PanelsTopLeft,
    },
    {
      nombre: "Configuración",
      ruta: "/configuracion",
      icono: Settings,
    },
  ];

  return (
    <>
      <button
        className="menuBtn"
        onClick={() => setAbierto(!abierto)}
        aria-label={
          abierto
            ? "Cerrar menú de navegación"
            : "Abrir menú de navegación"
        }
        title={
          abierto
            ? "Cerrar menú"
            : "Abrir menú"
        }
      >
        {abierto ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}
      </button>

      <aside
        className={
          abierto
            ? "sidebar abierta"
            : "sidebar"
        }
      >
        <h1 className="logo">GANUS</h1>

        <nav>
          {menuItems.map((item) => {
            const Icono = item.icono;

            return (
              <NavLink
                key={item.ruta}
                to={item.ruta}
                onClick={() => setAbierto(false)}
                className={({ isActive }) =>
                  isActive ? "activo" : ""
                }
              >
                <Icono size={18} />

                <span>{item.nombre}</span>
              </NavLink>
            );
          })}

          <button
            className="btnLogout"
            onClick={logout}
          >
            <LogOut size={18} />

            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>
    </>
  );
}