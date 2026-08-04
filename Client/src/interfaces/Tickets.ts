export interface Tickets{
    usuarioId:string;
    eventoId:string;
    cantidad:number;
    precioUnitario:number;
    precioTotal:number;
    estado:"PAGADO"|"RESERVADO";
    fechaCompra:string;
}