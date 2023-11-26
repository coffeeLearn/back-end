const { object } = require("joi");
const { mongoose, model } = require("mongoose");

const InquirySchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    writer_id: { 
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        default: '답변 대기 중',
        require: true
    },
    password: {
        type: String,
        require: false
    },
    product_id: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: false
    },
    answer_date: {
        type: Date,
        require: false
    }
},
{
    versionKey: false
});


const inquiryModel = model('Inquiry', InquirySchema);

module.exports = inquiryModel;