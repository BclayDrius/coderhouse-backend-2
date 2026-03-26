import UserDTO from "../dto/user.dto.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    const users = await this.dao.getAll();
    return users.map((u) => new UserDTO(u));
  }

  async getById(id) {
    const user = await this.dao.getById(id);
    if (!user) return null;
    return new UserDTO(user);
  }

  // Retorna el documento completo (con password) para autenticación interna
  async getByEmailRaw(email) {
    return this.dao.getByEmail(email);
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}
