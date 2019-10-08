import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [ thumbnail, setThumbnail ] = useState(null);
    const [ company, setCompany ] = useState("");
    const [ techs, setTechs ] = useState("");
    const [ price, setPrice ] = useState("");

    useEffect(() => {
        const user_id = localStorage.getItem('user');

        if (!user_id) 
            history.push('/');
    }, [ history ]);

    // É executado durante a renderização do componente (lembre-se que o componente é renderizado sempre que algum valor do state é alterado). É parecido com o useEffect, recebe os mesmos parâmetros e tem a mesma ideia
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;    
    }, [ thumbnail ]);

    async function handleSubmit(event) {
        event.preventDefault();

        // Objeto utilizado para enviar dados Multipart no body da req
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        // append adiciona uma informação no objeto
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label 
                    id="thumbnail" 
                    style={{ backgroundImage: `url(${preview})` }}
                    className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                    <img src={camera} alt="Select icon" />
                </label>

                <label htmlFor="company">EMPRESA *</label>
                <input 
                    id="company"
                    type="text"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                    placeholder="Sua empresa incrível"
                />

                <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
                <input 
                    id="techs"
                    type="text"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                    placeholder="Quais tecnologias usam?"
                />

                <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
                <input 
                    id="price"
                    type="text"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    placeholder="Valor cobrado por dia"
                />

                <button type="submit" className="btn">Cadastrar</button>
            </form>
        </>
    );
}