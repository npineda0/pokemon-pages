"use client";
import usePokemonApi from "@/hooks/usePokemonApi";
import { useEffect, useState } from "react";

export default function Home() {
  const pokeData = usePokemonApi();

  useEffect(() => {
    if(pokeData.totalPokemonCount === 0 ) {
      pokeData.getNumberOfPokemon()
    }
  }, [pokeData]);

  console.log(pokeData);

  //generate random pokemon api 
  const appState = usePokemonApi();


  return (
    <main>
      <h1>Home</h1>
      {/* display random pokemon */}
      <usePokemonApi />
    </main>
  )
}
