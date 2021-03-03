import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

const Pokemons = () => {

    // Declarando os tipos de pokemon com state hook :)

    const [pokemons, setPokemons] = useState([]);

    // Declarando os hooks de pesquisa
    const [searchTerm, setSearchTerm] = useState("");


    // Declarando o hook do resultado da pesquisa
    const [searchResults, setSearchResults] = useState([]);    
    
    // Processar o input de pesquisa

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm)
        if(searchTerm !== "") {
            const newPokemons = pokemons.filter((poke) => {
                return Object.values(poke)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            });
            setSearchResults(newPokemons);
        }
        else {
            setSearchResults(pokemons);
        }
    }

    function RenderSearch() {
        if(searchResults == "") {
            return(
                <div className="poketyperesult">
                {pokemons.map(pokemon => (
                    <>
                        <div className="poked" key={id++}>
                            <Link style={{ fontSize: '12px', color: '#fff' }} to={{ pathname: `/pokemon/${pokemon.name}`, query: { backUrl } }}>
                                <h1 className="poketype-title">{pokemon.name}</h1>
                            </Link>
                            <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split('/')[6] + ".png"} className="sprite" />
                        </div>
                    </>
                ))}
            </div>
            )
        } else {
            return(
                <div className="poketyperesult">
                {searchResults.map(pokemon => (
                    <>
                        <div className="poked" key={id++}>
                            <Link style={{ fontSize: '12px', color: '#fff' }} to={{ pathname: `/pokemon/${pokemon.name}`, query: { backUrl } }}>
                                <h1 className="poketype-title">{pokemon.name}</h1>
                            </Link>
                            <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.url.split('/')[6] + ".png"} className="sprite" />
                        </div>
                    </>
                ))}
            </div>
            )
            
        };
    };

    // UseRef para iniciar um valor de str vazio

    const inputEl = useRef("");

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
        RenderSearch();
    }, [])

    // Constante que recebe o valor da URL que queremos puxar =P

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000/';

    const pokemonsAlph = pokemons.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    })

    let id = 0;

    const backUrl = '/pokemons/'

    const selected = true

    function PokemonsResult(props) {

        const getSearchTerm = () => {
            props.searchKeyword(inputEl.current.value)
        }

        return (
            <>
                <div className="search">
                    <div className="icon input">
                        <input
                            onSelect={selected}
                            ref={inputEl}
                            type="text"
                            placeholder="Search pokémon"
                            className="prompt"
                            value={props.term}
                            onChange={getSearchTerm}
                        />
                        <i className="icon"></i>
                        <RenderSearch/>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <PokemonsResult
                term={searchTerm}
                searchKeyword={searchHandler}
            />
        </>
    );
}

export default Pokemons;