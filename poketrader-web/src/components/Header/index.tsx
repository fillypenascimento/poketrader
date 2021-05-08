import React from 'react';

import { Link } from 'react-router-dom';

import Container from './styles';

const Header: React.FC = () => (
  <Container>
    <header>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/trades">Traders Center</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
