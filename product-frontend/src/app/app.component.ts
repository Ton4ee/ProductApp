import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, ProductsComponent], // <-- ADD HttpClientModule
  template: `<app-products></app-products>`
})
export class AppComponent {}
