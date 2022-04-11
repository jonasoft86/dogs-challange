import Select from 'react-select';
import { useState , useEffect} from "react";
import { BreedsService } from '../services/api/breeds/BreedsService';
import { ApiException } from '../services/api/ApiException';
import useBreedsData from '../hooks/useBreedsData';

interface State {
    readonly isClearable: boolean;
    readonly isDisabled: boolean;
    readonly isLoading: boolean;
    readonly isRtl: boolean;
    readonly isSearchable: boolean;
}

export type Option = {
    value: string;
    label: string;
};

const Buscador = ( breedValues: any) => {

    const state: State = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
    }

    const [selectedOption, setSelectedOption] = useState(null);
    const [selected, setSelected] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const { isClearable, isSearchable, isDisabled, isLoading, isRtl } = state;
    
    const [selectedSubOption, setSelectedSubOption] = useState([]);
    const {subBreeds} = useBreedsData();


    const [ options, setOptions] = useState<Option[]>([])

    useEffect(() => {
        const valueSelect = selectedOption?.['value'];

        if(valueSelect){
            setSelected(valueSelect);
            const filterSub = subBreeds.filter(s=>s.name===valueSelect)
            const optionsArray:Option[] = [];

            if(filterSub.length>0){
                (filterSub)[0].subBreeds.forEach( (value) => {
                    optionsArray.push({value: value.name, label: value.name})
                });
            }
            setOptions(optionsArray)
        }
        
    }, [selectedOption]);


    useEffect(() => {
        if(selected){
            BreedsService.getImagesByBreed(selected)
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setImages(result.message)
                }
            });
        }
    }, [selected]);

    useEffect(() => {
        if(selectedSubOption.length>0){
            const imagesTemp: any[] = []
            selectedSubOption.forEach(function (s) {
                BreedsService.getImagesBySubBreed(selected,s['value'])
                .then((result) => {
                    if (result instanceof ApiException) {
                        alert(result.message);
                    } else {
                        setImages(result.message)
                        imagesTemp.push(result.message)
                    }
                });

            }); 
        }
    }, [selectedSubOption]);

    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-6 col-10" id="buscador">
                    <label>Buscar por raza:</label>
                    <Select
                        className="basic-single p-3" 
                        classNamePrefix="Select"
                        defaultValue={breedValues.breedValues[0]}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="color"
                        onChange={setSelectedOption}
                        options={breedValues.breedValues}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            padding: "20px",
                            colors: {
                            ...theme.colors,
                            primary25: '#b49c84',
                            primary: 'black',
                            },
                        })}
                    />

                    <label>Buscar por sub-raza:</label>
                    <Select
                        defaultValue={[...options]}
                        isMulti
                        name="colors"
                        onChange={(s: any) => setSelectedSubOption(s)}
                        options={options}
                        className="basic-multi-select p-3"
                        classNamePrefix="select"
                    />
                </div>
            </div>

            <div className="row" id="apiR">
            {
                images.map((img) => (
                    <div className="col-md-4 col-12" key={img}>
                        <div className="card mt-5">
                            <img src={img} alt="Foto de perro "/>
                            <div className="card-body">
                                <h5 className="card-title">{img.split('/')[4]}</h5>
                            </div>
                        </div>
                    </div>
                ))

            }
            </div>
        </>       
    )
}

export default Buscador