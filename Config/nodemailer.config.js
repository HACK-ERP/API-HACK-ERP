const nodemailer = require("nodemailer");
const email = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// Registrar eventos del transportador
transporter.on("error", (err) => {
  console.error("Error en el transporte:", err);
});

transporter.on("sent", (info) => {
  console.log("Correo electrónico enviado:", info.response);
});

module.exports.sendValidationEmail = (user) => {
  console.log(user);
  console.log("user ID is: " + user._id);
  transporter
    .sendMail({
      from: `"HackERP" <${email}>`,
      to: user.email,
      subject: "Bienvenido a HackERP",
      html: `
        <h1>Bienvenido a HackERP</h1>
        <p>Activa tu cuenta en el siguiente enlace</p>
        <a href="${process.env.APP_HOST}/hackerp/users/${user._id}/activate">Click aquí</a>
      `,
    })
    .then(() => {
      console.log(`email sent to ${user.email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};

// función para enviar email cuando se crea un presupuesto

module.exports.sendBudgetEmail = (budget) => {
  console.log(budget);
  console.log("budget ID is: " + budget._id);
  transporter
    .sendMail({
      from: `"HackERP" <${email}>`,
      to: budget.client.Email,
      subject: "Nuevo presupuesto",
      html: `
        <h1>Nuevo presupuesto</h1>
        <p>Se ha creado un nuevo presupuesto para usted</p>
        <a href="${process.env.APP_HOST}/hackerp/budgets/${budget._id}">Click aquí</a>
      `,
    })
    .then(() => {
      console.log(`email sent to ${budget.client.Email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
}

