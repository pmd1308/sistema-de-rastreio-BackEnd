const express = require('express');
const router = express.Router();
const Gaiola = require('../models/Gaiola');
const Pacote = require('../models/Pacote');

// Criar uma nova gaiola com pacotes
router.post('/', async (req, res) => {
  const { codigoQR, pacotes } = req.body;

  try {
    // Checar se todos os pacotes existem
    const pacotesExistem = await Pacote.find({ _id: { $in: pacotes } });
    if (pacotesExistem.length !== pacotes.length) {
      return res.status(404).json({ erro: 'Um ou mais pacotes não encontrados' });
    }

    // Criar a gaiola
    const novaGaiola = new Gaiola({
      codigoQR,
      pacotes
    });

    await novaGaiola.save();
    res.status(201).json({ mensagem: 'Gaiola criada com sucesso', gaiola: novaGaiola });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar gaiola' });
  }
});

// Atualizar pacotes da gaiola (ex: adicionar ou remover pacotes)
router.put('/:codigoQR', async (req, res) => {
  const { codigoQR } = req.params;
  const { pacotes } = req.body;

  try {
    const gaiola = await Gaiola.findOneAndUpdate(
      { codigoQR },
      { $set: { pacotes } }, // Sobrescreve os pacotes
      { new: true }
    );

    if (!gaiola) {
      return res.status(404).json({ mensagem: 'Gaiola não encontrada' });
    }

    res.status(200).json({ mensagem: 'Pacotes atualizados na gaiola', gaiola });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar pacotes na gaiola' });
  }
});

// Rota para obter o estado de uma gaiola (incluindo pacotes)
router.get('/:codigoQR', async (req, res) => {
    const { codigoQR } = req.params;
  
    try {
      // Buscar a gaiola pelo código QR e popular os pacotes associados
      const gaiola = await Gaiola.findOne({ codigoQR }).populate('pacotes');
  
      if (!gaiola) {
        return res.status(404).json({ mensagem: 'Gaiola não encontrada' });
      }
  
      res.status(200).json({ gaiola });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao obter o estado da gaiola' });
    }
  });
  

module.exports = router;
