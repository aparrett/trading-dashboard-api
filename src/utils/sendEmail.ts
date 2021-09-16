import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    await transporter.sendMail({
        from: '"Trading Dashboard Alerts" <alerts@tradingdashboard.com>',
        to: to, 
        subject: 'Alert Triggered',
        html
    })
}
