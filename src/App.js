import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import Logo from './Assets/pokemon-logo.png';

function App() {

  // Declarando pokedex e wildPokemon states hook

  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({});

  // Declarando SearchTerm state hook
  const [searchTerm, setSearchTerm] = React.useState('');

  // Constante que escuta a mudança do valor do input de pesquisa
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  // useEffect hook to sync and mount the fetchAPI reqs

  useEffect(() => {
    fetchAPI()
  }, [])

  // A random pokemon id selector from 1 to 151

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Fetch API Data through axios get.req lib
  // Passing the get.req response to state hook

  const fetchAPI = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
      .then(response => {
        setWildPokemon(response.data);
      })
  }

  // The setPokedex hook is the user pokedex, a state that when triggered the pokemon goes to your pokedex
  // The logic is a filter, that receieve the [i] as 'p' and if the 'p'.id is equals to pokemon.id and the lenghth is not 0 goes to pokedex
  // The pokedex is state receive all tha pass state as [...state] and inc the new pokemon :)
  // Also if the pokemon not exists (!monExists) in the pokedex sort it in ascending order.

  const catchPokemon = (pokemon) => {
    setPokedex(state => {
      const monExists = (state.filter(p => pokemon.id === p.id).length > 0);

      if (!monExists) {
        state = [...state, pokemon]
        state.sort(function (a, b) {
          return a.name - b.name
        })
      }
      return state
    })
    fetchAPI()
  }

  const jumpPokemon = (pokemon) => {
    fetchAPI()
  }

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id !== id))
  }


  // Constante que recebe os indices da pokedex como 'pokemon' e retorna o indice 'pokemon'

  const pokeMap = pokedex.map(pokemon => pokemon);

  // Algoritmo de sort em ordem ascendente (alfabetica) recebendo 'name'
  // Constante que recebe o valor da pokedex[] e aplica um alg sort de ordem alfabetica

  const pokeMapAlph = pokedex.sort(function (a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  })



  // Componente para renderizar a lista 'pokedex' passando os indices como 'pokemon'

  function MapDex() {
    return (
      <>
        {pokedex.map(pokemon => (
          <div className="pokemon" key={pokemon.id}>
            <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
            <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
            <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
          </div>
        ))}
      </>
    );
  }

  // Componente para representar condicional de pokedex vazia

  function EmptyDex() {
    return <p className="empty">Você ainda não possui nenhum pokémon :(</p>
  }

  // Condicional que interpreta se o peso de pokedex é maior que 0 ou seja 'existe um peso' se sim retorna o componente de map da pokedex se nao retorna componente de texto 'Pokedex vazia'

  function ShowDex() {
    if (pokedex.length > 0) {
      return <MapDex />
    }
    return <EmptyDex />
  }

  return (
    <div className="app-wrapper">
      <header>
        <img alt="logo" src={Logo} className="logo" />
        <h1 className="title">Encontre e Capture!</h1>
      </header>

      <section className="wild-pokemon">
        <h2>Pokemon disponível</h2>
        <img alt="Wild Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} className="sprite" />
        <h3>{wildPokemon.name}</h3>
        <div className="buttons">
          <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CAPTURAR AGORA!</button>
          <button className="jump-btn" onClick={() => jumpPokemon(wildPokemon)}>PRÓXIMO POKEMON</button>
        </div>
      </section>

      <section className="filter">
        <h1>Seus pokémons</h1>
        <form className="form">
          <input
            type="text"
            className="input-q"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
      </section>


      <section className="pokedex">
        <div className="pokedex-list">

          {/* {cond 
?
<div>If rendering</div>
:
<div>Else rendering</div>
} */}

          <ShowDex />

        </div>
      </section>
    </div>
  )
}

export default App;