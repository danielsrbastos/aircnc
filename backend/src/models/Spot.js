const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String], // Array de Strings
    user: { 
        type: mongoose.Schema.Types.ObjectID, // ID do usuário que criou o spot
        ref: 'User' // A qual model estamos se referindo
    }
}, {
    // Habilitamos os virtuals
    toJSON: {
        virtuals: true
    }
});

// Virtual. Só aparece quando a requisição é feita, no banco não existe. O replace é responsável por arrumar o bug quando a imagem uploadada tem espaços entre o nome. Ele tira os espaços e substitui por '%20' na URL
SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`.replace(' ', '%20');
});

module.exports = mongoose.model('Spot', SpotSchema);