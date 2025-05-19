export const API_CONFIG = {
  BASE_URL: "http://localhost:8080/api",
  HEADERS: {
    "Content-Type": "application/json",
  },
  ENDPOINTS: {
    // Personas
    PEOPLE: {
      REGISTER: "/people",
      UPDATE: (id) => `/people/${id}`,
      DELETE: (id) => `/people/change-availability/${id}?availability=desactivado`,
      GET_BY_ID: (id) => `/people/${id}`,
      GET_BY_EMAIL: (email) => `/people/by-email/${email}`,
      GET_BY_ROLE: (roleId) => `/people/by-role/${roleId}`,
      GET_BY_ROLE_AND_SPECIALTY: (roleId, specialtyId) => 
        `/people/by-role-and-specialty?roleId=${roleId}&specialtyId=${specialtyId}`,
      CHANGE_AVAILABILITY: (id) => `/people/change-availability/${id}`,
      GET_STAFF: "/people/staff",
    },
    // Roles
    ROLES: {
      ADD: "/people/roles",
      UPDATE: (id) => `/people/roles/${id}`,
      GET_BY_ID: (id) => `/people/roles/id/${id}`,
      GET_ALL: "/people/roles",
      GET_BY_NAME: (name) => `/people/roles/name/${name}`,
    },
    // Especialidades
    SPECIALTIES: {
      ADD: "/people/specialties",
      UPDATE: (id) => `/people/specialties/${id}`,
      GET_BY_ID: (id) => `/people/specialties/id/${id}`,
      GET_ALL: "/people/specialties",
      GET_BY_NAME: (name) => `/people/specialties/name/${name}`,
    },
    // Autenticación
    AUTH: {
      LOGIN: "/people/login",
      CHANGE_PASSWORD: (id) => `/people/change-password/${id}`,
    },
    // Dispositivos
    DEVICES: {
      REGISTER: "/devices",
      UPDATE: (id) => `/devices/${id}`,
      GET_BY_ID: (id) => `/devices/${id}`,
      GET_BY_SERIAL: (serial) => `/devices/serial/${serial}`,
      GET_ALL: "/devices",
      GET_BY_BRAND: (brand) => `/devices/brand/${brand}`,
      GET_BY_TYPE: (type) => `/devices/type/${type}`,
      GET_BY_MODEL: (model) => `/devices/model/${model}`,
    },
    // Repuestos
    SPARE_PARTS: {
      ADD: "/spare-parts",
      UPDATE: (sparePartId) => `/spare-parts/${sparePartId}`,
      GET_BY_ID: (sparePartId) => `/spare-parts/${sparePartId}`,
      GET_BY_MODEL: (model) => `/spare-parts/by-model/${model}`,
      GET_BY_BRAND: (brand) => `/spare-parts/by-brand/${brand}`,
      GET_BY_TYPE: (type) => `/spare-parts/by-type/${type}`,
      GET_BY_BRAND_TYPE_MODEL: (brand, type, model) => 
        `/spare-parts?brand=${brand}&type=${type}&model=${model}`,
      GET_ALL: "/spare-parts",
      // Repuestos Usados
      USED_SPARE_PARTS: {
        USE: "/spare-parts/used-spare-parts",
        UPDATE: (id) => `/spare-parts/used-spare-parts/${id}`,
        GET_BY_ID: (id) => `/spare-parts/used-spare-parts/${id}`,
      },
    },
    // Intervenciones
    INTERVENTIONS: {
      // Órdenes de Intervención
      ORDERS: {
        CREATE: "/interventions/orders",
        UPDATE: (id) => `/interventions/orders/${id}`,
        GET_BY_ID: (id) => `/interventions/orders/${id}`,
        GET_ALL: "/interventions/orders",
        GET_BY_STATUS: (status) => `/interventions/orders/status/${status}`,
        GET_SALES_INFO: "/interventions/orders/sales-information",
        GET_RECENT_ORDERS: "/interventions/orders/recent-orders",
      },
      // Detalles de Intervención
      DETAILS: {
        CREATE: "/interventions/details",
        UPDATE: (id) => `/interventions/details/${id}`,
        GET_BY_ID: (id) => `/interventions/details/${id}`,
      },
    },
  },
};