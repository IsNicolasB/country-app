import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-go-back-btn',
  imports: [],
  templateUrl: './go-back-btn.html',
})
export class GoBackBtn { 
  location = inject(Location);

  goBack(){
    this.location.back();
  }
}
