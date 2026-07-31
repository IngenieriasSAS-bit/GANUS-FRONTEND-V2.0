const STORAGE_KEY = "ganus_knowledge_engine";

function obtenerEstado() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
      return {
        eventos: [],
      };
    }

    return JSON.parse(datos);
  } catch {
    return {
      eventos: [],
    };
  }
}

export function obtenerEventos() {
  return obtenerEstado().eventos || [];
}

export function guardarEventos(eventos) {
  const estado = obtenerEstado();

  estado.eventos = eventos;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(estado)
  );
}

export function agregarEvento(evento) {
  const eventos = obtenerEventos();

  eventos.unshift(evento);

  guardarEventos(eventos);

  return evento;
}