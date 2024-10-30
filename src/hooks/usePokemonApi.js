"use client";
import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonState, setPokemonState] = useState({ totalPokemonCount: 0 });

    /**
   * Fetches the pokemon api with a limit of 1 to minimize api call time. Uses count returned to determine the total number of pokemon stored on the api.
   **/
  async function getNumberOfPokemon() {
    const pokeResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1`
    );
    const { count: pokemonCount } = await pokeResponse.json();
    setPokemonState({ ...pokemonState, totalPokemonCount: pokemonCount });
  }

  /**
   * Get 5 random unique ids to fetch pokemon
   **/
  async function getRandomPokemon(limit = 5) {
    if (!pokemonState.totalPokemonCount) return [];
    const pokemonIds = {};
    let pokeIndex = 0;

    while (pokeIndex < limit) {
      const randId = parseInt(Math.random() * pokemonState.totalPokemonCount) + 1;
      if (!pokemonIds[randId]) {
        const pokeRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randId}`
        );
        pokemonIds[randId] = await pokeRequest.json();
        pokeIndex++;
      }
    }

    setPokemonState({
      ...pokemonState,
      randomPokemon: Object.values(pokemonIds),
    });
  }

  // modified
  const pokemonValues = { ...pokemonState, getNumberOfPokemon, getRandomPokemon };

    return (
        <PokemonContext.Provider value={pokemonValues}>
          {children}
        </PokemonContext.Provider>
      );
}

export default function usePokemon() {
    return useContext(PokemonContext);
  }