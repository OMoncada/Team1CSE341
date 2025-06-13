const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  role: { type: String, default: 'user' }, // puede ser 'admin', 'user', etc.
  bio: { type: String }, // pequeña biografía
  createdAt: { type: Date, default: Date.now }
});

userSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
