import mongoose, { Schema, model } from "mongoose";

//Define Schema
const blogSchema = new Schema({
    slug: { type: String, required: true },

    /* Summary data */
    summaryImage: { type: String, required: true },
    summaryTitle: { type: String, required: true },
    author: { type: String, required: true },
    introduction: { type: String, required: true },
    categories: { type: Array, required: true },

    /* Content */
    content: { type: String, required: true },

    /* Meta data */
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
}, { timestamps: true })

//Create the model (if it does not exist) using the schema defined above
const Blog = mongoose.models.Blogs || model('Blogs', blogSchema)

//Export the model
export { Blog }