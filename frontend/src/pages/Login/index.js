import React, { useState } from 'react';
import api from '../../services/api';

// O history é uma propriedade da rota. Ele é utilizado para navegação entre páginas
export default function Login({ history }) {
    const [ email, setEmail ] = useState(""); // O parâmetro do useState é o valor padrão daquela variável. O useState retorna um array, o 1º parâmetro é o email em si (no caso o espaço em branco, mas seu valor é sempre atualizado quando sofre alterações) e o 2º uma função que altera o valor do email.

    async function handleSubmit(event) {
        event.preventDefault(); // Falamos pro form não fazer o que ele faz por padrão, que é redirecionar para outra página quando submetemos um form
      
        // Conexão com a API, passamos a rota e o body
        const response = await api.post('/sessions', { email });
    
        // Desestrusturando os dados da response e pegando o _id
        const { _id } = response.data;
  
        // Armazenamos o ID no banco de dados do nosso navegador, dessa forma conseguimos pegar o id independente da página que estivermos. O 1º parâmetro é o nome da variável no banco de dados do navegador
        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                id="email" 
                type="email" 
                placeholder="Seu melhor e-mail"
                value={email} // Colocamos o valor da caixa sendo o valor do email, ou seja, a variável e o input ficam sempre atualizados e sincronizados
                onChange={event => setEmail(event.target.value)} // Pegamos o valor do evento onChange, no caso o valor que está na caixa de email
                required
            />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}