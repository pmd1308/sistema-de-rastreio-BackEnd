const mongoose = require('mongoose');

const PacoteSchema = new mongoose.Schema({
  codigoBarras: { type: String, required: true },
  responsavel: { type: String, required: true },
  origem: { type: String, required: true },
  setorAtual: { type: String, required: true },
  destino: { type: String, required: true },
  tempoCheckpoint: { type: Date, default: Date.now },
  statusPacote: { type: String, required: true },
  gaiola: { type: mongoose.Schema.Types.ObjectId, ref: 'Gaiola', required: false }, // Referência opcional para a gaiola
}, { timestamps: true });

module.exports = mongoose.model('Pacote', PacoteSchema);
