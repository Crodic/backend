const { create, getAllByUser } = require('../services/bill.service');

class BillController {
    async create(req, res, next) {
        try {
            const json = await create(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }

    async getBillByUser(req, res, next) {
        try {
            const json = await getAllByUser(req);
            return res.status(json.status).json(json);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BillController();
