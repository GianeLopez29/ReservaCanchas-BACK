const mongoose = require('mongoose');

const canchaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Fútbol 5', 'Fútbol 7', 'Fútbol 11', 'Futsal', 'Fútbol Papi', 'Tenis', 'Paddle', 'Básquet'],
    required: true
  },
  precioBase: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    default: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800'
  },
  instalaciones: {
    vestidores: { type: Boolean, default: true },
    duchas: { type: Boolean, default: false },
    estacionamiento: { type: Boolean, default: true },
    iluminacion: { type: Boolean, default: true }
  },
  servicios: {
    indumentaria: { disponible: Boolean, precio: Number },
    buffet: { disponible: Boolean, precio: Number },
    arbitro: { disponible: Boolean, precio: Number },
    pelota: { disponible: Boolean, precio: Number }
  },
  promocion: {
    activa: { type: Boolean, default: false },
    nombre: String,
    descuento: Number,
    descripcion: String
  },
  disponible: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Cancha', canchaSchema);
