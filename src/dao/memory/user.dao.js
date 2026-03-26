import { v4 as uuidv4 } from "uuid";

export default class UserDAOMemory {
  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async getById(id) {
    return this.users.find((u) => u._id === id) || null;
  }

  async getByEmail(email) {
    return this.users.find((u) => u.email === email) || null;
  }

  async create(data) {
    const user = { _id: uuidv4(), ...data };
    this.users.push(user);
    return user;
  }

  async update(id, data) {
    const idx = this.users.findIndex((u) => u._id === id);
    if (idx < 0) return null;
    this.users[idx] = { ...this.users[idx], ...data };
    return this.users[idx];
  }

  async delete(id) {
    const idx = this.users.findIndex((u) => u._id === id);
    if (idx < 0) return null;
    return this.users.splice(idx, 1)[0];
  }
}
