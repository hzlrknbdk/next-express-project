import axiosInstance from "@/utils/axiosInstance";
import { EventInterface } from "@/types/interfaces/event";

class Event {
    subdomain = "/event";

    createEvent(request: EventInterface) {
        return axiosInstance.post<EventInterface>(`${this.subdomain}`, request);
    }

    updateEvent(id: number, request: EventInterface) {
        return axiosInstance.put<EventInterface>(`${this.subdomain}/${id}`, request);
    }

    getEventById(id: number) {
        return axiosInstance.get<EventInterface>(`${this.subdomain}/${id}`);
    }

    getEvents() {
        return axiosInstance.get<EventInterface>(`${this.subdomain}`);
    }

    deleteEvent(id: number) {
        return axiosInstance.delete(`${this.subdomain}/${id}`)
    }

}

export default new Event();
