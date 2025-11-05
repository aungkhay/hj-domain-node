const MyResponse = require('../../helpers/MyResponse');
const CommonHelper = require('../../helpers/CommonHelper');
const { Domain } = require('../../models');

class Controller {
    constructor () {
        this.commonHelper = new CommonHelper();
        this.ResCode = this.commonHelper.ResCode;
    }

    DOMAIN_LIST = async (req, res) => {
        try {
            const domains = await Domain.findAll({where: { status: 1 }, attributes: ['url'] });
            const data = domains.map(d => Buffer.from(d.url, 'utf-8').toString('base64'));
            
            return MyResponse(res, this.ResCode.SUCCESS, true, 'Success', data);
        } catch (error) {
            return MyResponse(res, this.ResCode.SERVER_ERROR, 'Server Error!', {});
        }
    }
}

module.exports = Controller