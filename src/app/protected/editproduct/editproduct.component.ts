import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DashboardService } from "../service/dashboard.service";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent {

  constructor(
    private service:DashboardService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,){}
    selectedFile!: File;
  value: Number = 0;
  err: boolean = false;
  imageName: string = '';
  resp!: any;
  selectedValue:any
  private baseUrl = environment.baseUrl


  property:any

  Form: FormGroup = this.formBuilder.group({
    productname: ['', [Validators.required]],
    category: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', this.validateValue,[Validators.required]],
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

  AddProd() {
    const { productname, category, price, productdetails } = this.Form.value;
    this.service
      .sendForm(this.selectedFile, productname, category, price, productdetails)
      .subscribe((response) => {
        console.log('reesponse en addprodu', response);
        this.service.setProduct(response)
        response});
      this.router.navigateByUrl('/dashboard/Products')
  }


  get idProd(){
    return this.service.idProd
  }
  recoveryproduct(){
    this.service.recoveryProdById(this.idProd)
    .subscribe(arg =>{
        this.property = arg
        console.log('poperty', this.property);
        }
         );
  }
}
