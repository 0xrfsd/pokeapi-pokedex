import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import {
    Link,
} from "react-router-dom";
import Drago from '../../Assets/drago.png'
import Bird from '../../Assets/bird.png'

import Header from '../../components/Header';

function App() {

    // Declarando os tipos de pokemon com state hook :)

    const [pokeTypes, setPokeTypes] = useState([]);

    // Função para puxar os dados da API :) | Passa os dados p hook 'pokeTypes'
    const fetchType = () => {
        axios
            .get(url)
            .then(response => {
                setPokeTypes(response.data.results);
            })
    }

    // Effect Hook p syncar a puxada de dados da API com a DOM =D

    useEffect(() => {
        fetchType();
    }, [])

    // Constante que recebe o valor da URL que queremos puxar =P

    const url = 'https://pokeapi.co/api/v2/type/';

    // Constante que recebe o valor da URL que estamos passando a query...

    const backUrl = '/'

    // Render =P

    return (
        <div className="app">
            <div className="right">
                <Header />
                <div className="types">
                    {/* Função map pra listar cada indice da array que queremos renderizar S2 */}
                    {pokeTypes.map(type => (
                        <Link to={{ pathname: `/type/${type.name}`, query: { backUrl } }}>
                            <div className="type" key={type[0]}>
                                <h3 className="type-name">{type.name.toUpperCase()}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="jumbo">
                    <h1>
                        Explore <br />
                        Find <br />
                        Capture <br />
                    </h1>
                    <img alt="Dragonite" src={Drago} className="poke" />
                    <img alt="Bird" src={Bird} className="poke" />
                </div>
                <div className="second">
                <div className="rightodo">
                <Link style={{ fontSize: '.5em', color: '#fff' }} to="/deck">
                        <h1>
                            Capture pokémons <br />
                        </h1>
                    </Link>
                    </div>
                    <div className="rightopodo">
                    <Link style={{ fontSize: '8px', color: '#fff' }} to="/pokemons">
                        <h1>
                            <br />
                            Pokémons <br />
                        </h1>
                    </Link>
                    </div>
                </div>
                <div className="second">
                    <div className="leftodo" onClick={() => alert('Em breve...')}>
                        <h1>
                            Pokémon Trunfo <br />
                        </h1>
                    </div>
                    <div className="rightodo" onClick={() => alert('Em breve...')}>
                        <h1>
                            Capture items <br />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;