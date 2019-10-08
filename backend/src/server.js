/*
 *  => Código "inicial", onde inicializamos o servidor
 *       Para executarmos o servidor utilizamos o comando "node ./src/server.js"
 *       Dessa forma, podemos acessar nossa aplicação no navegador
 */

/* => Importação da biblioteca express
 *      O express é um micro-framework dentro do node para não termos que recriar
 *      a roda. Ele faz a definição de rotas e configuração de porta "automaticamente",
 *      facilitando o nosso trabalho. Podemos fazer tudo isso sem utilizar o express,
 *      de forma nativa do node, porém, o trabalho é bem maior.      
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

/* => Devemos colocar o ./, para dizer que é um diretório, se não ele tenta achar uma
*      dependência instalada com o nome routes
*/
const routes = require('./routes');
    
const database = require('./config/database');

/* Criação da aplicação */
const app = express();

/* Conexão com o mongo, o 2º parâmetro corrige alguns warnings que o node traz */
mongoose.connect(database, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(cors());

/* => Falamos pro express utilizar o formato json, assim, podemos acessar o body das 
 *      requisições 
 */
app.use(express.json());

/* => Rota de '/files' para as imagens */
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

/* => Falamos pro app utilizar as rotas que criamos
 *      ps: é importante colocar abaixo do express, se não ele não é "importado" na hora
 *          que configuramos as rotas no arquivo routes
 */
app.use(routes);

/* arg0 => rota do usuário (também chamado de endpoint)
 *          ex: 'localhost:3333/contatos', 'localhost:3333/produtos' e etc. A rota é a 
 *               página "contatos", "produtos" e etc. Podemos passar uma "/", ou seja, é a 
 *               página inicial 'localhost:3333'. Uma boa prática é que toda rota
 *               tenha seu nome no inglês e no plural, como fizemos abaixo (/users)
 * 
 * arg1 => função que recebe dois parâmetros, request e response (requisição e resposta)
 *          req: representa a requisição, através dele vamos pegar qualquer informação 
 *               que o usuário enviar na requisição
 *          res: representa a resposta que enviaremos a requisição. Toda requisição 
 *               tem uma resposta, por esse motivo passamos um return na res com o 
 *               método send, que envia uma mensagem. Temos vários métodos além do 
 *               send, geralmente utilizamos o json e o status, já que estamos fazendo 
 *               uma API e json é o método padrão de troca de dados na aplicação e o
 *               status é utilizado para retornar um status HTTP (404, 402). 
 *               O método json recebe um objeto json ou um array.
 *
 * => Além do método get, temos o post, put e delete (existem vários outros métodos,
 *      porém esses são os mais importantes dentro de uma API rest)
 * 
 *      get: receber dados de um Resource
 *           (ex: listagem de usuários)
 *      post: enviar dados para serem processados por um Resource
 *            (ex: cadastro de usuários)
 *      put: atualizar dados de um Resource 
 *           (ex: editar algum usuário cadastrado)
 *      delete: deletar um Resource 
 *              (ex: remoção de um usuário cadastrado)
 * 
 *      ps: nos exemplos citados acima, o nosso Resource seria users" (no caso a rota "/users")
 * 
 *      resumindo: get - buscar informação
 *                 post - criar informação
 *                 put - alterar informação
 *                 delete - deletar informação
 * 
 *      ps: os navegadores por padrão executam um método tipo get, por esse motivo
 *          precisamos utilizar outra ferramenta para testar as rotas que não
 *          utilizam o método get. Nesse caso, utilizaremos o insomnia.
 * 
 * => Quando efetuamos uma rota do tipo get podemos pegar informações da query string
 *      utilizando a propriedade query da requisição. ex: req.query.query_param
 *      Geralmente utilizamos query params para filtrar algo, já que é comum
 *      expor os filtros na url da rota
 * 
 * => Quando efetuamos uma rota do tipo post ou put podemos pegar informação como 
 *      parâmetro da rota, ex: localhost:3333/users/50. Na hora de passarmos a rota
 *      para o método de requisição utilizado colocamos "/users/:id", dessa forma,
 *      o id se tornaria um parâmetro da url. Para pegarmos essa informação
 *      utilizamos a propriedade params da requisição e logo em seguida passamos o 
 *      parâmetro que queremos da url. ex: req.params.id  
 * 
 *      resumindo: req.query => acessar query params (para filtros)
 *                 req.params => acessar route params (para edição, delete)
 *                 req.body   => acessar corpo da requisição (para criação, edição)
 */
/*app.post('/users', (req, res) =>  {
    // return res.send('Hello, World!'); 
    return res.json(req.body);
});*/

/* Atribuição da porta que executaremos a nossa aplicação
 * Ex: localhost:3333
 */
app.listen(3333);