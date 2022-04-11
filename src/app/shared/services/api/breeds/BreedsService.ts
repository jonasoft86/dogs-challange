import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export type BreedsListResponse = {
  [key: string] : string[]
}

export interface BreedsImagesResponse {
  message: string[]
}

const getAll = async (): Promise<BreedsListResponse | ApiException> => {
    try {
      const { data } = await Api().get('/breeds/list/all');
      return data;
    } 
    catch (error: any) {
      return new ApiException(error.message || 'Error no existen registros.');
    }
};

const getImagesByBreed = async (breed: string): Promise<BreedsImagesResponse | ApiException> => {
  try {
    const { data } = await Api().get(`/breed/${breed}/images`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Error no existen registros.');
  }
};

const getImagesBySubBreed = async (breed: string, subBreed: string): Promise<BreedsImagesResponse | ApiException> => {
  try {
    const { data } = await Api().get(`/breed/${breed}/${subBreed}/images`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Error no existen registros.');
  }
};

export const BreedsService = {
    getAll,
    getImagesByBreed,
    getImagesBySubBreed,
}