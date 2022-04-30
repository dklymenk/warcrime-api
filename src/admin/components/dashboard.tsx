import { H1 } from '@adminjs/design-system';
import styled from 'styled-components';
const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled('img')`
  max-width: 30rem;
`;

const Dashboard = () => {
  return (
    <Container>
      <H1 color="red">Харківська правозахисна група</H1>
      <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Logo_of_The_Kharkiv_Human_Rights_Protection_Group.png/1024px-Logo_of_The_Kharkiv_Human_Rights_Protection_Group.png"></Logo>
    </Container>
  );
};

export default Dashboard;
