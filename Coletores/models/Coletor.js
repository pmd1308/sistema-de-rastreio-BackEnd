const mongoose = require('mongoose');

const coletorSchema = new mongoose.Schema({
  responsavel: {
    type: String,
    required: true,
  },
  origem: {
    type: String,
    required: true,
  },
  setorAtual: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  statusPacote: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Coletor', coletorSchema);
