const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const swagger = require('./swagger');
const api404Error = require('./middleware/api404Error');

dotenv.config(); // 👈 Asegúrate de que esté antes de usar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// 👉 Middleware base
app.use(cors());
app.use(express.json());

// 👉 Configurar sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'someSecret',
  resave: false,
  saveUninitialized: true
}));

// 👉 Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// 👉 Configurar estrategia GitHub OAuth
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

// 👉 Rutas de autenticación
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/callback', passport.authenticate('github', {
  failureRedirect: '/auth/failure'
}), (req, res) => {
  res.send('✅ Auth successful. You can now access protected routes.');
});

app.get('/auth/failure', (req, res) => {
  res.status(401).send('❌ Authentication Failed');
});

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
