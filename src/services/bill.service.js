const createHttpError = require('http-errors');
const BILL = require('../models/bill.model');
const USER = require('../models/user.model');

class BillService {
    async create(req) {
        try {
            const { couponId, payment, total, address, products, phone } = req.body;
            const { id } = req.user;
            const createPayment = await BILL.create({
                user: id,
                coupon: couponId,
                payment,
                total,
                address,
                products,
                phone,
            });
            if (!createPayment) throw createHttpError(404, 'Không thể tạo đơn hàng. Vui lòng thử lại sao');
            await USER.findByIdAndUpdate(id, { $set: { cart: [] } });
            return {
                status: 201,
                message: 'Tạo đơn hàng thành công',
                data: {
                    bill: createPayment,
                },
            };
        } catch (error) {
            throw error;
        }
    }
    async getAllByUser(req) {
        try {
            const { id } = req.user;
            const bills = await BILL.find({ user: id }).populate('user');
            return {
                status: 200,
                message: 'Lấy danh sách hoá đơn thành công',
                data: {
                    bills,
                },
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BillService();
