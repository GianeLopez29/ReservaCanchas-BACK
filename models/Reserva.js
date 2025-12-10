const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cancha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cancha',
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  duracion: {
    type: Number,
    default: 1
  },
  serviciosAdicionales: {
    indumentaria: { type: Boolean, default: false },
    buffet: { type: Boolean, default: false },
    arbitro: { type: Boolean, default: false },
    pelota: { type: Boolean, default: false }
  },
  precioTotal: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'confirmada'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reserva', reservaSchema);
