
import bcrypt from 'bcryptjs'

export const comparePasswords = async ({ password, hash }: { password: string, hash: string }) => {
    try {
        return (await bcrypt.compare(password, hash))
    } catch (error) {
        return false
    }
}