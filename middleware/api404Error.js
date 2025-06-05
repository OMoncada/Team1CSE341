const api404Error = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
};

module.exports = api404Error;
