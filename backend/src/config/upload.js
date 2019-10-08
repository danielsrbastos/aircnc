/* Configuração para o upload de imagens com o multer */

const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // Caminho das imagens, separamos por virgula por usarmos o método resolve, que automaticamente corrige os problemas de barra normal e invertida (incompatibilidade entre Windows e Unix)
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname); // ext de extension
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`); // name: nome do arquivo uploadado (rato.jpg), Date.now(): data e hora específica que foi enviada, para evitar sobreposição no banco, path.extname(file.originalname): extensão
        }
    }) // Como o multer vai armazenar as imagens e arquivos
};