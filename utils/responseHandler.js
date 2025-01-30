const responseHandler = (res, code, message, data = {}) => {
    res.status(code).json({ status: code < 400 ? 'success' : 'error', code, message, data });
};

module.exports = responseHandler;
