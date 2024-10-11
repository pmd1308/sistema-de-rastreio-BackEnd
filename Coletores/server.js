const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const rotasColetor = require('./routes/coletor');

dotenv.config();

/*mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB conectado com sucesso!');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
});
*/

// Inicializando o Express
const app = express();
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/coletor', rotasColetor);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
