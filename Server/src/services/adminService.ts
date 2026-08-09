import { contarUsuario, buscarUsuarioPorId } from "../repositories/authRepository";

import {
    contarEventos,
    obtenerEventosPorId,
    obtenerEventosPorMes,
    obtenerProximosEventos
} from "../repositories/eventRepository";

import {
    contarTicketsVendidos,
    obtenerIngresosTotales,
    obtenerUsuarioMasComprador,
    obtenerEventoMasVendido,
    obtenerIngresosPorMes,
    obtenerTopEventos,
    obtenerUltimasCompras
} from "../repositories/ticketsRepository";


export async function obtenerDashboardAdmin() {

    const [

        totalUsuarios,

        totalEventos,

        totalTickets,

        totalIngresos,

        comprador,

        eventoMasVendido,

        eventosMes,

        ingresosMes,

        top,

        compras,

        proximosEventos

    ] = await Promise.all([

        contarUsuario(),

        contarEventos(),

        contarTicketsVendidos(),

        obtenerIngresosTotales(),

        obtenerUsuarioMasComprador(),

        obtenerEventoMasVendido(),

        obtenerEventosPorMes(),

        obtenerIngresosPorMes(),

        obtenerTopEventos(),

        obtenerUltimasCompras(),

        obtenerProximosEventos()

    ]);


    /*
     * ============================================================
     * MEJOR CLIENTE
     * ============================================================
     */

    let mejorCliente = null;


    if (comprador) {

        const usuario = await buscarUsuarioPorId(comprador._id);


        if (usuario) {

            mejorCliente = {

                nombre: usuario.nombre,

                email: usuario.email,

                ticketsComprados: comprador.ticketsComprados

            };

        }

    }


    /*
     * ============================================================
     * EVENTO MÁS VENDIDO
     * ============================================================
     */

    let mejorEvento = null;


    if (eventoMasVendido) {

        const evento = await obtenerEventosPorId(
            eventoMasVendido._id
        );


        if (evento) {

            mejorEvento = {

                nombre: evento.nombre,

                ticketsVendidos:
                    eventoMasVendido.ticketsVendidos,

                ingresos:
                    eventoMasVendido.ingresos

            };

        }

    }


    /*
     * ============================================================
     * NOMBRES DE LOS MESES
     * ============================================================
     */

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


    /*
     * ============================================================
     * EVENTOS POR MES
     * ============================================================
     */

    const eventosPorMes = eventosMes

        .map(evento => {

            const numeroMes = Number(
                evento._id.split("-")[1]
            );


            return {

                numeroMes,

                mes:
                    meses[
                        numeroMes
                            .toString()
                            .padStart(2, "0")
                    ],

                cantidad: evento.cantidad

            };

        })

        .sort(
            (a, b) => a.numeroMes - b.numeroMes
        );


    /*
     * ============================================================
     * INGRESOS POR MES
     * ============================================================
     */

    const ingresosPorMes = ingresosMes

        .map((item: any) => {

            const numeroMes = Number(
                item._id.split("-")[1]
            );


            return {

                numeroMes,

                mes:
                    meses[
                        numeroMes
                            .toString()
                            .padStart(2, "0")
                    ],

                ingresos: item.ingresos

            };

        })

        .sort(
            (a, b) => a.numeroMes - b.numeroMes
        );


    /*
     * ============================================================
     * TOP 5 EVENTOS
     * ============================================================
     *
     * Antes se hacía:
     *
     * for (...)
     *     await obtenerEventosPorId(...)
     *
     * Eso ejecutaba las consultas una por una.
     *
     * Ahora todas las consultas de eventos se ejecutan
     * simultáneamente.
     */

    const topEventos = await Promise.all(

        top.map(async (evento) => {

            const datosEvento =
                await obtenerEventosPorId(evento._id);


            if (!datosEvento) {

                return null;

            }


            return {

                nombre: datosEvento.nombre,

                ticketsVendidos:
                    evento.ticketsVendidos,

                ingresos:
                    evento.ingresos

            };

        })

    );


    /*
     * Eliminamos los resultados null por si algún evento
     * fue eliminado de MongoDB.
     */

    const topEventosFinal = topEventos.filter(
        evento => evento !== null
    );


    /*
     * ============================================================
     * ÚLTIMAS COMPRAS
     * ============================================================
     *
     * Aquí también evitamos consultas secuenciales.
     *
     * Cada compra necesita:
     *
     * 1. Usuario
     * 2. Evento
     *
     * Ambas consultas son independientes, por lo que también
     * utilizamos Promise.all().
     */

    const ultimasCompras = await Promise.all(

        compras.map(async (compra) => {

            const [

                usuario,

                evento

            ] = await Promise.all([

                buscarUsuarioPorId(
                    compra.usuarioId
                ),

                obtenerEventosPorId(
                    compra.eventoId
                )

            ]);


            return {

                cliente: usuario

                    ? `${usuario.nombre} ${usuario.apellido ?? ""}`.trim()

                    : "Usuario",

                evento: evento

                    ? evento.nombre

                    : "Evento",

                cantidad:
                    compra.cantidad,

                total:
                    compra.precioTotal,

                fecha:
                    compra.fechaCompra

            };

        })

    );


    /*
     * ============================================================
     * OBJETO FINAL DEL DASHBOARD
     * ============================================================
     */

    const dashboard = {

        Usuarios: totalUsuarios,

        Eventos: totalEventos,

        Tickets: totalTickets,

        Ingresos: totalIngresos,

        mejorCliente,

        mejorEvento,

        eventosPorMes,

        ingresosPorMes,

        topEventos: topEventosFinal,

        ultimasCompras,

        proximosEventos

    };


    /*
     * ============================================================
     * RESPUESTA
     * ============================================================
     */

    return {

        success: true,

        dashboard

    };

}