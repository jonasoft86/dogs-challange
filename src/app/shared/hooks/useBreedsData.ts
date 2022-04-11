import { useState , useEffect} from "react";
import { ApiException } from "../services/api/ApiException";
import { BreedsService } from "../services/api/breeds/BreedsService";
import { IBreed } from "../types/Breed";

interface SubBreed {
    name: string;
}

type Breed = {
    name: string;
    subBreeds: SubBreed[];
}

const  useBreedsData = () => {

    const [breeds,setBreeds] = useState<IBreed[]>([])
    const breedsWithSubBreeds: any[] = [];
    const [subBreeds,setSubBreeds] = useState<Breed[]>([])

    useEffect(() => {
      BreedsService.getAll()
        .then((result) => {
          if (result instanceof ApiException) {
            alert(result.message);
          } else {
            const colourOptions:IBreed[] = [];
  
            Object.entries(result.message).forEach(([key, value]) => {
                const subBreeds = [];

                for(var i = 0 ; i < value.length ; i++)
                {
                    let subBreed: SubBreed = { name: value[i]};
                    subBreeds.push(subBreed)
                }
                if(value.length>0){
                   // let breed = { name: key, subBreeds: subBreeds};
                    breedsWithSubBreeds.push({name: key, subBreeds: subBreeds});
                }
                
                colourOptions.push({value:key, label:key})
            });
            setBreeds(colourOptions);
            setSubBreeds(breedsWithSubBreeds)
          }
        });
    }, []);

    return{
        breeds,
        subBreeds
    }
}

export default useBreedsData