export interface AuthResponse{
    id?: string,
    resp?:boolean,
    name?:string,
    email?:string,
		password?: string,
		role?: string,
    token?:string
}
export interface User{
    id:string,
    //resp:boolean,
    name:string,
    role:string,
    token:string,
    email:string
}
