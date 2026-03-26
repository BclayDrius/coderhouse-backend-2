import UserModel from "../../models/user.model.js";

export default class UserDAO {
  async getAll() {
    return UserModel.find();
  }

  async getById(id) {
    return UserModel.findById(id);
  }

  async getByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(data) {
    return UserModel.create(data);
  }

  async update(id, data) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
