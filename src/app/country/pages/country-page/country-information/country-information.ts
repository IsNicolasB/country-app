import { Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { single } from 'rxjs';
import { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'country-information-page',
  imports: [],
  templateUrl: './country-information.html',
})
export class CountryInformation { 

  country = input.required<Country>();
  
  // resizerDiv = viewChild<ElementRef>('resizerDiv')

  width = signal('100cqi');
  isAnimation = signal(true);
  // ngAfterViewInit(): void {
  //   const resizerDiv = this.resizerDiv()?.nativeElement
  //   if(!resizerDiv) return;
  //   for(let i = 80 ; i > 10; i-=1){
  //     setTimeout(() => {
  //       resizerDiv.style.width = `${i}cqi`
  //       console.log(resizerDiv.style.width);
  //     }, (80-i) * 30);
  //   }
  // }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngAfterViewInit() {

    await this.wait(1000);

    this.width.set('10cqi');

    await this.wait(1000);
  
    this.isAnimation.set(false);

  }

  currentYear = computed(
    () => new Date().getFullYear()
  )
}
