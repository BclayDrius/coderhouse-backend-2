import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    role: { type: String, enum: ["usuario", "admin"], default: "usuario" },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
