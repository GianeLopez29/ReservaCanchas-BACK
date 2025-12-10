require('dotenv').config();
const mongoose = require('mongoose');
const Cancha = require('./models/Cancha');

const canchas = [
  {
    nombre: 'Cancha Futsal Premium',
    tipo: 'Futsal',
    precioBase: 2500,
    imagen: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 800 },
      buffet: { disponible: true, precio: 1200 },
      arbitro: { disponible: true, precio: 1500 },
      pelota: { disponible: true, precio: 300 }
    },
    promocion: { activa: true, nombre: 'Promo Mundial', descuento: 15, descripcion: '15% OFF por Mundial de Fútbol' }
  },
  {
    nombre: 'Cancha Fútbol 5 Techada',
    tipo: 'Fútbol 5',
    precioBase: 3000,
    imagen: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 1000 },
      buffet: { disponible: true, precio: 1500 },
      arbitro: { disponible: true, precio: 2000 },
      pelota: { disponible: true, precio: 400 }
    },
    promocion: { activa: false }
  },
  {
    nombre: 'Cancha Fútbol 7 Césped Sintético',
    tipo: 'Fútbol 7',
    precioBase: 4500,
    imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    instalaciones: { vestidores: true, duchas: false, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 1200 },
      buffet: { disponible: true, precio: 2000 },
      arbitro: { disponible: true, precio: 2500 },
      pelota: { disponible: true, precio: 500 }
    },
    promocion: { activa: true, nombre: 'Promo Verano', descuento: 10, descripcion: '10% OFF temporada de verano' }
  },
  {
    nombre: 'Cancha Fútbol 11 Profesional',
    tipo: 'Fútbol 11',
    precioBase: 8000,
    imagen: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 2000 },
      buffet: { disponible: true, precio: 3000 },
      arbitro: { disponible: true, precio: 4000 },
      pelota: { disponible: true, precio: 800 }
    },
    promocion: { activa: true, nombre: 'Promo Torneos', descuento: 20, descripcion: '20% OFF para torneos y campeonatos' }
  },
  {
    nombre: 'Cancha Fútbol Papi',
    tipo: 'Fútbol Papi',
    precioBase: 2000,
    imagen: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    instalaciones: { vestidores: true, duchas: false, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: false, precio: 0 },
      buffet: { disponible: true, precio: 1000 },
      arbitro: { disponible: false, precio: 0 },
      pelota: { disponible: true, precio: 300 }
    },
    promocion: { activa: true, nombre: 'Promo Seniors', descuento: 25, descripcion: '25% OFF para mayores de 40 años' }
  },
  {
    nombre: 'Cancha de Tenis Clay Court',
    tipo: 'Tenis',
    precioBase: 2800,
    imagen: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: false, precio: 0 },
      buffet: { disponible: true, precio: 800 },
      arbitro: { disponible: false, precio: 0 },
      pelota: { disponible: true, precio: 600 }
    },
    promocion: { activa: false }
  },
  {
    nombre: 'Cancha de Paddle Indoor',
    tipo: 'Paddle',
    precioBase: 3200,
    imagen: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: false, precio: 0 },
      buffet: { disponible: true, precio: 1000 },
      arbitro: { disponible: false, precio: 0 },
      pelota: { disponible: true, precio: 700 }
    },
    promocion: { activa: true, nombre: 'Promo Invierno', descuento: 12, descripcion: '12% OFF temporada de invierno' }
  },
  {
    nombre: 'Cancha de Básquet Cubierta',
    tipo: 'Básquet',
    precioBase: 3500,
    imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    instalaciones: { vestidores: true, duchas: false, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 1500 },
      buffet: { disponible: true, precio: 1800 },
      arbitro: { disponible: true, precio: 2200 },
      pelota: { disponible: true, precio: 500 }
    },
    promocion: { activa: false }
  },
  {
    nombre: 'Cancha Futsal Económica',
    tipo: 'Futsal',
    precioBase: 1800,
    imagen: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800',
    instalaciones: { vestidores: true, duchas: false, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: false, precio: 0 },
      buffet: { disponible: true, precio: 800 },
      arbitro: { disponible: false, precio: 0 },
      pelota: { disponible: true, precio: 200 }
    },
    promocion: { activa: true, nombre: 'Promo Estudiantes', descuento: 30, descripcion: '30% OFF para estudiantes con credencial' }
  },
  {
    nombre: 'Cancha Fútbol 5 Premium',
    tipo: 'Fútbol 5',
    precioBase: 3500,
    imagen: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    instalaciones: { vestidores: true, duchas: true, estacionamiento: true, iluminacion: true },
    servicios: {
      indumentaria: { disponible: true, precio: 1000 },
      buffet: { disponible: true, precio: 1500 },
      arbitro: { disponible: true, precio: 2000 },
      pelota: { disponible: true, precio: 400 }
    },
    promocion: { activa: true, nombre: 'Promo Campeones', descuento: 18, descripcion: '18% OFF celebrando campeonatos locales' }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    await Cancha.deleteMany({});
    console.log('Canchas anteriores eliminadas');

    await Cancha.insertMany(canchas);
    console.log(`${canchas.length} canchas creadas exitosamente con servicios y promociones`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();
