import api from "./api";

export async function obtenerDashboard() {

    const response = await api.get("/admin/dashboard");

    return response.data.dashboard;
    
}