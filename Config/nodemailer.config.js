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
transporter.on('error', (err) => {
  console.error('Error en el transporte:', err);
});

transporter.on('sent', (info) => {
  console.log('Correo electrónico enviado:', info.response);
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
        <a href="${process.env.APP}/users/${user._id}/activate">Click aquí</a>
      `,
    })
    .then(() => {
      console.log(`email sent to ${user._id}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};

module.exports.sendBudgetEmail = (budget) => {
  console.log(budget);
  console.log("budget ID is: " + budget._id);

  const productsTable = parseProducts(budget.products).join("");
  const totalSubtotal = budget.products.reduce(
    (total, product) => total + product.subtotal,
    0
  );

  transporter
    .sendMail({
      from: `"HackERP" <${email}>`,
      to: budget.client.email,
      subject: "Confirmación de Presupuesto",
      html: `
        <p>Saludos cordiales</p>
        <p>Gracias por confiar en HackERP</p>
        <p>Aquí tienes los detalles de tu presupuesto:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
                <th style="border: 1px solid black; padding: 8px; text-align: center;">Producto</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center;">Imagen</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center;">Precio</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center;">Cantidad</th>
                <th style="border: 1px solid black; padding: 8px; text-align: center;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productsTable}
            <tr>
                <td colspan="4" style="border: 1px solid black; padding: 8px; text-align: center;">Total</td>
                <td style="border: 1px solid black; padding: 8px; text-align: center;">${totalSubtotal} €</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3>El equipo de HackERP</h3>
      `,
    })
    .then(() => {
      console.log(`email sent to ${budget.client.email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};

const parseProducts = (products) => {
  console.log(products);
  return products.map((product) => {
    const subtotal = product.product.price * product.quantity;
    product.subtotal = subtotal;
    return `
        <tr>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.product.name}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;"><img src="${product.product.image}" alt="${product.product.name}" style="max-width: 100px;"></td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.product.price} €</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.quantity}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${subtotal} €</td>
        </tr>
        `;
  });
};
