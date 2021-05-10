import React, { FormEvent, useEffect, useState } from 'react';
import { Title, Form, Error, Pokemons } from './styles';

import api from '../../services/api';
import pokeapi from '../../services/pokeapi';
import Header from '../../components/Header';

interface IPokemonPokeAPI {
  id: number;
  name: string;
  base_experience: number;
}

interface IPokemon {
  id: string;
  resource_id: number;
  name: string;
  owner_id: string;
  base_experience: number;
  created_at: Date;
  updated_at: Date;
}

interface IPlayer {
  id: string;
  name: string;
  pokemons: IPokemon[];
}

const Dashboard: React.FC = () => {
  const [newPokemon, setNewPokemon] = useState('');
  const [inputError, setInputError] = useState('');
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPokemons(): Promise<void> {
      const response = await api.get<IPokemon[]>('/pokemons');

      const pokemonsResponse = response.data.sort((poke1, poke2) => {
        const dateP1 = new Date(poke1.updated_at);
        const dateP2 = new Date(poke2.updated_at);

        return dateP2.getTime() - dateP1.getTime();
      });
      setPokemons(pokemonsResponse);
    }

    async function loadPlayers(): Promise<void> {
      const response = await api.get<IPlayer[]>('/players');
      setPlayers(response.data);
    }

    loadPokemons();
    loadPlayers();
  }, []);

  async function handleAddPokemon(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    if (!newPokemon) {
      setInputError('Insert the pokemon name');
      setLoading(false);
      return;
    }

    const pokemonExists = pokemons.filter(poke => poke.name === newPokemon);
    if (pokemonExists.length > 0) {
      setInputError('This pokemon already exists in the database');
      setLoading(false);
      return;
    }

    try {
      const response = await pokeapi.get<IPokemonPokeAPI>(
        `pokemon/${newPokemon}/`,
      );

      const pokemon: IPokemonPokeAPI = response.data;

      // randomly chooses a player to the retrieved pokemon
      const playerRandom = players[Math.floor(Math.random() * players.length)];

      const send = {
        resource_id: pokemon.id,
        name: pokemon.name,
        base_experience: pokemon.base_experience,
        owner_id: playerRandom.id,
      } as IPokemon;

      const insertedPokemon = await api.post<IPokemon>('/pokemons', send);

      setPokemons([insertedPokemon.data, ...pokemons]);
      setNewPokemon('');
      setInputError('');
      setLoading(false);
    } catch (err) {
      setInputError('Check again the name of the pokemon.');
      setLoading(false);
    }
  }

  function getPokemonOwnerName(player_id: string): string | undefined {
    return players.find(player => player.id === player_id)?.name;
  }

  return (
    <>
      <Header />
      <Title>Search for pokemons to add to the database</Title>
      <Form
        isLoading={loading}
        hasError={!!inputError}
        onSubmit={handleAddPokemon}
      >
        <input
          value={newPokemon}
          onChange={e => setNewPokemon(e.target.value)}
          placeholder="Insert the pokemon name"
        />
        <button disabled={loading} type="submit">
          Buscar
        </button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Title>Pokemons retrieved</Title>
      <Pokemons>
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <strong>{pokemon.name}</strong>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>Owner: {getPokemonOwnerName(pokemon.owner_id)}</p>
          </div>
        ))}
      </Pokemons>
    </>
  );
};

export default Dashboard;
