import mongoose from "mongoose";

const collection = "Ticket";
const schema = new mongoose.Schema({
    emailBuyTicket: String,
    productsStock: [],
    productsSinStock: [],
    totalQuantity: Number,
    totalAmount: Number,
    generatedAt: { type: Date, default: Date.now }
},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
);

const ticketModel = mongoose.model(collection, schema)
export default ticketModel