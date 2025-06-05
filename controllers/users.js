const User = require('../models/user');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().populate('favorites', 'name');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('favorites', 'name');
    if (!user) {
      return res.status(404).json({ message: `User ${req.params.id} not found` });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('favorites', 'name');
    if (!updated) {
      return res.status(404).json({ message: `User ${req.params.id} not found` });
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: `User ${req.params.id} not found` });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
