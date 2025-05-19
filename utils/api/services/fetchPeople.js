import {API_CONFIG} from '../config.js';

const personService = {
  baseUrl: API_CONFIG.BASE_URL,
  defaultHeaders: API_CONFIG.HEADERS,

  async _request(endpoint, method = "GET", body = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.defaultHeaders;

    const options = {
      method,
      headers
    };

    if(body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if(response.status === 204) return true;

      const data = await response.json();

      if(!response.ok) {
        const error = new Error(data.message || "Error en la solicitud");
        error.status = response.status;
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  },

  async registerPerson(newPerson) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.REGISTER, "POST", newPerson);
  },

  async updatePerson(id, updatedPerson) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.UPDATE(id), "PUT", updatedPerson);
  },

  async getPersonById(id) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.GET_BY_ID(id));
  },

  async getPersonByEmail(email) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.GET_BY_EMAIL(email));
  },

  async getPersonByRole(roleId) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.GET_BY_ROLE(roleId));
  },

  async getPersonByRoleAndSpecialty(roleId, specialtyId) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.GET_BY_ROLE_AND_SPECIALTY(roleId, specialtyId));
  },

  async changeAvailability(id) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.CHANGE_AVAILABILITY(id), "PUT");
  },

  async deletePerson(id) {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.DELETE(id), "PUT");
  },

  async getStaff() {
    return this._request(API_CONFIG.ENDPOINTS.PEOPLE.GET_STAFF);
  },

  async getAllRoles() {
    return this._request(API_CONFIG.ENDPOINTS.ROLES.GET_ALL);
  },

  async getAllSpecialties() {
    return this._request(API_CONFIG.ENDPOINTS.SPECIALTIES.GET_ALL);
  },

  async addRole(newRole) {
    return this._request(API_CONFIG.ENDPOINTS.ROLES.ADD, "POST", newRole);
  },

  async updateRole(id, updatedRole) {
    return this._request(API_CONFIG.ENDPOINTS.ROLES.UPDATE(id), "PUT", updatedRole);
  },

  async getRoleById(id) {
    return this._request(API_CONFIG.ENDPOINTS.ROLES.GET_BY_ID(id));
  },

  async addSpecialty(newSpecialty) {
    return this._request(API_CONFIG.ENDPOINTS.SPECIALTIES.ADD, "POST", newSpecialty);
  },

  async updateSpecialty(id, updatedSpecialty) {
    return this._request(API_CONFIG.ENDPOINTS.SPECIALTIES.UPDATE(id), "PUT", updatedSpecialty);
  },

  async getSpecialtyById(id) {
    return this._request(API_CONFIG.ENDPOINTS.SPECIALTIES.GET_BY_ID(id));
  },

  async login(email, password) {
    const credentials = {
      email,
      password
    };
    return this._request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, "POST", credentials);
  },

  async changePassword(id, oldPassword, newPassword) {
    return this._request(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD(id), "PUT", {oldPassword, newPassword });
  },

  async getRoleByName(name) {
    return this._request(API_CONFIG.ENDPOINTS.ROLES.GET_BY_NAME(name));
  },

  async getSpecialtyByName(name) {
    return this._request(API_CONFIG.ENDPOINTS.SPECIALTIES.GET_BY_NAME(name));
  }
};
export { personService };