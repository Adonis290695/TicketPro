import api from "./api";
import type { BuyTicketRequest } from "../interfaces/BuyTicketRequest";

export async function comprarTicket(datos:BuyTicketRequest) {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/ticket",
        datos,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
    
}

export async function obtenerMisTickets(){

    const token = localStorage.getItem("token");

    const response = await api.get(

        "/ticket",

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    return response.data;

}