const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');
const Cancha = require('../models/Cancha');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { validateReserva } = require('../middleware/validation');
const { sendReservationEmail } = require('../config/email');

router.post('/', authMiddleware, validateReserva, async (req, res) => {
  try {
    const { canchaId, fecha, hora, duracion, serviciosAdicionales } = req.body;

    const existingReserva = await Reserva.findOne({ cancha: canchaId, fecha, hora });
    if (existingReserva) {
      return res.status(400).json({ message: 'Esta cancha ya está reservada en ese horario' });
    }

    const cancha = await Cancha.findById(canchaId);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }

    // Calcular precio total
    let precioTotal = cancha.precioBase * (duracion || 1);
    
    // Agregar costo de instalaciones premium (duchas)
    if (cancha.instalaciones.duchas) {
      precioTotal += 500 * (duracion || 1);
    }

    // Agregar servicios adicionales
    if (serviciosAdicionales?.indumentaria && cancha.servicios.indumentaria?.disponible) {
      precioTotal += cancha.servicios.indumentaria.precio;
    }
    if (serviciosAdicionales?.buffet && cancha.servicios.buffet?.disponible) {
      precioTotal += cancha.servicios.buffet.precio;
    }
    if (serviciosAdicionales?.arbitro && cancha.servicios.arbitro?.disponible) {
      precioTotal += cancha.servicios.arbitro.precio;
    }
    if (serviciosAdicionales?.pelota && cancha.servicios.pelota?.disponible) {
      precioTotal += cancha.servicios.pelota.precio;
    }

    // Aplicar promoción si existe
    if (cancha.promocion?.activa) {
      precioTotal = precioTotal * (1 - cancha.promocion.descuento / 100);
    }

    const reserva = new Reserva({
      usuario: req.userId,
      cancha: canchaId,
      fecha,
      hora,
      duracion: duracion || 1,
      serviciosAdicionales: serviciosAdicionales || {},
      precioTotal: Math.round(precioTotal)
    });

    await reserva.save();

    const user = await User.findById(req.userId);

    try {
      await sendReservationEmail(user.email, user.nombre, cancha.nombre, fecha, hora);
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
    }

    res.status(201).json({ message: 'Reserva creada exitosamente', reserva });
  } catch (error) {
    res.status(500).json({ message: 'Error creando reserva', error: error.message });
  }
});

router.get('/mis-reservas', authMiddleware, async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.userId })
      .populate('cancha')
      .sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo reservas', error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const reserva = await Reserva.findOne({ _id: req.params.id, usuario: req.userId });
    
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reserva cancelada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelando reserva', error: error.message });
  }
});

module.exports = router;
