import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashboardService } from "../service/dashboard.service";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit{

  constructor(
    private service:DashboardService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,){}

    selectedFile!: File;
    value: Number = 0;
    err: boolean = false;
    imageName: string = '';
    categoryId!: number;
    categories!:any
    categoryName!:string
    resp!: any;
    selectedValue:any
    private baseUrl = environment.baseUrl
    property:any

  Form: FormGroup = this.formBuilder.group({
    productname: ['', [Validators.required]],
    category: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['',[Validators.required]],
    selectedValue: ['', [Validators.required]],
    productdetails: ['', [Validators.required]],
  });


  validateValue(newValue: number) {
    const pattern = /^[0-9]*$/;
    if (newValue == null) {
      this.value = 0;
    }
    if (newValue < 1 || !pattern.test(newValue.toString())) {
      /* A regular expression that is used to validate the input. */
      this.value = 0;
    }
  }

  onFileSelected(event: any) {
  //  console.log(event);
    if (event && event.target && event.target.files) {
      this.selectedFile = event.target.files[0];
      this.imageName = this.selectedFile.name;
  //    console.log('el selectfile', this.selectedFile);
    }
  }

  AddProd(id:number) {
    const { productname, category, price, productdetails } = this.Form.value;
    console.log('el form value', this.Form.value);

    this.service
      .updateForm(id, this.selectedFile, productname, category, price, productdetails)
      .subscribe((response) => {
        console.log('reesponse en addprodu', response);
        this.service.setProduct(response)
        response});
      this.router.navigateByUrl('/dashboard/Products')
  }
  // getData() {
  // const url = `${this.baseUrl}/categories`;
  //   return this.http.get<{[key: string]: any}>(url);
  // }

  ngOnInit() {
    this.service.getCategory().pipe(
      map(array => array['map']((element: { name: any; }) => element.name))
    ).subscribe(names => {
      this.categories= names
      });



    this.service.getCategory().subscribe(arg =>{
    //  this.property = arg
   //   this.categoryId = this.property.
      console.log('poperty obtener categorias', arg);
    })
    this.getcategory()
    this.recoveryproduct()

  }
  get idProd(){
 //   console.log('en el get del servicio', this.service.idProd);
      return this.service.idProd
    }
    get idCategory(){
      return
    }
  recoveryproduct(){
    this.service.recoveryProdById(this.idProd)
    .subscribe(arg =>{
      this.property = arg
      this.categoryId = this.property.categoryId
      this.service.getCategoryById(this.categoryId).subscribe(
        (arg) =>{
          console.log('en el coponete buscado el nobre de categoria',arg.name);
          this.categoryName =arg.name
        }
      )
      console.log('poperty', this.categoryId);
    })
  }

  getcategory(){

  }
  }
