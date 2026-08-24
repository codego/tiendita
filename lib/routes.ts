export const routes = {
  landing: "/",
  app: "/app",
  coleccion: "/app/coleccion",
  coleccionId: (id: string) => `/app/coleccion/${id}`,
  pieza: (id: string) => `/app/pieza/${id}`,
  buscar: "/app/buscar",
  guardados: "/app/guardados",
} as const;
