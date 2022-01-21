const nodemailer = require("nodemailer");

const sendEmail = async (email, message) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.MAIL_HOST,
            service: process.env.MAIL_SERVICE,
            // port: process.env.MAIL_PORT,
            // secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        console.error(process.env.MAIL_USER, process.env.MAIL_PASS)
        console.error(email, message);
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Send GMail",
            text: message
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;