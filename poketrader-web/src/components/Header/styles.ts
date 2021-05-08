import styled from 'styled-components';

const Container = styled.div`
  header {
    margin: 0 auto;
    nav {
      a {
        text-decoration: none;
        font-size: 20px;
        transition: opacity 0.2s;
        & + a {
          margin-left: 50px;
        }
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;

export default Container;
