import React, { FormEvent, useEffect, useState } from 'react';

import {
  Title,
  Form,
  Error,
  Players,
  Pokemons,
  TradeZone,
  Button,
  TraderInfo,
  HeadingInfo,
} from './styles';

import api from '../../services/api';
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

interface ITrading {
  playerInTrade: IPlayer;
  pokemonsBeingTraded: IPokemon[];
  pokemonsAmountInTrade: number;
  totalBaseExperience: number;
}

interface ITrade {
  from_player_id: string;
  to_player_id: string;
  fair_trade: boolean;
  fairness_rate: number;
  from_player_pokemons: IPokemon[];
  to_player_pokemons: IPokemon[];
}

const Trades: React.FC = () => {
  const [newPokemon, setNewPokemon] = useState('');
  const [inputError, setInputError] = useState('');
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [playersTrading, setPlayersTrading] = useState<IPlayer[]>([]);
  // const [trade, setTrade] = useState<ITrade>({} as ITrade);

  const [tradings, setTradings] = useState<ITrading[]>(() => {
    const init: ITrading = {
      playerInTrade: {} as IPlayer,
      pokemonsBeingTraded: [] as IPokemon[],
      pokemonsAmountInTrade: 0,
      totalBaseExperience: 0,
    };
    return [init, init];
  });

  useEffect(() => {
    async function loadPlayers(): Promise<void> {
      const response = await api.get<IPlayer[]>('/players');
      console.log('dataaaa', response.data);
      setPlayers(response.data);
    }

    loadPlayers();
  }, []);

  function getFairnessRate(): number {
    // a trade fair has a difference of 20% over the greater total
    // base experience divided by the smaller total base experience
    let fairnessRate;
    if (tradings[0].totalBaseExperience >= tradings[1].totalBaseExperience) {
      fairnessRate =
        tradings[0].totalBaseExperience / tradings[1].totalBaseExperience;
    } else {
      fairnessRate =
        tradings[1].totalBaseExperience / tradings[0].totalBaseExperience;
    }

    return fairnessRate;
  }

  // function updateTrade(): void {
  //   const tradeUpdate = {
  //     from_player_id: tradings[0].playerInTrade.id,
  //     to_player_id: tradings[1].playerInTrade.id,
  //     fair_trade: getFairnessRate() <= 1.2,
  //     fairness_rate: getFairnessRate(),
  //     from_player_pokemons: tradings[0].pokemonsBeingTraded,
  //     to_player_pokemons: tradings[1].pokemonsBeingTraded,
  //   } as ITrade;

  //   setTrade(tradeUpdate);
  // }

  function handlePlayerSelection(selectedPlayer: IPlayer): void {
    if (playersTrading.includes(selectedPlayer)) {
      const newplayers = playersTrading.filter(
        player => player.id !== selectedPlayer.id,
      );

      setPlayersTrading(newplayers);

      const init: ITrading = {
        playerInTrade: {} as IPlayer,
        pokemonsBeingTraded: [] as IPokemon[],
        pokemonsAmountInTrade: 0,
        totalBaseExperience: 0,
      };

      setTradings([init, init]);
    } else {
      setPlayersTrading([...playersTrading, selectedPlayer]);
    }

    console.log('TRADING', playersTrading);
  }

  function handleDisablePlayerButton(selectedPlayer: IPlayer): boolean {
    const disable =
      playersTrading.length >= 2 && !playersTrading.includes(selectedPlayer);
    return disable;
  }

  function handleTrading(
    selectedPlayer: IPlayer,
    selectedPokemon: IPokemon,
    idx: number,
  ): void {
    console.log(idx, selectedPokemon);
    if (tradings[idx].pokemonsBeingTraded.includes(selectedPokemon)) {
      const resultTradingPokemons = tradings[idx].pokemonsBeingTraded.filter(
        poke => poke.id !== selectedPokemon.id,
      );
      const resultTrading = {
        playerInTrade: tradings[idx].playerInTrade,
        pokemonsBeingTraded: resultTradingPokemons,
        pokemonsAmountInTrade: tradings[idx].pokemonsAmountInTrade - 1,
        totalBaseExperience:
          tradings[idx].totalBaseExperience - selectedPokemon.base_experience,
      } as ITrading;

      // let trad = tradings;
      // trad[idx] = resultTrading;

      if (idx === 0) {
        setTradings([resultTrading, tradings[1]]);
        // updateTrade();
      } else {
        setTradings([tradings[0], resultTrading]);
        // updateTrade();
      }
      // updateTrade();
      // setTradings(trad);
    } else {
      console.log(idx, selectedPokemon);
      const resultTradingPokemons = [
        ...tradings[idx].pokemonsBeingTraded,
        selectedPokemon,
      ];
      const resultTrading = {
        playerInTrade: selectedPlayer,
        pokemonsBeingTraded: resultTradingPokemons,
        pokemonsAmountInTrade: tradings[idx].pokemonsAmountInTrade + 1,
        totalBaseExperience:
          tradings[idx].totalBaseExperience + selectedPokemon.base_experience,
      } as ITrading;

      // const tradeUpdate = {
      //   from_player_id: tradings[0].playerInTrade.id,
      //   to_player_id: tradings[1].playerInTrade.id,
      //   fair_trade: getFairnessRate() <= 1.2,
      //   fairness_rate: getFairnessRate(),
      //   from_player_pokemons: tradings[0].pokemonsBeingTraded,
      //   to_player_pokemons: tradings[1].pokemonsBeingTraded,
      // } as ITrade;

      if (idx === 0) {
        setTradings([resultTrading, tradings[1]]);
        // updateTrade();
      } else {
        setTradings([tradings[0], resultTrading]);
        // updateTrade();
      }
    }
  }

  function handleDisablePokemonButton(poke: IPokemon, idx: number): boolean {
    const disable =
      tradings[idx].pokemonsAmountInTrade >= 6 &&
      !tradings[idx].pokemonsBeingTraded.includes(poke);

    return disable;
  }

  function handleSelectedPokemon(poke: IPokemon, idx: number): boolean {
    return tradings[idx].pokemonsBeingTraded.includes(poke);
  }

  function showPerformTrade(): boolean {
    let show = false;

    if (
      tradings[0].pokemonsAmountInTrade > 0 &&
      tradings[1].pokemonsAmountInTrade > 0
    ) {
      show = true;
    }

    return show;
  }

  async function handleSendTrade(): Promise<void> {
    // console.log('TRADE', trade);
    console.log('TRADINGS', tradings);
    const response = await api.post('/trades', {
      from_player_id: tradings[0].playerInTrade.id,
      to_player_id: tradings[1].playerInTrade.id,
      fair_trade: getFairnessRate() <= 1.2,
      fairness_rate: getFairnessRate(),
      from_player_pokemons: tradings[0].pokemonsBeingTraded,
      to_player_pokemons: tradings[1].pokemonsBeingTraded,
    } as ITrade);

    console.log(response);

    // setTrade({} as ITrade);
    setPlayersTrading([]);
  }

  return (
    <>
      <Header />
      <HeadingInfo fair={getFairnessRate() <= 1.2}>
        <Title>Select 2 players to trade pokemons</Title>
        {showPerformTrade() && (
          <>
            <div>
              <h1>
                {getFairnessRate() <= 1.2
                  ? 'This is a fair trade'
                  : 'This is not a fair trade'}
              </h1>
              <button type="button" onClick={handleSendTrade}>
                Trade
              </button>
            </div>
          </>
        )}
      </HeadingInfo>
      <TradeZone>
        <Players>
          {players.map(player => (
            <Button
              type="button"
              key={player.id}
              onClick={() => handlePlayerSelection(player)}
              disabled={handleDisablePlayerButton(player)}
              selected={playersTrading.includes(player)}
              faded={handleDisablePlayerButton(player)}
            >
              <strong>{player.name}</strong>
              <p>{`${player.pokemons.length} ${
                player.pokemons.length > 1 ? 'pokemons' : 'pokemon'
              }`}</p>
            </Button>
          ))}
        </Players>
        {playersTrading.length > 0 && (
          <Pokemons>
            {playersTrading.map((player, idx) => (
              <div key={player.id}>
                <TraderInfo>
                  <h2>{player.name}</h2>
                  <strong>
                    Pokemons amount: {tradings[idx].pokemonsAmountInTrade}
                  </strong>
                  <br />
                  <strong>
                    Total base experience: {tradings[idx].totalBaseExperience}
                  </strong>
                </TraderInfo>
                {player.pokemons.map(poke => (
                  <Button
                    type="button"
                    key={poke.id}
                    onClick={() => {
                      handleTrading(player, poke, idx);
                      // updateTrade();
                    }}
                    disabled={handleDisablePokemonButton(poke, idx)}
                    selected={handleSelectedPokemon(poke, idx)}
                    faded={handleDisablePokemonButton(poke, idx)}
                    poke
                  >
                    <strong>{poke.name}</strong>
                    <p>Base Experience: {poke.base_experience}</p>
                  </Button>
                ))}
              </div>
            ))}
          </Pokemons>
        )}
      </TradeZone>
    </>
  );
};

export default Trades;
