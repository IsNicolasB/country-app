import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../types/region.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService); 
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<string>(() => this.queryParam);

  countryResource = resource({
    params:() => ({selectedRegion : this.selectedRegion()}),
    loader: async ({params}) =>{
      if(!params.selectedRegion) return [];

      this.router.navigate(['/country/by-region'],{
        queryParams: { region: params.selectedRegion }
      })

      return await firstValueFrom(
        this.countryService.searchByRegion(params.selectedRegion)
      )
    }
  })

  getValue(event : string){
    console.log(event);
    this.selectedRegion.set(event);
  }
  // countryService = inject(CountryService); 

  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])


  // onSearch(selectedRegion : string){

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(selectedRegion)
  //   .subscribe(
  //     (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //       console.log(countries)
  //     }
  //   );
  // }
 }
