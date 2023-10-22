const { object } = require("joi");
const { mongoose, model } = require("mongoose");

const OrderSchema = mongoose.Schema({
    products: {
        type: Array,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    reg_date: {
        type: Date,
        require: true
    },
    userName: { 
        type: String,
        require:true
    },
    receiver: {
        type: String,
        require: true
    },
    receiverPhone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        requrie: true
    },
    detailedAddress: {
        type: String,
        requrie: true
    },
    receiverMessage: {
        type: String,
        requrie: true
    },
    deliverFee: {
        type: Number,
        requrie: true
    },
    totalPriceEl: {
        type: Number,
        requrie: true
    }
},
{
    versionKey: false
});


const orderModel = model('Order', OrderSchema);

module.exports = orderModel;