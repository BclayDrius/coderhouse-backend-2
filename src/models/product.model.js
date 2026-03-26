import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, default: "" },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
