import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productgrid',
  templateUrl: './productgrid.component.html',
  styleUrls: ['./productgrid.component.scss']
})
export class ProductgridComponent implements OnInit {
  private baseUrl = environment.baseUrl;
  count: any;
  product: any[] = []


constructor(
  private http: HttpClient
){}

ngOnInit() {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getProducts()

}
getProducts() {

  this.http.get(`${this.baseUrl}/products`)
    .subscribe(products => {
      const resp: any[] = Object.values(products)
      console.log('resp de la funcio', resp);

      this.count = resp[0]
      resp[1].forEach((element: any) => {
        this.product.push(element)
      });
      console.log('subcrive', this.product);
      // Haz algo con los productos aquí
   });
}

}
