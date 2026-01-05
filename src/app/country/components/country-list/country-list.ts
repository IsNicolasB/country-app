import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'country-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList { 

  countries = input.required<Country[]>()
  errorMessage = input<string | unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)

}
