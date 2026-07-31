const STORAGE_KEY = "ganus_knowledge_engine";

function obtenerEstado() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
      return {
        snapshots: [],
      };
    }

    return JSON.parse(datos);
  } catch {
    return {
      snapshots: [],
    };
  }
}

export function obtenerSnapshots() {
  return obtenerEstado().snapshots || [];
}

export function guardarSnapshots(snapshots) {
  const estado = obtenerEstado();

  estado.snapshots = snapshots;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(estado)
  );
}

export function agregarSnapshot(snapshot) {
  const snapshots = obtenerSnapshots();

  snapshots.unshift(snapshot);

  guardarSnapshots(snapshots);

  return snapshot;
}