/* Os controllers num esquema MVC faz as validações necessáris numa requisição */

const User = require('../models/User');

/* Métodos do controller => 
 *    index: listagem de sessões
 *    show: listar uma única sessão
 *    store: criar uma sessão
 *    update: alterar uma sessão
 *    destroy: deletar uma sessão
 */
module.exports = {
    async store(req, res) {
        /* Desestruturação com JS, dessa forma, o que está entre chaves será a chave no json que queremos receber do body */
        const { email } = req.body;

        /* O método findOne verifica no banco se já existe um usuário com aquele email,se existir, ele atribui o mesmo na variável user. Dessa forma, fazemos um if que só criamos o usuário se ele não existir, ou seja, se ele não for encontrado no banco */
        let user = await User.findOne({ email });

        if (!user) {
            /* Já que a chave de email tem o mesmo nome da variável, só colocamos email 
            * Aqui utilizamos JS de forma assíncrona, já que a ação de salvar algo no banco pode demorar alguns milisegundos, então utilizamos o await, que só continua até que crie o usuário no banco. [Sempre que usamos o await o método deve ser async]
            */
            user = await User.create({ email });
        }

        /* O user é um objeto json que o banco retorna. Ele contêm um id gerado automaticamente pelo mongo, o email cadastrado, e uma versão (__v), que representa quantas vezes aquele id foi atualizado */
        return res.json(user);
    }
};