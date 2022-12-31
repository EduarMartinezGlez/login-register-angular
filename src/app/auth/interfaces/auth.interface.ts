export interface AuthResponse{
    id?: number,
    name?:string,
    email?:string,
		password?: string,
		role?: string,
    token?:string
}
export interface User{
    id:string,
    name:string,
    role:string,
    token:string,
    email:string
}
