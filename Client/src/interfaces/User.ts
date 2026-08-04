export interface User{
    id:string;
    nombre:string;
    apellido:string;
    email:string;
    role:"USER"|"ADMIN";

}