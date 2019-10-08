const Booking = require('../models/Booking');

module.exports = {

    // Método que guarda uma reserva (booking) feita por algum usuário em algum spot
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        // Criamos no banco esses dados guardando o id do usuário que solicitou a reserva, o id do spot que o usuário solicitou a reserva e a data
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,  
            date
        });

        // Por padrão nós só retornamos o id do usuário e do spot. Aqui, utilizamos o populate no spot e no user, dessa forma, além de mostrar o id de ambos, mostramos todos os dados deles que se encontram no banco (tal como a versão [__v], o nome do spot e do usuário, e etc)    
        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }
}