import { Component, inject } from '@angular/core';
import { GoBackBtn } from "../go-back-btn/go-back-btn";

@Component({
  selector: 'app-not-found',
  imports: [GoBackBtn],
  templateUrl: './not-found.html',
})
export class NotFound {}
