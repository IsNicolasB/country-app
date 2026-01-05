import { Component, effect, ElementRef, input, linkedSignal, Output, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  initialValue = input<string>('');

  value = output<string>();
  placeholder = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue());

  // inputSearch = viewChild<ElementRef>('txtSearch')
  
  // ngAfterViewInit() {
  //   const input = this.inputSearch()?.nativeElement;
  //   if (!input) return;
  //   input.value = this.initialValue();
  // }

  debounceEffect = effect((onCleanup) =>{
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => clearTimeout(timeout));
  })

}
