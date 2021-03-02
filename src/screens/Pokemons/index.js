import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css'; 
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

const Pokemons = () => {

    // Declarando os tipos de pokemon com state hook :)

    const [pokemons, setPokemons] = useState([]);

    // Função para puxar os dados da API :) | Passa os dados p hook 'pokeTypes'
    const fetchPokemons = () => {
        axios
            .get(url)
            .then(response => {
                setPokemons(response.data.results);
            })
    }

    // Effect Hook p syncar a puxada de dados da API com a DOM =D

    useEffect(() => {
        fetchPokemons();
    }, [])

    // Constante que recebe o valor da URL que queremos puxar =P

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000/';

    const pokemonsAlph = pokemons.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })

    let id = 0;

    function PokemonsResult() {
        return (
            <div className="poketyperesult">
                {pokemons.map(pokemon => (
                    <>
                    <div className="poketype" key={id++}>
                        {/* <Link to="/pokemon/:pokemon"> */}
                        <h1 className="poketype-title">{pokemon.name}</h1>
                        {/* </Link> */}
                        <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split('/')[6] + ".png"} className="sprite" />
                    </div>
                    </>
                ))}
            </div>
        )
    }

    console.log(pokemons);

    return(
        <>
        <Header />
        <PokemonsResult/>
        </>
    );
}

export default Pokemons;