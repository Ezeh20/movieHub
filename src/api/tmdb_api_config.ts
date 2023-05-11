import apiConfig from "./api_config";
import axiosConfig from "./axios_config";
import { globalType } from './types.ts'

/**
 * import axiosConfig to have access to the baseUrl and headers
 * get the api_key to be used for request
 * map out methods of the diffrent categories to be called
 */

const key = `api_key=${apiConfig.api_key}`

export const moviePath: globalType = {
    now_playing: "now_playing",
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
}

export const movieInfo: globalType = {
    credits: "credits",
    video: "video",
    similar: "similar",
    recommendations: "recommendations",
    release_dates: "release_dates",
}

export const tvPath: globalType = {
    airing_today: "airing_today",
    on_the_air: "on_the_air",
    popular: "popular",
    top_rated: "top_rated",
}

export const tvInfo: globalType = {
    credits: "credits",
    video: "video",
    similar: "similar",
    recommendations: "recommendations",
    episode_groups: "episode_groups",
}


//API request methods to call
const requestApi = {
    movie: (path: string, params: number) => {
        const url = `/movie/${moviePath[path]}?${key}&page=${params}`
        return axiosConfig.get(url)
    },
    movieDetails: (id: number) => {
        const url = `/movie/${id}?${key}`
        return axiosConfig.get(url)
    },
    movieInfo: (id: number, path: string) => {
        const url = `/movie/${id}/${movieInfo[path]}?${key}`
        return axiosConfig.get(url)
    },
    tv: (path: string, params: number) => {
        const url = `/tv/${tvPath[path]}?${key}&page=${params}`
        return axiosConfig.get(url)
    },
    tvDetails: (id: number) => {
        const url = `/tv/${id}?${key}`
        return axiosConfig.get(url)
    },
    tvInfo: (id: number, path: string) => {
        const url = `/tv/${id}/${path}?${key}`
        return axiosConfig.get(url)
    },
    people: (params: number) => {
        const url = `/person/popular?${key}&page=${params}`
        return axiosConfig.get(url)
    }
}

export default requestApi