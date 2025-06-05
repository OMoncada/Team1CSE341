const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swagger = require('./swagger');
const api404Error = require('./middleware/api404Error');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// 👉 Middleware base
app.use(cors());
app.use(express.json());

// 👉 Ruta raíz
app.get('/', (req, res) => {
  res.send('👨‍🍳 Bienvenidos al proyecto final The Food Table 🍽️ ');
});

// 👉 Documentación Swagger
swagger(app);

// 👉 Rutas API
app.use('/recipes', require('./routes/recipe'));
app.use('/users', require('./routes/user'));

// 👉 Manejo de rutas no encontradas
app.use(api404Error);

// 👉 Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
  })
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));
