const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

categorySchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model('Category', categorySchema);
