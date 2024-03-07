import mongoose, { Schema, model } from "mongoose";

//Define Schema
const categorySchema = new Schema({
    value: { type: String, required: true },
    color: { type: String, required: true },
}, { timestamps: true })

//Create the model (if it does not exist) using the schema defined above
const Category = mongoose.models.Categories || model('Categories', categorySchema)

//Export the model
export { Category }