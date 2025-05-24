const mongoose = require('mongoose');
const { Schema } = mongoose;

const tradeSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User' }, // User yang mengajukan tukar
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }, // User yang menerima tawaran
    requesterBook: { type: Schema.Types.ObjectId, ref: 'Book' }, // Buku yang ditawarkan
    receiverBook: { type: Schema.Types.ObjectId, ref: 'Book' }, // Buku yang diminta
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    requesterCompleted: { type: Boolean, default: false }, // Status apakah requester sudah menyelesaikan trade
    receiverCompleted: { type: Boolean, default: false } // Status apakah receiver sudah menyelesaikan trade
}, { timestamps: true });

const TradeModel = mongoose.model('Trade', tradeSchema);
module.exports = TradeModel;
