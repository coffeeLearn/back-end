const Inquiry = require("../model/inquiryModel");
const dayjs = require("dayjs");

class InquiryService {
    static async addInpuiry({ title, content, writer_id, password, product_id }) {

        const create_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const newInquiry = { title, content, writer_id, create_date, password, product_id };
        const createInquiry = await Inquiry.write({ newInquiry });

        return createInquiry;
    }

    static async getInquiry({ id }) {
        const inquiries = await Inquiry.findByProductId(id);

        if(!inquiries) {
            throw new Error("정상적인 상품 아이디가 아닙니다. 다시 확인해 주세요");
        }

        return inquiries;
    }

    static async answer({ id, answer }) {
        let inpuiry = await Inquiry.findById(id);

        if(!inpuiry) {
           throw new Error("해당하는 문의가 없습니다. 다시 확인해주세요.");
        }

        inpuiry = await Inquiry.answer({ id, answer });

        return inpuiry;
    }

    static async edit({ title, content, writer_id, password, inquiry_id }) {
        let inpuiry = await Inquiry.findById(inquiry_id);

        if(!inpuiry) {
           throw new Error("해당하는 문의가 존재하지 않습니다.");
        }

        if(inpuiry.status == '답변 완료') {
            throw new Error("이미 답변이 완료된 문의입니다. 새롭게 작성해주세요.");
        }

        if(writer_id != inpuiry.writer_id) {
            throw new Error("작성자가 일치하지 않습니다.");
        }

        if(password != inpuiry.password) {
            throw new Error("비밀번호가 일치하지 않습니다.");
        }

        inpuiry = await Inquiry.edit({ inquiry_id, title, content, password });

        return inpuiry;
    }

    static async remove({ id, writer_id }) {
        const inpuiry = await Inquiry.findById(id);

        if(!inpuiry) {
            throw new Error("해당하는 문의가 존재하지 않습니다.");
        }

        if(writer_id != inpuiry.writer_id) {
            throw new Error("작성자가 일치하지 않습니다.");
        }

        const result = await Inquiry.delete(id);

        return result;
    }

}

module.exports = InquiryService;