
//const mongoose = require('mongoose');
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';
import { hashPassword } from '@/utils/hashPassword'
import { connectDb } from '@/utils/connectDb';


const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false, default: 'Admin' },
    fullName: { type: String, required: false },
    profilePicture: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.models.Users || model('Users', userSchema)

const adminEmail = 'isineyiikenna@gmail.com'
const adminPassword = 'admin';

//Create admin acceount if it doesnt exist
User.find({ role: 'Admin' }).then(async data => {
    if (!data.length) {
        const hash = await hashPassword(adminPassword);

        console.log('password hash', hash)

        const admin = new User({
            email: adminEmail,
            password: hash,
            role: 'Admin',
            fullName: 'Admin Admin',
            profilePicture: 'default.png',
        })

        admin.save();
    }
})

export { User }