import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of} from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ByCountryPage { 
  countryService = inject(CountryService); 
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  // countryResource = rxResource({
  //   params: () => ({ query: this.query() }),
  //   stream: ({ params }) => {
  //     if (!params.query) return of([]);
  //     return this.countryService.searchByCountry(params.query);
  //   }
  // });

  countryResource = resource({
    params:() => ({query : this.query()}),
    loader: async ({params}) =>{
      if(!params.query) return [];

      this.router.navigate(['/country/by-country'],{
        queryParams: { query: params.query }
      })

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      )
    }
  })
 
  // countryService = inject(CountryService); 

  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])


  // onSearch(query : string){

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query)
  //   .subscribe(
  //     (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //       console.log(countries)
  //     }
  //   );
  // }
}
