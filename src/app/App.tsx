import { useState , useEffect} from "react";
import { ApiException } from "./shared/services/api/ApiException";
import { IBreeds , BreedsService } from "./shared/services/api/breeds/BreedsService";

function App() {

  const [lista,setLista] = useState<IBreeds[]>([])

  useEffect(() => {
    BreedsService.getAll()
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          setLista(result);
          console.log(result)        }
      });
  }, []);

  return (
    <div className="container">
      <h1><img src="favicon.png" alt="logo dog" id="logo" />DOGS Ceo Challange</h1>
    </div>
  );
}

export default App;
