const handleResponse = (res, status, message, data, error) => {
  res.status(status).json({
    status,
    message,
    data, 
    error
  });
};

export default handleResponse;
