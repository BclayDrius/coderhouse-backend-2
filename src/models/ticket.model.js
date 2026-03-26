import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    purchase_datetime: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String, // email del comprador
      required: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

const TicketModel = mongoose.model("Ticket", ticketSchema);
export default TicketModel;
