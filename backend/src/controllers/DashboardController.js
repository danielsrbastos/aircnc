const Spot = require('../models/Spot');

module.exports = {

    // Método que lista os spots criados por aquele usuário
    async show(req, res) {
        const { user_id } = req.headers;

        // Filtramos os spots de acordo com o id do usuário no header da req
        const spots = await Spot.find({ user: user_id });

        return res.json(spots);
    }
}