
//const mongoose = require('mongoose');
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';
import { hashPassword } from '@/utils/hashPassword'
import { connectDb } from '@/utils/connectDb';


const subscriberSchema = new Schema({
    email: { type: String, required: true },
}, { timestamps: true });

const Subscriber = mongoose.models.Subscribers || model('Subscribers', subscriberSchema)

export { Subscriber }