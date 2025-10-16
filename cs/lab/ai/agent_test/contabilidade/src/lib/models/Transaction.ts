import mongoose, { type Schema, type Document } from "mongoose";

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Valor é obrigatório"],
      min: [0.01, "Valor deve ser maior que zero"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Tipo é obrigatório"],
    },
    category: {
      type: String,
      required: [true, "Categoria é obrigatória"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Data é obrigatória"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
