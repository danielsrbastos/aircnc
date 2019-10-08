const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: { 
        type: mongoose.Schema.Types.ObjectID, // ID do usuário que criou o spot
        ref: 'User' // A qual model estamos se referindo
    },
    spot: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);