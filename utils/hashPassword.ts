
import bcrypt from 'bcryptjs'

require('dotenv/config')

export const hashPassword = async (password: string) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        return hash
    } catch (error) {
        console.log('error', error)
        return null
    }
}