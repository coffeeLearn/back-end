const Inquiry = require("./schema/inquirySchema");

class InquiryModel {

    static async write({ newInquiry }) {
        const createdInquiry = await Inquiry.create(newInquiry);
        return createdInquiry;
    } 

    static async findById(id) {
        const inquiry = await Inquiry.findById(id);
        return inquiry;
    }

    static async findByProductIdAndWriterId({ product_id, writer_id }) {

    }

    static async findByProductId(id) {
        const inquiries = await Inquiry.find({ product_id: id});

        return inquiries;
    }

    static async answer({ id, answer }) {
        const updateInquiry = await Inquiry.findOneAndUpdate( { _id: id }, { answer: answer, status: '답변 완료' }, { new: true });

        return updateInquiry;
    }

    static async edit({ inquiry_id, title, content, password }) {
        const updateInquiry = await Inquiry.findOneAndUpdate( { _id: inquiry_id }, { title: title, content: content, password: password }, { new: true });

        return updateInquiry;
    }

    static async delete(id) {
        await Inquiry.deleteOne(id);

        return '문의 삭제 완료';
    }

}

module.exports = InquiryModel;