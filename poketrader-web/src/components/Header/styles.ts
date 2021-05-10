import styled from 'styled-components';

const Container = styled.div`
  header {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    img {
      width: 300px;
      margin-right: 50px;
    }

    nav {
      a {
        text-decoration: none;
        font-size: 22px;
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
