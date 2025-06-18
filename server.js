const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const swagger = require('./swagger');
const api404Error = require('./middleware/api404Error');

dotenv.config(); // Cargar variables de entorno

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

// 👉 Configurar estrategia OAuth con GitHub
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

// 👉 Ruta /login para iniciar sesión con GitHub
app.get('/login', (req, res) => {
  res.redirect('/auth/github');
});

// 👉 Ruta /logout para cerrar sesión
app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.send('👋 Sesión cerrada correctamente.');
    });
  });
});

// 👉 Rutas de autenticación
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/callback', passport.authenticate('github', {
  failureRedirect: '/auth/failure'
}), (req, res) => {
  res.send('✅ Autenticación exitosa. Ahora puedes usar rutas protegidas.');
});

app.get('/auth/failure', (req, res) => {
  res.status(401).send('❌ Falló la autenticación');
});

// 👉 Ruta raíz
app.get('/', (req, res) => {
  res.send('👨‍🍳 Bienvenidos al proyecto final The Food Table 🍽️');
});

// 👉 Documentación Swagger
swagger(app);

// 👉 Rutas API
app.use('/recipes', require('./routes/recipe'));       // ✅ rutas de recetas
app.use('/reviews', require('./routes/review'));       // ✅ rutas de reviews (todas)
app.use('/users', require('./routes/user'));           // ✅ usuarios
app.use('/categories', require('./routes/category'));  // ✅ categorías


// 👉 Manejo de rutas no encontradas
app.use(api404Error);

// 👉 Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
  })
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));


module.exports = app;