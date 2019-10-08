const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    // Método que lista os spots na tela do usuário
    async index(req, res) {
        const { tech } = req.query;

        // Filtramos os spots de acordo com a tecnologia específicada no query
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    // Método que salva no banco um spot
    async store(req, res) {
        //console.log(req.body);
        // As informações do body aparecem todas no req.body, menos a thumbnail, que fica no req.file (o body multipart separa os arquivos por padrão)
        //console.log(req.file);  

        const { filename } = req.file;
        const { company, techs, price } = req.body;

        /* Pegamos o id do usuário que está cadastrando aquele spot. Geralmente usamo os headers para definir o contexto da requisição (ex: contexto de autenticação,idioma [variando a resposta em PT, EN, etc]) */
        const { user_id } = req.headers;

        /* Verificamos se o usuário que está tentando criar o spot existe ou não no banco */
        const user = await User.findById(user_id);

        if (!user)
            return res.status(400).json({ error: 'User does not exists' });

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()), // Separa a string que tem as tecnologias separadas por vírgula em um array, depois utilizamos o método map para tirar os espaços em branco no começo e no final da tecnologia, utilizando o método trim
            price
        });

        return res.json({ spot });
    }
};