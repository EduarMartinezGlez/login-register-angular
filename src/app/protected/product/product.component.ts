import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DashboardService } from '../service/dashboard.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  currentPage = 1;
  count: any
  rows: any
  offset: number = 1
  data$:Observable<any> | undefined

  private baseUrl = environment.baseUrl
  product: any[] = []
  property: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: DashboardService
  ) { }



  ngOnInit() {

    this.getProducts()
    // const limit = 20;
    // this.offset = (this.currentPage - 1) * limit;
    // this.service.getProducts(limit,this.offset).subscribe((resp)=>{
    //   console.log('la resp en el componete',resp);
    //   resp
    // })
    // const data =  this.service.getProduct

    // console.log('la data product en el oninit product',data)
    //this.getProducts()

  }


  getProducts() {

    const limit = 5;
    this.offset = (this.currentPage - 1) * limit;
    //console.log('ofdrrt al principio', this.offset);

    if (this.offset < 0) {
      this.offset = 0
    }
    if (this.offset > this.count) {
      this.offset = this.count
    }
  // console.log('el offset', this.offset);
    this.http.get(`${this.baseUrl}/products?limit=${limit}&offset=${this.offset}`)
      .subscribe(products => {
        const resp: any[] = Object.values(products)
        console.log('resp de la funcio', resp);

        this.count = resp[0]
        resp[1].forEach((element: any) => {
          this.product.push(element)
        });
        // Haz algo con los productos aquí
      });
  }
  addProduct() {
    this.router.navigateByUrl('/dashboard/AddProducts')
  }
  getProduct() {

  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteProd(id).subscribe((resp) => {
          if (resp.error) {
            Swal.fire(
              'Cancelled',
              'Error!',
              'error'
            )
          } else {
            Swal.fire(
              'Deleted!',
              'Your Product has been delete.',
              'success',
            ).then((result)=>{
              if(result.isConfirmed){
                window.location.reload()
              }
            })
          }
        })
      }
    }
    )
  }

}
