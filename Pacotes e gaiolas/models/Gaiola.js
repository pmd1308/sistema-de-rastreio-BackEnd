const mongoose = require('mongoose');

const GaiolaSchema = new mongoose.Schema({
  codigoQR: { type: String, required: true, unique: true },
  pacotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pacote', required: true }] 
}, { timestamps: true });

module.exports = mongoose.model('Gaiola', GaiolaSchema);

// Toda gaiola deve ter pelo menos um ou mais pacotes, e os pacotes não precisam de gaiolas
