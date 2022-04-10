import Select from 'react-select';

const colourOptions = [
    { value: 'all', label: 'all' },
    { value: 'strawberry', label: 'strawberry' },
    { value: 'vanilla', label: 'vanilla' },
    { value: 'red', label: 'red' },
    { value: 'blue', label: 'Blue' },
    { value: 'uno', label: 'uno' },
    { value: 'dos', label: 'dos' },
    { value: 'tres', label: 'tres' },
    { value: 'cuato', label: 'cuato' },
    { value: 'cinco', label: 'cinco' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'uno', label: 'uno' },
    { value: 'dos', label: 'dos' },
    { value: 'tres', label: 'tres' },
    { value: 'cuato', label: 'cuato' },
    { value: 'cinco', label: 'cinco' }
]

interface State {
    readonly isClearable: boolean;
    readonly isDisabled: boolean;
    readonly isLoading: boolean;
    readonly isRtl: boolean;
    readonly isSearchable: boolean;
}

/*
interface IBreeds {
 breedValues : [];
}
*/
const Buscador = ( breedValues: any) => {

    const state: State = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
    }

    //console.log(breedValues.breedValues)

    const { isClearable, isSearchable, isDisabled, isLoading, isRtl } = state;

    return (
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
                    defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="colors"
                    options={colourOptions}
                    className="basic-multi-select p-3"
                    classNamePrefix="select"
                />

            </div>
        </div>
    )
}

export default Buscador