import { useState , useEffect} from "react";
import Buscador from "./shared/components/Buscador";
import { ApiException } from "./shared/services/api/ApiException";
import { BreedsService } from "./shared/services/api/breeds/BreedsService";
import { IBreed } from "./shared/types/Breed";

function App() {

  const [breeds,setBreeds] = useState<IBreed[]>([])

  useEffect(() => {
    BreedsService.getAll()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {

          //const breedsKeys = Object.keys(result.message); 
          const colourOptions:IBreed[] = [];

          Object.entries(result.message).forEach(([key, value]) => {
            //console.log(key + ' ' + value); // "a 5", "b 7", "c 9"
            colourOptions.push({value:key, label:key})
          });
          setBreeds(colourOptions);
        }
      });
  }, []);

  return (
    <div className="container">
      <h1><img src="favicon.png" alt="logo dog" id="logo" />DOGS Ceo Challange</h1>
      <Buscador breedValues={breeds} />
    </div>
  );
}

export default App;
