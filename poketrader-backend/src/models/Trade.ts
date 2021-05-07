class Trade {
  id: string;

  // user id who requested the trade
  from_player: string;

  // user id who accepted the trade
  to_player: string;

  fair_trade: boolean;

  fairness_rate: number;
}

export default Trade;
