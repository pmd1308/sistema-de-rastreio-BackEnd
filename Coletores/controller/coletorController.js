const Coletor = require('../models/Coletor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar um novo coletor
const registrarColetor = async (req, res) => {
  const { responsavel, origem, setorAtual, destino, senha, statusPacote } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoColetor = new Coletor({
      responsavel,
      origem,
      setorAtual,
      destino,
      senha: senhaHash,
      statusPacote,
    });

    await novoColetor.save();
    res.status(201).json({ mensagem: 'Coletor registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao registrar coletor' });
  }
};

// Autenticar o coletor
const loginColetor = async (req, res) => {
  const { responsavel, senha } = req.body;

  try {
    const coletor = await Coletor.findOne({ responsavel });
    if (!coletor) {
      return res.status(404).json({ mensagem: 'Coletor não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, coletor.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: coletor._id }, process.env.JWT_SECRET, { expiresIn: '9h' }); // Jorna de trabalho
    res.cookie('token', token, { httpOnly: true, secure: true });

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      coletor: {
        responsavel: coletor.responsavel,
        setorAtual: coletor.setorAtual,
        origem: coletor.origem,
        destino: coletor.destino,
        statusPacote: coletor.statusPacote,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao autenticar coletor' });
  }
};

module.exports = { registrarColetor, loginColetor };
