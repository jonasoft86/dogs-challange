import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface IBreeds {
  breeds: [];
}

const getAll = async (): Promise<IBreeds[] | ApiException> => {
    try {
      const { data } = await Api().get('/breeds/list/all');
      return data;
    } 
    catch (error: any) {
      return new ApiException(error.message || 'Error no existen registros.');
    }
};

export const BreedsService = {
    getAll,
}