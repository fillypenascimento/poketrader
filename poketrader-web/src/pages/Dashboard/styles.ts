import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
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

const Pokemons = styled.div`
  margin-top: 50px;

  div {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;

    display: flex;
    flex-direction: column;
    transition: transform 0.2s;

    & + div {
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

    /* div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    } */
  }
`;

export { Title, Form, Error, Pokemons };
