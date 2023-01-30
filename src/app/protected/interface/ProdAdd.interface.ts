export interface AddProdResponse{
    id?: string,
   // resp?:boolean,
    name?:string,
    category?:string
    brand?:string,
		price?: number,
		desciption?: string,
    image?:string
}
export interface Product{
  id: string,
  name:string,
  category:string,
  brand:string,
  price: number,
  desciption: string,
  image:string
}
export interface Category{
  id: string,
  name:string,
  createAt:Date
  image:string
}
export interface RespCategory{
  map(arg0: ({ nombre, edad }: { nombre: any; edad: any }) => string): unknown
  length: number
  id?: string,
  name?:string,
  createAt?:Date
  image?:string
}
