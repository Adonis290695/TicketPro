export interface Dashboard {

    Usuarios: number;

    Eventos: number;

    Tickets: number;

    Ingresos: number;

    mejorCliente: {

        nombre: string;

        email: string;

        ticketsComprados: number;

    } | null;

    mejorEvento: {

        nombre: string;

        ticketsVendidos: number;

        ingresos: number;

    } | null;

    eventosPorMes: {

        numeroMes: number;

        mes: string;

        cantidad: number;

    }[];

    ingresosPorMes: {

        numeroMes: number;

        mes: string;

        ingresos: number;

    }[];

    topEventos: {

        nombre: string;

        ticketsVendidos: number;

        ingresos: number;

    }[];

    ultimasCompras: {

        cliente: string;

        evento: string;

        cantidad: number;

        total: number;

        fecha: string;

    }[];

    proximosEventos: {

        nombre: string;

        fecha: string;

        hora: string;

        ubicacion: string;

    }[];

}