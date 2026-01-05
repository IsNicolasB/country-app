import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    static mapRestCountryToCountry(restCountry: RESTCountry): Country {
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? restCountry.name.common,
            capital: restCountry.hasOwnProperty('capital') ? restCountry.capital.join(', ') : 'No Capital',
            population: restCountry.population,
            region: restCountry.region,
            subRegion: restCountry.subregion || 'No Subregion',
        }
    }

    static mapRestCountryArrayToCountryArray(restCountry: RESTCountry[]): Country[] {
        return restCountry.map(this.mapRestCountryToCountry)
    }
}