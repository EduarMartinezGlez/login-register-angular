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
  private _categoryId!: number
  private category:[]=[]
  private _id!:number
  private visitors: any
  private data:any

  constructor(private http: HttpClient) { }

 async setProduct(prodData:any) {
    console.log('el proddata en el servicio', prodData);

    this.data =await prodData
    console.log('en el set del servicio ', this.data);
    return this.data

  }
  get getProduct(){
    console.log('en el get de servicio ', this._product);
    return  {...this._product}
  }

 /**
  * It returns the value of the private variable _id.
  * @returns The id of the product
  */
  get idProd(){
    return this._id
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

  sendForm(file: File, productname: string, category: string, price: string, productdetails: string) {  // console.log('el archivo y la data en el form', productname, category, price, productdetails);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', productname);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', productdetails);
    const url = `${this.baseUrl}/products`;
    return this.http.post<AddProdResponse>(url, formData).pipe(
      map(resp => {
        console.log('el resp map en el servivio de post', resp);
        this._product = {
              id: resp.id!,
              name: resp.name!,
              categoryId: resp.categoryId!,
            //  brand: resp.brand!,
              price: resp.price!,
              description: resp.description!,
              image: resp.image!
            }
           // localStorage.('lastItem', this._product)
        console.log('el resp map en el servivio de post el _product', this._product);

        resp}),
      catchError(error => of(error))
    )
  }

  updateForm(id:number, file: File, productname: string, category: string, price: string, productdetails: string) {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('name', productname);
     formData.append('category', category);
     formData.append('price', price);
     formData.append('description', productdetails);
     const url = `${this.baseUrl}/products/${id}`;
     return this.http.patch<AddProdResponse>(url, formData).pipe(
       map(resp => {
         console.log('el resp map en el servivio de post', resp);
         this._product = {
               id: resp.id!,
               name: resp.name!,
               categoryId: resp.categoryId!,
             //  brand: resp.brand!,
               price: resp.price!,
               description: resp.description!,
               image: resp.image!
             }
            // localStorage.('lastItem', this._product)
         console.log('el resp map en el servivio de post el _product', this._product);

         resp}),
       catchError(error => of(error))
     )
   }

getCategory(){
    const url = `${this.baseUrl}/categories`;
      return this.http.get<{[key: string]: any}>(url);
    }

getCategoryById(id:number){
  const url = `${this.baseUrl}/categories/${id}`;
    return this.http.get(url).pipe(

        ( (resp)=>
        resp),
        catchError(error => of(error))
       )

}


deleteProd(id:number){
  const url = `${this.baseUrl}/products/${id}`;
  return this.http.delete(url).pipe(
  catchError(error => of(error))
  )
}

recoveryProdById(id:number){
  this._id = id
  //console.log('en el recover del servicio');

   const url = `${this.baseUrl}/products/${id}`
   return this.http.get(url).pipe(
    ( (resp)=>
    resp),
    catchError(error => of(error))
   )
}
getProducts(limit:number, offset:number) {
  const url = `${this.baseUrl}/products?limit=${limit}&offset=${offset}`;
  return this.http.get(url).pipe(
    map(

      (resp)=>{
        console.log('la response en el servicio', resp);

        return resp
      }
      ),

  catchError(error => of(error))
  )


}

}
