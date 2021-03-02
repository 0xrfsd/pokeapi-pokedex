import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css'; 
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

const Pokemon = () => {

    const { pokemon } = useParams();

    // Declarando os tipos de pokemon com state hook :)

    const [iPokemon, setiPokemon] = useState('');

    // Função para puxar os dados da API :) | Passa os dados p hook 'pokeTypes'
    const fetchPokemon = () => {
        axios
            .get(url)
            .then(response => {
                setiPokemon(response.data.results);
            })
    }

    // Effect Hook p syncar a puxada de dados da API com a DOM =D

    useEffect(() => {
        fetchPokemon();
    }, [])

    // Constante que recebe o valor da URL que queremos puxar =P

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    console.log(iPokemon);

    let id = 1;

    function PokemonResult() {
        return (
            <div className="poketyperesult">
                {iPokemon.map(poke => (
                    <>
                    <div className="poketype" key={id++}>
                        <h1 className="poketype-title">{poke.name}</h1>
                        <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split('/')[6] + ".png"} className="sprite" />
                    </div>
                    </>
                ))}
            </div>
        )
    }

    return(
        <>
        <Header />
        <PokemonResult/>
        </>
    );
}

export default Pokemon;