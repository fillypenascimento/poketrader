import React from 'react';

import { Link } from 'react-router-dom';

import poketraderlogo from '../../assets/poketraderlogo.svg';
import Container from './styles';

const Header: React.FC = () => (
  <Container>
    <header>
      <img src={poketraderlogo} alt="Poke Trader" />
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/trades">Traders Center</Link>
        <Link to="/trades/history">Trades History</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
