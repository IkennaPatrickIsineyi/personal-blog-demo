
import mongoose from 'mongoose'

export const connectDb = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('connected')

        return true
    }
    else {
        console.log('connecting to db')
        const dbName = process.env.DB_NAME;

        const URI = (process.env.NODE_ENV === 'production') ? process.env.MONGO_URI : process.env.MONGO_LOCAL_URI

        mongoose.connect(URI || '', { dbName }).then(res => { console.log('connected'); return true; }, err => console.log(err))
    }
}