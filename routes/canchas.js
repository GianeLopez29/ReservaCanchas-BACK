const express = require('express');
const router = express.Router();
const Cancha = require('../models/Cancha');

router.get('/', async (req, res) => {
  try {
    const canchas = await Cancha.find();
    res.json(canchas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo canchas', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cancha = await Cancha.findById(req.params.id);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo cancha', error: error.message });
  }
});

module.exports = router;
