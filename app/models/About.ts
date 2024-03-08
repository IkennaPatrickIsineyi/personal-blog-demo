import mongoose, { Schema, model } from "mongoose";

//Define Schema
const aboutSchema = new Schema({
    image: { type: String, required: true },
    experience: { type: String, required: true },
    education: { type: String, required: true },
    skills: { type: String, required: true },
    about: { type: String, required: true },

    /* Meta data */
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
}, { timestamps: true })

//Create the model (if it does not exist) using the schema defined above
const About = mongoose.models.Abouts || model('Abouts', aboutSchema)

//Export the model
export { About }