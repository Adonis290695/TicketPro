import { contarUsuario } from "../repositories/authRepository";
import { contarEventos } from "../repositories/eventRepository";
import { contarTicketsVendidos } from "../repositories/ticketsRepository";
import { obtenerIngresosTotales } from "../repositories/ticketsRepository";
import { obtenerUsuarioMasComprador } from "../repositories/ticketsRepository";
import { buscarUsuarioPorId } from "../repositories/authRepository";
import { obtenerEventoMasVendido } from "../repositories/ticketsRepository";
import { obtenerEventosPorId } from "../repositories/eventRepository";
import { obtenerEventosPorMes } from "../repositories/eventRepository";
import { obtenerIngresosPorMes } from "../repositories/ticketsRepository";
import { obtenerTopEventos } from "../repositories/ticketsRepository";
import { obtenerUltimasCompras } from "../repositories/ticketsRepository";
import { obtenerProximosEventos } from "../repositories/eventRepository";

export async function obtenerDashboardAdmin() {

    const totalUsuarios = await contarUsuario();
    const totalEventos = await contarEventos();
    const totalTickets = await contarTicketsVendidos();
    const totalIngresos = await obtenerIngresosTotales();

    const comprador = await obtenerUsuarioMasComprador();

    let mejorCliente = null;

    if(comprador){

      const usuario = await buscarUsuarioPorId(comprador._id);

       if(usuario){

        mejorCliente = {

            nombre: usuario.nombre,

            email: usuario.email,

            ticketsComprados: comprador.ticketsComprados

        };

      }

    }

    const eventoMasVendido = await obtenerEventoMasVendido();

    let mejorEvento = null;

    if(eventoMasVendido){

     const evento = await obtenerEventosPorId(eventoMasVendido._id);

        if(evento){

         mejorEvento = {
            nombre: evento.nombre,
            ticketsVendidos: eventoMasVendido.ticketsVendidos,
            ingresos: eventoMasVendido.ingresos
         };

        }

    }

    const eventosMes = await obtenerEventosPorMes();

    const meses: Record<string, string> = {
            "01": "Enero",
            "02": "Febrero",
            "03": "Marzo",
            "04": "Abril",
            "05": "Mayo",
            "06": "Junio",
            "07": "Julio",
            "08": "Agosto",
            "09": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
    };


    const eventosPorMes = eventosMes.map(evento => {
        const numeroMes = Number(evento._id.split("-")[1]);
        
         return {
            numeroMes,
            mes: meses[numeroMes.toString().padStart(2, "0")],
            cantidad: evento.cantidad
        };
    }).sort((a, b) => a.numeroMes - b.numeroMes);

    const ingresosMes = await obtenerIngresosPorMes();

    const ingresosPorMes = ingresosMes.map((item: any) => {

        const numeroMes = Number(item._id.split("-")[1]);

        return {

            numeroMes,

            mes: meses[numeroMes.toString().padStart(2, "0")],

            ingresos: item.ingresos

        };

    });

    const top = await obtenerTopEventos();

    const topEventos = [];

    for (const evento of top) {

        const datosEvento = await obtenerEventosPorId(evento._id);

        if (datosEvento) {

            topEventos.push({

                nombre: datosEvento.nombre,

                ticketsVendidos: evento.ticketsVendidos,

                ingresos: evento.ingresos

            });

        }

    }

    const compras = await obtenerUltimasCompras();

    const ultimasCompras = [];

    for (const compra of compras) {

        const usuario = await buscarUsuarioPorId(compra.usuarioId);

        const evento = await obtenerEventosPorId(compra.eventoId);

        ultimasCompras.push({

            cliente: usuario
                ? `${usuario.nombre} ${usuario.apellido}`
                : "Usuario",

            evento: evento
                ? evento.nombre
                : "Evento",

            cantidad: compra.cantidad,

            total: compra.precioTotal,

            fecha: compra.fechaCompra

        });

    }

    const proximosEventos = await obtenerProximosEventos();

    const dashboard = {
        Usuarios: totalUsuarios,
        Eventos: totalEventos,
        Tickets: totalTickets,
        Ingresos: totalIngresos,
        mejorCliente,
        mejorEvento,
        eventosPorMes,
        ingresosMes,
        topEventos,
        ultimasCompras,
        proximosEventos
    };

    return {
        success:true,
        dashboard
    };    
}