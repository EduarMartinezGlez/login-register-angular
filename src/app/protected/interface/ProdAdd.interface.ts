export interface AddProdResponse{
    id?: string,
   // resp?:boolean,
    name?:string,
    categoryId?:number
		price?: number,
		description?: string,
    image?:string
}
export interface Product{
  id: string,
  name:string,
  categoryId:number,
 // brand:string
  price: number,
  description: string,
  image:string
}
export interface Category{
  id: string,
  name:string,
  createAt:Date
  image:string
}
export interface RespCategory{
 // map(arg0: ({ nombre, edad }: { nombre: any; edad: any }) => string): unknown
  length: number
  id?: string,
  name?:string,
  createAt?:Date
  image?:string
}
