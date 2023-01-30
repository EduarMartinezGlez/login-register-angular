import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AddProdResponse,
  Product,Category,
  RespCategory }
   from "../interface/ProdAdd.interface";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.baseUrl;
  private _product!: Product
  private _category!: Category
  private visitors: any
  constructor(private http: HttpClient) { }

  get product() {
    return { ...this._product };
  }
  get category(){
    return{ ...this._category}
  }

  countCostumers() {
    const url = `${this.baseUrl}/customers/count`;
    this.http.get(url).subscribe(data => {
      this.visitors = data
    });
    return this.visitors
  }

  visitorFunc() {
    const url = `${this.baseUrl}/customers/count`;
    return this.http.get(url)
  }

  sendForm(file: File, productname: string, category: string, price: string, productdetails: string) {

    console.log('el archivo y la data en el form', productname, category, price, productdetails);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', productname);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', productdetails);
    const url = `${this.baseUrl}/products`;
    return this.http.post<AddProdResponse>(url, formData).pipe(
      tap((resp) => {
        this._product = {
          id: resp.id!,
          name: resp.name!,
          category: resp.category!,
          brand: resp.brand!,
          price: resp.price!,
          desciption: resp.desciption!,
          image: resp.image!
        }
      }),
      map(resp => resp),
      catchError(error => of(error))
    )
  }

getCategory(){
  const url = `${this.baseUrl}/categories`;
    return this.http.get(url).pipe(
      map(resp => {
       const response = Object.entries(resp).forEach(([key, value]) => {
          console.log('en el servicio', value)
          })
          console.log('el response',);

          return response
        }

    )
    )
}


}
