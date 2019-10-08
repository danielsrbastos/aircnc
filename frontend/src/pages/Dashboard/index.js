import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';  

export default function Dashboard() {
    const [ spots, setSpots ] = useState([]);

    // Método que só executa uma vez, quando o componente é criado. Ele só executa uma vez pois não passamos nenhuma variável no array de dependências, caso passassemos alguma variável, o método seria executado sempre que o valor dessa variável fosse alterado
    useEffect(() => {
        // Colocando a função toda entre parentes e acrescentando '();' no final a função é executada automaticamente. Mesma coisa que não colocar '();' e chamar 'loadSpots();' após a função
        (async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                // Passamos o ID do usuário logado no header da requisição
                headers: {
                    user_id 
                }
            })

            setSpots(response.data);
        })();
    }, []); 

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    // Sempre que fizermos uma estrutura de repetição (o map, por exemplo) preciamos colocar a key e atribuir a ela um valor único de cada spot, nesse exemplo. Essa key sempre vai estar na 1º tag que vem após a estrutura de repetição 
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}