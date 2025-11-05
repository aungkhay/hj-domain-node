const MyResponse = require('../../helpers/MyResponse');
const CommonHelper = require('../../helpers/CommonHelper');
let { validationResult } = require('express-validator');
const { Domain } = require('../../models');

class Controller {
    constructor () {
        this.commonHelper = new CommonHelper();
        this.ResCode = this.commonHelper.ResCode;
        this.getOffset = this.commonHelper.getOffset;
    }

    INDEX = async (req, res) => {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = parseInt(req.query.perPage || 10);
            const offset = this.getOffset(page, perPage);

            const { rows, count } = await Domain.findAndCountAll({
                order: [['createdAt', 'DESC']],
                limit: perPage,
                offset: offset
            });

            const data = {
                domains: rows,
                meta: {
                    page: page,
                    perPage: perPage,
                    totalPage: count > 0 ? Math.ceil(count / perPage) : count,
                    total: count
                }
            }

            return MyResponse(res, this.ResCode.SUCCESS, true, '成功', data);
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, false, 'Server Error!', {});
        }
    }

    CREATE = async (req, res) => {
        try {
            const err = validationResult(req);
            const errors = this.commonHelper.validateForm(err);
            if (!err.isEmpty()) {
                return MyResponse(res, this.ResCode.VALIDATE_FAIL, false, 'Validate Failed!', {}, errors);
            }

            const { url } = req.body;

            await Domain.create({ url });

            return MyResponse(res, this.ResCode.SUCCESS, true, '添加成功', {});
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, false, 'Server Error!', {});
        }
    }

    UPDATE = async (req, res) => {
        try {
            const err = validationResult(req);
            const errors = this.commonHelper.validateForm(err);
            if (!err.isEmpty()) {
                return MyResponse(res, this.ResCode.VALIDATE_FAIL, false, 'Validate Failed!', {}, errors);
            }

            const { url } = req.body;
            const domain = await Domain.findByPk(req.params.id);
            if(!domain) {
                return MyResponse(res, this.ResCode.NOT_FOUND, false, '未找到信息', {});
            }

            await domain.update({ url });

            return MyResponse(res, this.ResCode.SUCCESS, true, '更新成功', {});
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, false, 'Server Error!', {});
        }
    }

    UPDATE_STATUS = async (req, res) => {
        try {
            const err = validationResult(req);
            const errors = this.commonHelper.validateForm(err);
            if (!err.isEmpty()) {
                return MyResponse(res, this.ResCode.VALIDATE_FAIL.code, false, 'Validate Failed!', {}, errors);
            }

            const { status } = req.body;
            const domain = await Domain.findByPk(req.params.id);
            if(!domain) {
                return MyResponse(res, this.ResCode.NOT_FOUND, false, '未找到信息', {});
            }

            await domain.update({ status });

            return MyResponse(res, this.ResCode.SUCCESS, true, '更新成功', {});
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, false, 'Server Error!', {});
        }
    }

    DELETE = async (req, res) => {
        try {
            const domain = await Domain.findByPk(req.params.id);
            if(!domain) {
                return MyResponse(res, this.ResCode.NOT_FOUND, false, '未找到信息', {});
            }

            await domain.destroy();

            return MyResponse(res, this.ResCode.SUCCESS, true, '删除成功', {});
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, false, 'Server Error!', {});
        }
    }
}

module.exports = Controller