import React, { FormEvent, useEffect, useState } from 'react';

import { getTypeParameterOwner } from 'typescript';
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

  useEffect(() => {
    async function loadPokemons(): Promise<void> {
      const response = await api.get<IPokemon[]>('/pokemons');
      console.log('dataaaa', response.data);
      setPokemons(response.data);
    }

    async function loadPlayers(): Promise<void> {
      const response = await api.get<IPlayer[]>('/players');
      console.log('playeeeeers', response.data);
      setPlayers(response.data);
    }

    loadPokemons();
    loadPlayers();
  }, []);

  async function handleAddPokemon(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newPokemon) {
      setInputError('Insert the pokemon name');
      return;
    }

    const pokemonExists = pokemons.filter(poke => poke.name === newPokemon);
    if (pokemonExists.length > 0) {
      setInputError('This pokemon already exists in the database');
      return;
    }

    try {
      const response = await pokeapi.get<IPokemonPokeAPI>(
        `pokemon/${newPokemon}/`,
      );

      const pokemon: IPokemonPokeAPI = response.data;

      const playerRandom = players[Math.floor(Math.random() * players.length)];

      console.log(playerRandom);

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
    } catch (err) {
      setInputError('Check again the name of the pokemon.');
    }
  }

  return (
    <>
      <Header />
      <Title>Search for pokemons to add to the database</Title>
      <Form hasError={!!inputError} onSubmit={handleAddPokemon}>
        <input
          value={newPokemon}
          onChange={e => setNewPokemon(e.target.value)}
          placeholder="Insert the pokemon name"
        />
        <button type="submit">Buscar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Title>Pokemons retrieved</Title>
      <Pokemons>
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <strong>{pokemon.name}</strong>
            <p>Base Experience: {pokemon.base_experience}</p>
            {/* {pokemon.owner_id && (
              <p>
                Owner:{' '}
                {
                  players.filter(player => player.id === pokemon.owner_id)[0]
                    .name
                }
              </p>
            )} */}
          </div>
        ))}
      </Pokemons>
    </>
  );
};

export default Dashboard;
