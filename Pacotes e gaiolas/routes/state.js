const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Rota de obtenção de estado do pacote
router.get('/:codigoBarras', async (req, res) => {
  const { codigoBarras } = req.params;

  try {
    const pacote = await Package.findOne({ codigoBarras });

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    res.status(200).json({ pacote });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter estado do pacote' });
  }
});

module.exports = router;
