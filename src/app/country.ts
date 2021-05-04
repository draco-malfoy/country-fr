import { State } from './state';

export interface Country {
    id: number
    name: string,
    flagUrl: string,
    population: number,
    capital: string,
    states: State[]
}