import {
HashRouter,
Routes,
Route
} from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Pesaje from "./pages/Pesaje";
import Vacunaciones from "./pages/Vacunaciones";
import EventoSanitario from "./pages/EventoSanitario";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/responsive.css";
import Organizacion from "./pages/Organizacion";
import FieldEngine from "./pages/FieldEngine";
import Make from "./pages/Make";
import Operacion from "./pages/Operacion";

export default function App(){

  return(

<HashRouter>

<Routes>

<Route

path="/login"

element={<Login/>}

/>

<Route

path="/registro"

element={<Registro/>}

/>

<Route
path="/"
element={
  <ProtectedRoute>
    <Dashboard/>
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
  path="/field-engine"
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
    <Inventario/>
  </ProtectedRoute>
}
/>

<Route
path="/pesaje"
element={
  <ProtectedRoute>
    <Pesaje/>
  </ProtectedRoute>
}
/>

<Route
path="/vacunaciones"
element={
  <ProtectedRoute>
    <Vacunaciones/>
  </ProtectedRoute>
}
/>

<Route
path="/evento"
element={
  <ProtectedRoute>
    <EventoSanitario/>
  </ProtectedRoute>
}
/>

</Routes>

</HashRouter> );

}