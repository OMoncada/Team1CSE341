const Category = require('../models/category');

// ✅ GET /categories - Obtener todas las categorías
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// GET /categories/:id
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};


// ✅ POST /categories - Crear una nueva categoría
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

// ✅ PUT /categories/:id - Actualizar una categoría existente
exports.updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE /categories/:id - Eliminar una categoría
exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
