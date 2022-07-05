const Crypto = require('../models/Crypto');

exports.createCrypto = async (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('owner');

exports.buyCrypto = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } });

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.updateCrypto = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, { runValidators: true });

createOptions = (paymentOption) => {
    return [
        { content: "Crypto Wallet", value: "crypto-wallet" },
        { content: "Credit Card", value: "credit-card" },
        { content: "Debit Card", value: "debit-card" },
        { content: "PayPal", value: "paypal" },

    ].map(x => x.value == paymentOption ? { ...x, selected: "selected" } : x);
};

exports.getOneWithOptions = async (cryptoId, userId) => {
    const crypto = await Crypto.findById(cryptoId).lean();

    if (crypto.owner != userId) {
        throw ({ message: "Invalid User!" });
    }

    crypto.options = createOptions(crypto.paymentMethod);

    return crypto;
};