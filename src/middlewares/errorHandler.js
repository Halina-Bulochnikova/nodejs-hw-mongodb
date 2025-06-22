export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  
  if (Array.isArray(err.errors)) {
    const errors = err.errors.map(e => ({
      field: e.path?.[0],
      message: e.message
    }));

    return res.status(status).json({
      status,
      message: err.message,
      errors
    });
  }

  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: err.message
  });
};