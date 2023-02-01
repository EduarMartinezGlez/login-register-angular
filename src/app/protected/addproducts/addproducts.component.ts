import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.scss'],
})
export class AddproductsComponent {
  selectedFile!: File;
  value: Number = 0;
  err: boolean = false;
  imageName: string = '';
  resp!: any;
  selectedValue:any
  private baseUrl = environment.baseUrl



  constructor(
    private formBuilder: FormBuilder,
    private service: DashboardService,
    private http: HttpClient,
    private router: Router

  ) {}
  getData() {
  const url = `${this.baseUrl}/categories`;
    return this.http.get<{[key: string]: any}>(url);
  }

  ngOnInit() {
    this.getData().pipe(
      map(array => array['map']((element: { name: any; }) => element.name))
    ).subscribe(names => {
     // console.log('los nombre', names);
      this.resp= names
     // console.log('array', this.resp);

      });

  }

  Form: FormGroup = this.formBuilder.group({
    productname: ['', [Validators.required]],
    category: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    price: ['', [Validators.required]],
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

  /**
   *
   *
   * We create a new FormData object, append the form values to it, and then append the file to it
   */
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
}
