const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (email, nombre) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '¡Bienvenido a Reserva Canchas!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2ecc71;">¡Bienvenido ${nombre}!</h2>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Ahora puedes reservar tus canchas favoritas de manera fácil y rápida.</p>
        <p style="color: #7f8c8d; font-size: 12px;">Este es un correo automático, por favor no responder.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendReservationEmail = async (email, nombre, cancha, fecha, hora) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmación de Reserva',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2ecc71;">Reserva Confirmada</h2>
        <p>Hola ${nombre},</p>
        <p>Tu reserva ha sido confirmada con los siguientes detalles:</p>
        <ul>
          <li><strong>Cancha:</strong> ${cancha}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
        <p>¡Nos vemos en la cancha!</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail, sendReservationEmail };
