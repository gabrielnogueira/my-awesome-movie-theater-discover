import axios, {CancelTokenSource } from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY
    }
});

let lastSearchCancelToken: CancelTokenSource;

export interface IMovie {
    backdrop_path: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number
}

export const discover = async (): Promise<IMovie[]> => axiosInstance.get('/discover/movie?sort_by=popularity.desc').then(({data:{results}}) => results).catch(error=>[])

export const search = async (search: string): Promise<IMovie[]> => {
    if(lastSearchCancelToken){
        lastSearchCancelToken.cancel();
    }

    lastSearchCancelToken = axios.CancelToken.source();

    return axiosInstance.get(`/search/movie?query=${search}`, {
        cancelToken: lastSearchCancelToken.token
    }).then(({data:{results}}) => results).catch(error=>[]);
}