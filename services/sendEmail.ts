
import { createTransport } from 'nodemailer'

type Props = {
    toEmail: string,
    fromEmail?: string,
    fromHeading?: string,
    replyTo?: string,
    password?: string,
    subject: string,
    text?: string,
    html?: string,
}


export default function sendEmail({ toEmail, fromEmail, fromHeading, replyTo, password, subject, text, html }: Props) {
    const payload = {
        from: fromHeading,
        to: toEmail,
        subject: subject,
        text: text,
        html: html
    };

    console.log('payload', payload);

    const setting = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    };

    console.log('email setting', setting);

    let transporter = createTransport(setting);

    return new Promise((resolve, reject) => {
        console.log('sending...');

        transporter.sendMail(payload, (err, result) => {
            if (err) {
                console.log('mailing err', err);
                resolve(false)
            }
            else {
                console.log('email sent')
                resolve(result)
            }
        })
    })
}