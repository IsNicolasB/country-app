import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { RESTCountry, } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { LRUCache } from 'src/app/shared/classes/LRUCache.class';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  // private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCapital = new LRUCache<string, Country[]>(10);
  private queryCacheCountry = new LRUCache<string, Country[]>(10);
  private queryCacheRegion = new LRUCache<string, Country[]>(10);
  private queryCacheCode = new LRUCache<string, Country>(10);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase()

    if (this.queryCacheCapital.get(query)) {
      console.log('desde cache capital', this.queryCacheCapital)
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${environment.API_URL}/capital/${query}`)
      .pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheCapital.set(query, countries, 60000)),
        catchError(err => {
          console.log('Error en el servicio', err);
          return throwError(() => new Error('No se encontraron resultados'));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    console.log('Buscando en el servicio por país:', query);
    query = query.toLocaleLowerCase()

    if (this.queryCacheCountry.get(query)) {
      console.log('desde cache country', this.queryCacheCountry)
      return of(this.queryCacheCountry.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${environment.API_URL}/name/${query}`).pipe(
      map((countries) => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
      tap(countries => this.queryCacheCountry.set(query, countries, 60000)),
      // delay(2000),
      catchError(err => {
        console.log('Error en el servicio', err);
        return throwError(() => new Error('No se encontraron resultados'));
      })
    )
  }
  
  searchByRegion(region: string): Observable<Country[]> {
    region = region.toLocaleLowerCase();

    if (this.queryCacheRegion.get(region)) {
      console.log('desde cache region', this.queryCacheRegion)
      return of(this.queryCacheRegion.get(region) ?? [])
    }
    return this.http.get<RESTCountry[]>(`${environment.API_URL}/region/${region}`)
      .pipe(
        tap(countries => console.log({countries})),
        map((countries) => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheRegion.set(region, countries, 120000)),
        catchError((error) => {
          console.log('Error en el servicio', error);
          return throwError(() => new Error('No se encuentra la región solicitada'));
        })
      ) 
  }

  searchByCode(code: string) {
    code = code.toLocaleLowerCase();

    if( this.queryCacheCode.get(code)){
      console.log('desde cache code', this.queryCacheCode)
      return of(this.queryCacheCode.get(code)!);
    }

    return this.http.get<RESTCountry[]>(`${environment.API_URL}/alpha/${code}`)
      .pipe(
        map((countries) => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        map(countries => countries[0]),
        tap(country => this.queryCacheCode.set(code, country, 300000)),
        catchError((error) => {
          console.log('Error en el servicio', error);
          return throwError(
            () => new Error('No se encontraron países con ese código')
          )
        }
        )
      )
  }
  
}
