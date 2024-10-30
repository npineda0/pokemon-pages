"use client";
import pokemonStyles from "./pokemon.module.css";

export default function PokemonCard({ img = "", name = "", types = [] }) {
    return (
        <div className={pokemonStyles.pokeCard}>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png"/>
          <div>
            <h4>Meow</h4>
            <p>types: normal</p>
          </div>
        </div>
    );
}