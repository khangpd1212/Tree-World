const nodemailer = require("nodemailer");

const sendEmail = async (email, subject,username, link) => {
  try {
    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Password reset</h4>
                <h4 style="color: #0085ff">Username: ${username}</h4>
                <span style="color: black">${link}</span>
            </div>
        </div>
    `;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: content,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;