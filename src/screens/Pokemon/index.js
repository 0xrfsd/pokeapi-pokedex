import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';

const Pokemon = () => {

    // Recebe o parametro do nome do poke =)

    const { pokename } = useParams();

    // Declarando os tipos de pokemon com state hook :)

    const [pokeData, setPokeData] = useState([]);

    // Constante que recebe o valor da URL que queremos puxar =P

    const url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;

    // Função para puxar os dados da API :) | Passa os dados p hook 'pokeTypes'
    const fetchPokemon = () => {
        axios
            .get(url)
            .then(response => {
                setPokeData(response.data);
            })
    }

    // Effect Hook p syncar a puxada de dados da API com a DOM =D

    useEffect(() => {
        fetchPokemon();
    }, [])

    // Debbuging aushauhsausuahsauhs =)

    console.log(pokeData.abilities)

    // Warn chato pedindo id ent nx faz um letzin e chama let++ no render =S

    let id = 1;

    function TypeResult() {
        return (
            <div className="poke-display">
                    <>
                    <div className="poke-card" key={id++}>
                    <h3 className="poke-name">Name: {pokeData.name}</h3>
                    <h3 className="poke-name">Id: {pokeData.id}</h3>
                    <h3 className="poke-name">Base Experience: {pokeData.base_experience}</h3>
                    <h3 className="poke-name">Weight: {pokeData.weight}</h3>
                    <h3 className="poke-name">[...]</h3>
                        <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeData.id + ".png"} className="sprite" />
                    </div>
                    </>
            </div>
        )
    }

    return (
        <>
            <Header />
            <TypeResult/>
        </>
    );
}

export default Pokemon;

