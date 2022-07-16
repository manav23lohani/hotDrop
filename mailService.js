const nodemailer = require('nodemailer')
async function sendMail({ from, to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: `Hot-Drop<${from}>`,
        to,
        subject,
        text,
        html
    })
}
module.exports = sendMail