require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rotasCheckin = require('./routes/checkin');
const rotasAtualizar = require('./MongoDB/routes/atualizar');
const rotasEstado = require('./MongoDB/routes/estado');
const rotasRemover = require('./MongoDB/routes/remover');
const rotasGaiola = require('./routes/gaiola'); 

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json()); 

/*
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
*/

app.use('/checkin', rotasCheckin);
app.use('/atualizar', rotasAtualizar);
app.use('/estado', rotasEstado);
app.use('/remover', rotasRemover);
app.use('/gaiola', rotasGaiola); 

// Iniciar servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
