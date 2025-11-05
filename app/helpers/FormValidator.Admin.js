const { check } = require('express-validator');

exports.login = () => {
    return [
        check('phone', { msg: '手机号不能为空' }).not().isEmpty(),
        check('password', { msg: '密码不能为空' }).not().isEmpty(),
        check('uuid', { msg: 'UUID_REQUIRED' }).not().isEmpty(),
        check('verification_code', { msg: '验证码不能为空' }).not().isEmpty()
    ]
}

exports.create_domain = () => {
    return [
        check('url', { msg: '域名不能为空' }).not().isEmpty(),
    ]
}

exports.update_status = () => {
    return [
        check('status')
            .not().isEmpty().withMessage('状态不能为空')
            .isInt({ min: 0, max: 1 }).withMessage('状态必须是0或1')
    ]
}