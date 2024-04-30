import NavBar from "../../components/navbar/NavBar";
import { MainContainer } from "./HomeStyles";

const Home = () => {
  return (
    <MainContainer>
      <NavBar />
      <div>{/* Contenido de tu página de inicio */}</div>
    </MainContainer>
  );
};

export default Home;
