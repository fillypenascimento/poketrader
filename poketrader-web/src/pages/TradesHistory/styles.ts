import styled from 'styled-components';

const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin: 80px 0px 40px 0px;
  max-width: 600px;
  line-height: 56px;
`;

const HistoryRegister = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 24px;

  > h2 {
    color: #9e9e9e;
    width: 30px;
  }

  & + div {
    margin-top: 16px;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    > h3 {
      color: #707070;
      width: 180px;
      text-align: center;
      margin: 0px 70px 0px 40px;
    }
  }

  > div + div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    width: 500px;
  }
`;

const PlayerTradeRecord = styled.div`
  background: #f2f2f2;
  padding: 12px;
  border-radius: 5px;
  width: 100%;
  text-align: center;

  h2 {
    font-size: 22px;
    margin-bottom: 5px;
  }

  & + div {
    margin-left: 30px;
  }

  p {
    font-size: 20px;
  }
`;

export { Title, HistoryRegister, PlayerTradeRecord };
