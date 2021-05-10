import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { Title, HistoryRegister, PlayerTradeRecord } from './styles';

import { ITrade } from '../shared/interfaces/ITrade';

const TradesHistory: React.FC = () => {
  const [trades, setTrades] = useState<ITrade[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrades(): Promise<void> {
      setLoading(true);
      const response = await api.get<ITrade[]>('/trades');
      const tradesResponse = response.data.sort((trade1, trade2) => {
        const dateT1 = new Date(trade1.created_at);
        const dateT2 = new Date(trade2.created_at);

        return dateT2.getTime() - dateT1.getTime();
      });
      setTrades(tradesResponse);
      setLoading(false);
    }

    getTrades();
  }, []);

  return (
    <>
      <Header />
      <Title>Trades history is presented from newer to older</Title>
      {loading && <h1>Loading trades...</h1>}
      {trades.length === 0 && !loading && <h1>No trades were made yet.</h1>}
      {trades && (
        <div>
          {trades.map((trade, idx) => (
            <HistoryRegister key={trade.id}>
              <h2>{idx + 1}</h2>
              <div>
                <h3>
                  This was {trade.fair_trade ? 'a fair' : 'an unfair'} trade
                  with a Fairness Rate of {trade.fairness_rate}
                </h3>
              </div>
              <div>
                <PlayerTradeRecord>
                  <h2>
                    {trade.fromPlayer.name} gave to {trade.toPlayer.name}
                  </h2>
                  {trade.tradeRegisters.map(tradeReg => {
                    return (
                      tradeReg.old_owner_id === trade.fromPlayer.id && (
                        <p
                          key={`${tradeReg.pokemon.id}${tradeReg.old_owner_id}${tradeReg.new_owner_id}`}
                        >
                          {tradeReg.pokemon.name}
                        </p>
                      )
                    );
                  })}
                </PlayerTradeRecord>
                <PlayerTradeRecord>
                  <h2>
                    {trade.toPlayer.name} gave to {trade.fromPlayer.name}
                  </h2>
                  {trade.tradeRegisters.map(tradeReg => {
                    return (
                      tradeReg.old_owner_id === trade.toPlayer.id && (
                        <p
                          key={`${tradeReg.pokemon.id}${tradeReg.new_owner_id}${tradeReg.old_owner_id}`}
                        >
                          {tradeReg.pokemon.name}
                        </p>
                      )
                    );
                  })}
                </PlayerTradeRecord>
              </div>
            </HistoryRegister>
          ))}
        </div>
      )}
    </>
  );
};

export default TradesHistory;
