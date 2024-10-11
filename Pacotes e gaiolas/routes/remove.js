const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Rota para deletar documento ao finalizar o ciclo
router.delete('/:codigoBarras', async (req, res) => {
  const { codigoBarras } = req.params;

  try {
    const pacote = await Package.findOneAndDelete({ codigoBarras });

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    res.status(200).json({ message: 'Pacote removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover pacote' });
  }
});

module.exports = router;
