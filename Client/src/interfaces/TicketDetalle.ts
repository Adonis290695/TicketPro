export interface TicketDetalle{

    cantidad:number;

    precioUnitario:number;

    precioTotal:number;

    estado:"PAGADO" | "RESERVADO";

    fechaCompra:string;

    evento:{

        id:string;

        nombre:string;

        fecha:string;

        hora:string;

        lugar:string;

        precio:number;

    }

}