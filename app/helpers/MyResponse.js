module.exports = (res, code, success, message, data, errors = null) => {
    return res.status(200).json({
        code: code,
        success: success,
        message: message,
        data: data,
        errors: errors ?? {}
    });
}