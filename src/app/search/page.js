"use client";

import searchStyles from "./search.module.css";
import { useEffect, useState } from "react";

// POKEMON DATA 
/**
    * @typedef (Object) pokemonApiObject This is the object for a pokemon
    * @prop {String} name Name of pokemon
    * @prop {String} names Name of pokemon in diff language
    * @prop {Number} id Id of pokemon
    * @prop {Object} sprites object with all sprite references
    * @prop {Array} pokemon_species array with pokemon 
    * @prop {String} sprites.front_default default front image for sprite
    * @prop {Number} height height of pokemon, multiply by 10 to make it in cm
    * @prop {Number} wieght weight of pokemon, divide by 10 to make kg
*/

export default function Pokemon() {
    /**
     * @type {[pokemonApiObject, Function]}
     */
    const [pokemon, setPokemon] = useState({ sprites: {} });
    /**
     * @type {[String, Function]}
     */
    const [searchTerm, setSearchTerm] = useState("");


    function changeSearchTerm(e) {
        setSearchTerm(e.currentTarget.value.toLowerCase());
    }

    async function searchForPokemonByName() {
        try{
            const rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            const pokeDataFormatted = await rawData.json();
            
            setPokemon(pokeDataFormatted);
        } catch (error) {
            setPokemon({name: searchTerm, sprites: {}})
        }
    }

    async function searchForPokemonByEggGroup() {
        try{
            const rawData = await fetch(`https://pokeapi.co/api/v2/egg-group/${searchTerm}`);
            const pokeDataFormatted = await rawData.json();
            
            setPokemon(pokeDataFormatted);
        } catch (error) {
            setPokemon({name: searchTerm, pokemon_species: []})
        }
    }

    return(
        <main>
            {/* can only have one top level element */}
            <h1>Pokemon Page</h1>
            <div className={searchStyles.search}>
                <input 
                    type="search"
                    id="search"
                    name="search"
                    value={searchTerm}
                    onChange={changeSearchTerm}
                />
                <input type="button" value="Search" onClick={() => { searchForPokemonByName(); searchForPokemonByEggGroup();}}/>
            </div>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default}/>
        </main>
    );
}