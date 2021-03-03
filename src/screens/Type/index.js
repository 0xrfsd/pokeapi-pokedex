import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import {
    useParams,
    Link
} from 'react-router-dom';

import Header from '../../components/Header';

const Type = () => {

    const { type } = useParams()

    const [typePokemons, setTypePokemons] = useState([]);
    const [typePokeId, setTypePokeId] = useState([]);

    // // Constante que recebe o valor da URL que queremos puxar =P

    const url = `https://pokeapi.co/api/v2/type/${type}`;

    const fetchTypePokemons = () => {
        axios
            .get(url)
            .then(response => {
                setTypePokemons(response.data.pokemon);
            })
    }

    // Algoritmo de sort em ordem ascendente (alfabetica) recebendo 'name'
    // Constante que recebe o valor da pokedex[] e aplica um alg sort de ordem alfabetica

    const pokeTypeAlph = typePokemons.sort(function (a, b) {
        if (a.pokemon.name < b.pokemon.name) { return -1; }
        if (a.pokemon.name > b.pokemon.name) { return 1; }
        return 0;
    })

    let id = 0;

    const backUrl = `/type/:${type.name}`

    function TypeResult() {
        return (
            <div className="poketyperesult">
                {pokeTypeAlph.map(typePoke => (
                    <>
                        <Link style={{ color: '#fff', fontSize: '12px' }} to={{ pathname: `/pokemon/${typePoke.pokemon.name}`, query: { backUrl } }}>
                    <div className="poketype" key={id++}>
                        <h1 className="poketype-title">{typePoke.pokemon.name}</h1>
                        <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + typePoke.pokemon.url.split('/')[6] + ".png"} className="sprite" />
                    </div>
                    </Link>
                    </>
                ))}
            </div>
        )
    }

    // // Effect Hook p syncar a puxada de dados da API com a DOM =D

    useEffect(() => {
        fetchTypePokemons();
    }, [])

    return (
        <div className="typePage">
            <Header />
            <div className="type-h">
            <h1 className="type-name-title">{type.toUpperCase()}</h1>
            </div>
            <TypeResult />
        </div>
    );
}

export default Type;
