export interface user {
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    role: "USER"|"ADMIN";
}