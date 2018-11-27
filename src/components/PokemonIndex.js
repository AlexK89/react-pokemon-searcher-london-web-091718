import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import {Search} from 'semantic-ui-react'
import _ from 'lodash'

const API = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
    state = {
        pokemons: [],
        searchTerm: ''
    };

    fetchData = async (url) => await fetch(url).then(resp => resp.json());

    async componentDidMount() {
        const data = await this.fetchData(API);

        this.setState({pokemons: data});
    }

    searchHandler = (_, input) => {
        this.setState({searchTerm: input.value});
    };

    filterPokemons = () => {
        return this.state.pokemons.filter(item => item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    };


    addNewPockemon = (pokemon) => {
        let pokemons = [...this.state.pokemons];
        pokemons.push(pokemon);

        this.setState({pokemons})
    };

    postData = (pockemon) => {
        fetch(API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(pockemon)
        })
            .then(response => response.json())
            .then(data => this.addNewPockemon(data))
    };

    render() {
        const pokemonsForRendering = this.state.searchTerm ? this.filterPokemons() : this.state.pokemons;
        return (
            <div>
                <h1>Pokemon Searcher</h1>
                <br/>
                <Search onSearchChange={_.debounce(this.searchHandler, 400)} showNoResults={false}/>
                <br/>
                <PokemonForm postData={this.postData}/>
                <br/>
                <PokemonCollection pokemons={pokemonsForRendering}/>
            </div>
        )
    }
}

export default PokemonPage
