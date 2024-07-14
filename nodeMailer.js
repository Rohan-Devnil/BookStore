const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rohandevnil1130@gmail.com",
            pass: "doryylplsklzltfe"
        }
    });

    const mailOptions = {
        from: "rohandevnil1130@gmail.com",
        to,
        subject,
        html
    };

    try {
        await auth.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'Email sent successfully'
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: error.message
        };
    }
};

module.exports = sendMail;
