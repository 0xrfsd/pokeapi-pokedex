import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

import Logo from './Assets/pokemon-logo.png';

function App() {

  // Declaring pokedex and wildPokemon states using useState hook

  const [pokedex, setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({});

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

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id !== id))
  }

  return (
    <div className="app-wrapper">
        <header>
          <img alt="logo" src={Logo} className="logo" />
        <h1 className="title">Explore</h1>
        <h1 className="title">Encontre e Capture!</h1>
        </header>

        <section className="wild-pokemon">
          <h2>Pokemon disponível</h2>
          <img alt="Wild Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} className="sprite" />
          <h3>{wildPokemon.name}</h3>
          <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CAPTURAR AGORA!</button>
        </section>

        <section className="pokedex">
          <h2>Pokédex</h2>
          <div className="pokedex-list">
            {pokedex.map(pokemon => (
              <div className="pokemon" key={pokemon.id}>
                <img alt="Pokemon" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
                <h3 className="pokemon-name">{pokemon.name}</h3>
                <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default App;