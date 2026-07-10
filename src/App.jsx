import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Pesaje from "./pages/Pesaje";
import Vacunaciones from "./pages/Vacunaciones";
import EventoSanitario from "./pages/EventoSanitario";
import Organizacion from "./pages/Organizacion";
import Actividades from "./pages/Actividades";
import Tareas from "./pages/Tareas";
import Alertas from "./pages/Alertas";
import Indicadores from "./pages/Indicadores";
import FieldEngine from "./pages/FieldEngine";
import DynamicFormCapture from "./pages/DynamicFormCapture";
import FieldEngineTemplates from "./pages/FieldEngineTemplates";
import Make from "./pages/Make";
import Operacion from "./pages/Operacion";
import Knowledge from "./pages/Knowledge";
import Advisory from "./pages/Advisory";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./styles/responsive.css";
import "./styles/theme.css";

export default function App() {
  const temaGuardado =
    localStorage.getItem("ganus-tema") || "claro";

  document.documentElement.setAttribute(
    "data-ganus-theme",
    temaGuardado
  );

  document.body.setAttribute(
    "data-ganus-theme",
    temaGuardado
  );

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizacion"
          element={
            <ProtectedRoute>
              <Organizacion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/actividades"
          element={
            <ProtectedRoute>
              <Actividades />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tareas"
          element={
            <ProtectedRoute>
              <Tareas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alertas"
          element={
            <ProtectedRoute>
              <Alertas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/indicadores"
          element={
            <ProtectedRoute>
              <Indicadores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge"
          element={
            <ProtectedRoute>
              <Knowledge />
            </ProtectedRoute>
          }
        />

        <Route
  path="/advisory"
  element={
    <ProtectedRoute>
      <Advisory />
    </ProtectedRoute>
  }
/>

<Route
  path="/reportes"
  element={
    <ProtectedRoute>
      <Reportes />
    </ProtectedRoute>
  }
/>

<Route
  path="/configuracion"
  element={
    <ProtectedRoute>
      <Configuracion />
    </ProtectedRoute>
  }
/>

<Route
  path="/field-engine"
  element={
    <ProtectedRoute>
      <FieldEngineTemplates />
    </ProtectedRoute>
  }
/>

<Route
  path="/field-engine/capture/:templateId"
  element={
    <ProtectedRoute>
      <DynamicFormCapture />
    </ProtectedRoute>
  }
/>

<Route
  path="/field-engine/:templateId"
  element={
    <ProtectedRoute>
      <FieldEngine />
    </ProtectedRoute>
  }
/>

        <Route
          path="/make"
          element={
            <ProtectedRoute>
              <Make />
            </ProtectedRoute>
          }
        />

        <Route
          path="/operacion"
          element={
            <ProtectedRoute>
              <Operacion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pesaje"
          element={
            <ProtectedRoute>
              <Pesaje />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vacunaciones"
          element={
            <ProtectedRoute>
              <Vacunaciones />
            </ProtectedRoute>
          }
        />

        <Route
          path="/evento"
          element={
            <ProtectedRoute>
              <EventoSanitario />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}