const validateRegister = (req, res, next) => {
  const { nombre, email, password, telefono } = req.body;
  const errors = [];

  if (!nombre || nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email inválido');
  }

  if (!password || password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (!telefono || telefono.length < 8) {
    errors.push('Teléfono inválido');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email requerido');
  }

  if (!password) {
    errors.push('Contraseña requerida');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateReserva = (req, res, next) => {
  const { canchaId, fecha, hora } = req.body;
  const errors = [];

  if (!canchaId) {
    errors.push('Cancha requerida');
  }

  if (!fecha) {
    errors.push('Fecha requerida');
  }

  if (!hora) {
    errors.push('Hora requerida');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateRegister, validateLogin, validateReserva };
