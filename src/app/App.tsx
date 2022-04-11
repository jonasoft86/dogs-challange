import Buscador from "./shared/components/Buscador";
import useBreedsData from "./shared/hooks/useBreedsData";

const App = () => {

  const {breeds} = useBreedsData();


  return (
    <div className="container">
      <h1><img src="favicon.png" alt="logo dog" id="logo" />DOGS Ceo Challange</h1>
      <Buscador breedValues={breeds} />
    </div>
  );
}

export default App;
