const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Rota de atualização de documento
router.put('/:codigoBarras', async (req, res) => {
  const { codigoBarras } = req.params;
  const { setorAtual, novoResponsavel, tempoCheckpoint, statusPacote } = req.body;

  try {
    const pacote = await Package.findOneAndUpdate(
      { codigoBarras },
      {
        setorAtual,
        responsavel: novoResponsavel,
        tempoCheckpoint: tempoCheckpoint || Date.now(),
        statusPacote
      },
      { new: true }
    );

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    res.status(200).json({ message: 'Pacote atualizado com sucesso', pacote });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pacote' });
  }
});

module.exports = router;

// Overwriting no documento para escalabilidade