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

function changeDate(dateISO) {
  const date = new Date(dateISO);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const dayStr = day.toString().padStart(2, "0");
  const monthStr = month.toString().padStart(2, "0");

  const newDate = `${dayStr}/${monthStr}/${year}`;

  return newDate;
}

const parseProducts = (products) => {
  let html = "";
  products.forEach((product) => {
    html += `
      <tr>
      <td style="border: 1px solid black; padding: 8px; text-align: center; font-size: 14px;">${
        product.product_id.name
      }</td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;"><img src="${
        product.product_id.image
      }" width="140px" height="150px"></td>
      <td style="border: 1px solid black; padding: 8px; text-align: center;">${
        product.product_id.price
      } €</td>      
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${
          product.quantity
        }</td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${
          product.product_id.price * product.quantity
        } €</td>
      </tr>
    `;
  });
  return html;
};

module.exports.sendBudgetEmail = (budget) => {
  console.log("budget ID is: " + budget._id);

  //calcular el precio total del presupuesto
  let total = 0;
  budget.products.forEach((product) => {
    total += product.product_id.price * product.quantity;
  });

  transporter
    .sendMail({
      from: `"HACK-ERP" <${email}>`,
      to: budget.client.Email,
      subject: "Confirmación del nuevo presupuesto",
      html: `
        <img src="https://img.freepik.com/fotos-premium/maquina-torno-cnc-interior-fabrica-metalurgica-industrial-interior-industrial-metalurgica_354831-2758.jpg" alt="Imagen del presupuesto" style="width: 100%; height: 450px;">
        <p> Gracias por confiar en Hack-ERP. Se ha creado un nuevo presupuesto.</p>
        <p> A continuación tiene los detalles del presupuesto:</p>
        <ul>
        <li><strong>Código del presupuesto:</strong> ${budget.budgetNumber}</li>
        <li><strong>Cliente:</strong> ${budget.client.RS}</li>
        <li><strong>Fecha de entrega:</strong> ${changeDate(
          budget.deliveryDate
        )}</li>
        <li><strong>Comentarios:</strong> ${budget.comments}</li>
        </ul>
        <table style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th style="border: 1px solid black; padding: 8px; text-align: center;">Nombre del Producto</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: center;">Producto</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: center;">Precio</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: center;">Cantidad</th>
                    <th style="border: 1px solid black; padding: 8px; text-align: center;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${parseProducts(budget.products)}
                <tr>
                    <td style="border: 1px solid black; padding: 8px; text-align: center; font-size: 16px;" colspan="4";><strong>Total</strong></td>
                    <td style="border: 1px solid black; padding: 8px; text-align: center;"><strong>${total}</strong>€</td>
                </tr>
            </tbody>
        </table>
        <h3>El equipo de Hack-ERP</h3>
      `,
    })
    .then(() => {
      console.log(`email sent to ${budget.client.Email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};
