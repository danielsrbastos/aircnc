/* Os models num esquema MVC é relacionado aos schemas no banco de dados */

const mongoose = require('mongoose');

/* Estrutura do usuário (quais campos e seu respectivo tipo [String, Number, Boolean, Array, Object]) */
const UserSchema = new mongoose.Schema({
    email: String
});

/* Exportamos o modelo User para o banco mongo reconhecer */
module.exports = mongoose.model('User', UserSchema);