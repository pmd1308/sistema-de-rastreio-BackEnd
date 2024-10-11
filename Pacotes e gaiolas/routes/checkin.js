const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Rota de check-in: cria um novo documento no MongoDB
router.post('/', async (req, res) => {
  const { codigoBarras, responsavel, origem, setorAtual, destino } = req.body;
  
  try {
    const novoPacote = new Package({
      codigoBarras,
      responsavel,
      origem,
      setorAtual,
      destino,
      statusPacote: 'em trânsito'
    });

    await novoPacote.save();
    res.status(201).json({ message: 'Check-in realizado com sucesso', pacote: novoPacote });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar check-in' });
  }
});

module.exports = router;


// Rota executada pelo primeiro coletor. Ele cria o objeto na rede