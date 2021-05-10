import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

interface ButtonProps {
  selected?: boolean;
  faded?: boolean;
  poke?: boolean;
}

interface HeadingInfoProps {
  fair?: boolean;
}

const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin: 80px 0px 40px 0px;
  max-width: 450px;
  line-height: 56px;
`;

const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1; // makes the element fill all the remaining area that is not occupied by other elements
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.15, '#04d361')};
    }
  }
`;

const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

const Players = styled.div`
  max-width: 240px;

  display: flex;
  flex-direction: column;
  flex: 1;

  margin-right: 80px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Button = styled.button<ButtonProps>`
  background: ${({ faded, poke }: ButtonProps): string => {
    if (poke) return faded ? '#fff' : '#f5f5f5';
    return faded ? '#e6e6e6' : '#fff';
  }};
  border-radius: 5px;
  width: 100%;
  max-width: 230px;
  padding: 24px;
  display: block;
  text-decoration: none;
  border-style: solid;
  border-color: ${({ selected, poke }: ButtonProps): string => {
    if (poke) return selected ? '#3a3a3a' : '#f5f5f5';
    return selected ? '#3a3a3a' : '#fff';
  }};
  cursor: ${({ faded }: ButtonProps): string => (faded ? 'auto' : 'pointer')};

  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  & + button {
    margin-top: 16px;
  }

  &:hover {
    transform: translateX(10px);
  }

  strong {
    font-size: 20px;
    color: #3d3d4d;
  }

  p {
    font-size: 18px;
    color: #a8a8b3;
    margin-top: 4px;
  }
`;

const TradeZone = styled.div`
  height: 589px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Pokemons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;

  h2 {
    margin-bottom: 12px;
  }

  & > div {
    width: 100%;
    max-width: 290px;
    background: #fff;
    border-radius: 5px;
    padding: 24px;
    overflow: hidden scroll;
  }

  & > strong + strong {
    margin-top: 15px;
  }
`;

const TraderInfo = styled.div`
  margin-bottom: 15px;
`;

const HeadingInfo = styled.div<HeadingInfoProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    color: ${({ fair }: HeadingInfoProps): string =>
      fair ? '#551A8B' : '#EF5350'};

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 20px;
      padding-bottom: 8px;
    }
  }

  button {
    background: ${({ fair }: HeadingInfoProps): string => {
      return fair ? '#551A8B' : '#EF5350';
    }};
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    border: none;
    color: #fff;
    font-size: 24px;
    transition: background 0.2s;

    &:hover {
      background: ${({ fair }: HeadingInfoProps): string => {
        return fair ? shade(-0.15, '#551A8B') : shade(-0.15, '#EF5350');
      }};
    }
  }
`;

const Info = styled.div`
  padding-bottom: 20px;
  font-size: 18px;
  text-align: left;
`;

export {
  Title,
  Form,
  Error,
  Players,
  TradeZone,
  Pokemons,
  Button,
  TraderInfo,
  HeadingInfo,
  Info,
};
